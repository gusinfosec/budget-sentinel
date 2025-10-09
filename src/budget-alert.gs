function createBudgetReminders() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Budget Tracker");
  const data = sheet.getDataRange().getValues();
  const headers = data[0];

  const dateIndex = headers.indexOf("Date");
  const itemIndex = headers.indexOf("Item");
  const amountIndex = headers.indexOf("Amount");
  const paidIndex = headers.indexOf("Paid?");
  const statusIndex = headers.indexOf("Status");
  const remainingDaysIndex = headers.indexOf("Remaining Days");
  const weekIndex = headers.indexOf("Due This Week");
  const monthIndex = headers.indexOf("Due This Month");

  const today = new Date();

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const dueDate = new Date(row[dateIndex]);
    const item = row[itemIndex];
    const amount = row[amountIndex];
    const paid = row[paidIndex];
    const status = row[statusIndex];
    const remainingDays = row[remainingDaysIndex];
    const dueThisWeek = row[weekIndex];
    const dueThisMonth = row[monthIndex];

    // Skip if already paid
    if (paid && paid.toString().toLowerCase() === "yes") continue;

    // Skip if not marked as upcoming/due
    if (status !== "Due Now" && status !== "Upcoming") continue;

    // Only alert if it's due soon (this week or this month)
    if (!(dueThisWeek === "Yes" || dueThisMonth === "Yes")) continue;

    // Message with remaining days
    const message = `📢 Budget Alert:
🧾 Item: ${item}
💵 Amount: $${amount}
📅 Due: ${dueDate.toDateString()}
📌 Status: ${status}
⏳ Remaining Days: ${remainingDays}`;

    try {
      UrlFetchApp.fetch("https://ntfy.sh/budget-sentinel", {
        method: "post",
        payload: message,
        muteHttpExceptions: true,
      });
    } catch (e) {
      Logger.log("Failed to send ntfy alert: " + e);
    }
  }
}
