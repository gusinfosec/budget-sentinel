/***** Budget Sentinel Digest — final ntfy-only (USD) *****/

const CFG = {
  TIMEZONE: Session.getScriptTimeZone() || "America/New_York",
  UPCOMING_DAYS: 7,
  NTFY_TOPIC: "https://ntfy.sh/budget-sentinel",
  SHEETS: {
    BUDGET_PRO: "Budget (PRO)",
    SUMMARY_PRO: "Monthly Summary (PRO)",
    BUDGET_LEGACY: "Budget Tracker",
    SUMMARY_LEGACY: "Monthly Summary"
  }
};

/* ---------- MENU ---------- */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Budget PRO")
    .addItem("Send daily summary now", "runDailyBudgetSummary")
    .addItem("Send weekly summary (7 days)", "runWeeklyBudgetSummary")
    .addSeparator()
    .addItem("Create daily trigger", "createDailyTrigger")
    .addItem("Delete all triggers", "deleteAllTriggers")
    .addSeparator()
    .addItem("Test notification", "testNotification")
    .addToUi();
}

/* ---------- TRIGGERS ---------- */
function createDailyTrigger() {
  deleteAllTriggers();
  ScriptApp.newTrigger("runDailyBudgetSummary")
    .timeBased().everyDays(1).atHour(8).create();
}
function deleteAllTriggers() {
  ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t));
}

/* ---------- ENTRYPOINTS ---------- */
function runDailyBudgetSummary() {
  const tz = CFG.TIMEZONE;
  const today = toStartOfDay(new Date(), tz);
  const end = shiftDays(today, CFG.UPCOMING_DAYS);
  sendDigest(today, end, "Daily");
}
function runWeeklyBudgetSummary() {
  const tz = CFG.TIMEZONE;
  const today = toStartOfDay(new Date(), tz);
  const end = shiftDays(today, 7);
  sendDigest(today, end, "Weekly");
}
function testNotification() {
  const tz = CFG.TIMEZONE;
  const now = toStartOfDay(new Date(), tz);
  sendDigest(now, shiftDays(now, 3), "Test (3 days)");
}

/* ---------- CORE DIGEST ---------- */
function sendDigest(start, end, label) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const env = resolveSheets(ss);
  const budget = readBudget(env);
  const summary = readSummary(env);

  const today = toStartOfDay(new Date(), CFG.TIMEZONE);
  const { dueToday, upcoming, overdue } = splitByWindow(budget, start, end, today);
  const monthKey = monthKeyFromDate(today);
  const monthSummary = summary.find(s => s.monthKey === monthKey) || {};

  const payWindow = detectPayWindow(today);
  const msg = renderTextDigest({ label, today, start, end, dueToday, upcoming, overdue, monthSummary, payWindow });

  try {
    UrlFetchApp.fetch(CFG.NTFY_TOPIC, {
      method: "post",
      contentType: "text/plain; charset=utf-8",
      payload: msg,
      muteHttpExceptions: true
    });
  } catch (e) {
    Logger.log("ntfy failed: " + e);
  }
  Logger.log(msg);
}

/* ---------- READ DATA ---------- */
function resolveSheets(ss) {
  const get = n => ss.getSheetByName(n);
  const budget = get(CFG.SHEETS.BUDGET_PRO) || get(CFG.SHEETS.BUDGET_LEGACY);
  const summary = get(CFG.SHEETS.SUMMARY_PRO) || get(CFG.SHEETS.SUMMARY_LEGACY);
  if (!budget) throw new Error("Budget sheet not found.");
  return { budget, summary };
}

function readBudget(env) {
  const v = env.budget.getDataRange().getValues();
  if (v.length < 2) return [];
  const h = v[0].map(String);
  const idx = indexer(h, ["Date","Item","Amount","Paid?","IsPaid"]);
  return v.slice(1).map(r => ({
    date: toDate(r[idx("Date")]),
    item: safe(r[idx("Item")]),
    amount: toNumber(r[idx("Amount")]),
    isPaid: truthy(r[idx("IsPaid")]) || safe(r[idx("Paid?")]).toLowerCase() === "yes"
  })).filter(x => x.date);
}

function readSummary(env) {
  if (!env.summary) return [];
  const v = env.summary.getDataRange().getValues();
  if (v.length < 2) return [];
  const h = v[0].map(String);
  const idx = indexer(h, ["Month","Month Label","Income","Expenses Paid","Expenses Due","Net (Income - All Expenses)","Remaining After Paid"]);
  const monthNameCol = idx("Month") != null ? "Month" : "Month Label";
  return v.slice(1).map(r => ({
    monthLabel: safe(r[idx(monthNameCol)]),
    monthKey: monthKeyFromLabel(safe(r[idx(monthNameCol)])),
    income: toNumber(r[idx("Income")]),
    paid: toNumber(r[idx("Expenses Paid")]),
    due: toNumber(r[idx("Expenses Due")]),
    net: toNumber(r[idx("Net (Income - All Expenses)")]),
    remainingAfterPaid: toNumber(r[idx("Remaining After Paid")])
  })).filter(x => x.monthKey);
}

/* ---------- FILTER + FORMAT ---------- */
function splitByWindow(rows, start, end, today) {
  const dueToday = [], upcoming = [], overdue = [];
  rows.forEach(r => {
    if (r.isPaid) return;
    const d = toStartOfDay(r.date, CFG.TIMEZONE);
    if (isSameDay(d, today)) dueToday.push(r);
    else if (d < today) overdue.push(r);
    else if (d > today && d <= end) upcoming.push(r);
  });
  return { dueToday, upcoming, overdue };
}

function detectPayWindow(date) {
  const y = date.getFullYear(), m = date.getMonth();
  const lastDay = new Date(y, m + 1, 0).getDate();
  const dow = new Date(y, m, lastDay).getDay();
  let lastBiz = lastDay;
  if (dow === 0) lastBiz -= 2;
  else if (dow === 6) lastBiz -= 1;
  if (date.getDate() === 15) return "Mid-month (15th)";
  if (date.getDate() === lastBiz) return "Last business day";
  return "—";
}

function renderTextDigest({ label, today, start, end, dueToday, upcoming, overdue, monthSummary, payWindow }) {
  const lines = [];
  lines.push(`📣 Budget Sentinel Digest — ${Utilities.formatDate(today, CFG.TIMEZONE, "MMM d")}`);
  lines.push(`💰 Pay window: ${payWindow}`);
  lines.push(`Window: ${formatDate(start)} → ${formatDate(end)}`);
  lines.push("");
  lines.push(`📅 Due Today: ${dueToday.length}`);
  lines.push(`⏭ Upcoming: ${upcoming.length}`);
  lines.push(`⏰ Overdue: ${overdue.length}`);
  lines.push("");
  lines.push(`Income (Month): $${fmtMoney(monthSummary.income)}`);
  lines.push(`Remaining After Paid: $${fmtMoney(monthSummary.remainingAfterPaid)}`);
  lines.push(`Net (Income – All): $${fmtMoney(monthSummary.net)}`);
  lines.push("");
  lines.push("— End of Digest —");
  return lines.join("\n");
}

/* ---------- HELPERS ---------- */
function indexer(headers, names) {
  const map = {}; names.forEach(n => map[n] = headers.indexOf(n));
  return name => (map[name] >= 0 ? map[name] : null);
}
function safe(v){ return v == null ? "" : String(v); }
function truthy(v){ return v === true || String(v).toLowerCase() === "true" || String(v).toLowerCase() === "yes"; }
function toNumber(v){ const n = Number(v); return isFinite(n)?n:0; }
function toDate(v){ return v instanceof Date ? v : (v ? new Date(v) : null); }
function toStartOfDay(d,tz){ const s=Utilities.formatDate(d,tz,"yyyy-MM-dd"); return new Date(s+"T00:00:00"); }
function shiftDays(d,n){ const x=new Date(d); x.setDate(x.getDate()+n); return x; }
function isSameDay(a,b){ return a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth()&&a.getDate()===b.getDate(); }
function formatDate(d){ return Utilities.formatDate(d,CFG.TIMEZONE,"MMM d"); }
function monthKeyFromDate(d){ return Utilities.formatDate(d,CFG.TIMEZONE,"yyyy-MM"); }
function monthKeyFromLabel(label){
  const m1=/([A-Za-z]{3})-(\d{4})/.exec(label);
  if(m1){ const dt=new Date(`${m1[1]} 01, ${m1[2]}`); return Utilities.formatDate(dt,CFG.TIMEZONE,"yyyy-MM"); }
  const m2=/(\d{4})-(\d{2})/.exec(label);
  if(m2) return `${m2[1]}-${m2[2]}`;
  return "";
}
function fmtMoney(n){
  const val=parseFloat(n);
  if(isNaN(val)||!isFinite(val)) return "0.00";
  return val.toFixed(2);
}

/* ---------- Default entry ---------- */
function myFunction(){ runDailyBudgetSummary(); }
