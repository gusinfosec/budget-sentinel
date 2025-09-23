function createBudgetReminders() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Budget Tracker");
  const data = sheet.getDataRange().getValues();
  const headers = data[0];

  const dateIndex = headers.indexOf("Date");
  const itemIndex = headers.indexOf("Item");
  const amountIndex = headers.indexOf("Amount");
  const paidIndex = headers.indexOf("Paid?");
  const statusIndex = headers.indexOf("Status");

  const today = new Date();

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const dueDate = new Date(row[dateIndex]);
    const item = row[itemIndex];
    const amount = row[amountIndex];
    const paid = row[paidIndex];
    const status = row[statusIndex];

    if (paid && paid.toString().toLowerCase() === "yes") continue;
    if (status !== "Due Now" && status !== "Upcoming") continue;

    const message = `📢 Budget Alert:
🧾 Item: ${item}
💵 Amount: $${amount}
📅 Due: ${dueDate.toDateString()}
📌 Status: ${status}`;

    try {
      UrlFetchApp.fetch("https://ntfy.sh/budget", {
        method: "post",
        payload: message,
        muteHttpExceptions: true,
      });
    } catch (e) {
      Logger.log("Failed to send ntfy alert: " + e);
    }
  }
}