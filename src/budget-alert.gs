/**
 * Budget Sentinel Digest Notification
 * Reads KPIs from Dashboard (PRO) and posts a clean digest to ntfy.
 */
function sendBudgetDigest() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const dash = ss.getSheetByName('Dashboard (PRO)');
  const topic = 'budget-sentinel'; // change if using another topic
  const ntfyUrl = `https://ntfy.sh/${topic}`;

  // Read values from Dashboard
  const currentDate = dash.getRange('B3').getDisplayValue();
  const paidCount = dash.getRange('B6').getValue();
  const paidAmount = dash.getRange('B7').getDisplayValue();
  const unpaidCount = dash.getRange('B8').getValue();
  const unpaidAmount = dash.getRange('B9').getDisplayValue();
  const remainingAfterPaid = dash.getRange('B10').getDisplayValue();
  const incomeMonth = ss.getSheetByName('Monthly Summary (PRO)').getRange('B2').getDisplayValue();

  // Optional: calculate overdue count from Budget (PRO)
  const budget = ss.getSheetByName('Budget (PRO)');
  const data = budget.getRange('A2:F').getValues();
  let overdueCount = 0;

  const today = new Date();
  data.forEach(row => {
    const [date, , , , status, paid] = row;
    if (date instanceof Date && paid !== 'Yes' && date < today) overdueCount++;
  });

  // Build message
  let msg =
    `📣 Budget Sentinel Digest – ${currentDate}\n\n` +
    `💰 Income (Month): ${incomeMonth}\n` +
    `✅ Paid: ${paidCount} items – ${paidAmount}\n` +
    `⚠️ Unpaid: ${unpaidCount} items – ${unpaidAmount}\n`;

  if (overdueCount > 0) msg += `🚨 Overdue: ${overdueCount} item${overdueCount > 1 ? 's' : ''}\n`;

  msg += `💸 Remaining After Paid: ${remainingAfterPaid}`;

  // Send notification to ntfy
  UrlFetchApp.fetch(ntfyUrl, {
    method: 'post',
    payload: msg
  });
}
