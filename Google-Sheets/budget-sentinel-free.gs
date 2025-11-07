// Budget Sentinel FREE (v2.4.1)
const CFG = { TIMEZONE: "America/New_York", NTFY_TOPIC_BASE: "https://ntfy.sh/budget-sentinel-free" };
function onOpen(){ buildMenu_(); }
function buildMenu_(){
  const ui=SpreadsheetApp.getUi();
  ui.createMenu('Budget FREE')
    .addItem('Set ntfy Topic…','promptSetTopic_')
    .addItem('Test Notification','testNotification')
    .addItem('Send Daily Digest','sendDailyDigest_free')
    .addItem('Tier Self-Test','verifyTiers')
    .addToUi();
}
function postNtfy(message){ const topic=(PropertiesService.getDocumentProperties().getProperty('NTFY_TOPIC')||CFG.NTFY_TOPIC_BASE); UrlFetchApp.fetch(topic,{method:'post',payload:message}); }
function promptSetTopic_(){
  const ui=SpreadsheetApp.getUi();
  const p=PropertiesService.getDocumentProperties();
  const cur=p.getProperty('NTFY_TOPIC')||CFG.NTFY_TOPIC_BASE;
  const r=ui.prompt('ntfy Topic URL','Enter full URL (e.g., https://ntfy.sh/your-topic)',ui.ButtonSet.OK_CANCEL);
  if(r.getSelectedButton()===ui.Button.OK){
    const v=(r.getResponseText()||'').trim();
    if(!/^https?:/i.test(v)) return ui.alert('Invalid URL');
    p.setProperty('NTFY_TOPIC',v); ui.alert('Saved.');
  }
}
function fc(n){ n=Number(n)||0; return '$'+n.toFixed(2); }
function digestCore_free_(){
  const ss=SpreadsheetApp.getActiveSpreadsheet();
  const dash=ss.getSheetByName('Dashboard');
  const month=dash.getRange('B4').getDisplayValue();
  const paid=dash.getRange('B7').getValue();
  const rem=dash.getRange('B10').getValue();
  return [`Budget Sentinel FREE — ${month}`,`Paid this month: ${fc(paid)}`,`Remaining after Paid: ${fc(rem)}`,`(Upgrade to PRO for full digests)`].join('\n');
}
function sendDailyDigest_free(){ postNtfy(digestCore_free_()); }
function testNotification(){ postNtfy('✅ Budget Sentinel FREE test — it works!'); }
function verifyTiers(){ SpreadsheetApp.getUi().alert('Mode: FREE'); }
