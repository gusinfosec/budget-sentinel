<p align="center">
<img src="assets/budget-sentinel-logo.png" width="300" alt="Budget Sentinel Logo" />
</p>

<h1 align="center">Budget Sentinel PRO</h1>

<p align="center">
<i>Your automated Google Sheets + ntfy alert system for smarter monthly budgeting</i>
</p>

<p align="center">
  <a href="https://ko-fi.com/s/3d7c0cfd31">
    <img src="https://ko-fi.com/img/githubbutton_sm.svg" alt="Support me on Ko-fi">
  </a>
</p>

<p align="center">
<img alt="license" src="https://img.shields.io/badge/license-MIT-green">
<img alt="status" src="https://img.shields.io/badge/status-active-brightgreen">
<img alt="stars" src="https://img.shields.io/github/stars/gusinfosec/budget-sentinel?style=social">
</p>

---

## 🚀 Overview

**Budget Sentinel PRO** takes the original **Budget Sentinel** and evolves it into a more reliable, event-driven system — designed around **ntfy push notifications** and smarter logic for bi-monthly pay periods.

This version is lightweight, HTML-free, and built for users who prefer fast, clean updates over email clutter.  
Perfect for anyone who just wants the data to *work* — quietly, predictably, and in real time.

---

## 🧭 What’s New in PRO (v2.0)

- 💬 **Plaintext ntfy-only alerts** (no HTML formatting issues)
- 💰 **Pay-window awareness** — detects both **15th** and **Last Business Day** automatically
- 🧮 **Fail-safe formatting** — `$0.00` displayed when spreadsheet data is missing or blank
- 🗓 **Dynamic triggers** — menu controls for daily/weekly summaries and one-click test runs
- 📊 **KPI rollups** — monthly Income, Paid, Due, Remaining, and Net
- ⚡ **Smart sheet detection** — works with both legacy and new PRO templates

---

## 📸 Screenshots

<p align="center">
  <img src="assets/screenshot-tracker-preview.png" alt="Google Sheets Budget Tracker" width="720"/>
</p>

---

📂 **Working Sample:** [Budget_Tracker_2025.xlsx](assets/Budget_Tracker_2025.xlsx)

> The included sample demonstrates:
> - Monthly Summary with automatic roll-up of **Income, Expenses, Net, Carryover, and Remaining Balance**
> - Dashboard KPIs for **This Month’s Income, Expenses, Net, and Balance**
> - Sparklines to visualize trends for Income, Expenses, Net, and Remaining Balance
> - Conditional formatting highlighting positive (green) vs. negative (red) balances
>
> **PRO Sheet Layouts:**
>
> **Budget (PRO)**
> | Date | Item | Category | Amount | Paid? | Priority | Notes |
> |------|------|-----------|---------|--------|-----------|--------|
> | 2025-10-10 | Rent | Housing | 1200 | Yes | High | Paid via bank transfer |
> | 2025-10-15 | Utilities | Bills | 250 | No | Medium | Due mid-month |
> | 2025-10-28 | Internet | Bills | 80 | No | Low | Scheduled |
>
> **Monthly Summary (PRO)**
> | Month | Income | Expenses Paid | Expenses Due | Net (Income - All Expenses) | Remaining After Paid |
> |--------|---------|----------------|---------------|------------------------------|-----------------------|
> | Oct-2025 | 5000 | 1200 | 730 | 3070 | 3800 |

---

## 📦 Project Structure

    budget-sentinel/
    ├── assets/
    │   ├── budget-sentinel-logo.png
    │   └── screenshot-tracker-preview.png
    ├── src/
    │   └── budget-sentinel-pro.gs
    ├── scripts/
    │   └── setup.sh
    ├── .gitignore
    ├── LICENSE
    └── README.md

---

## 🛠 Setup Guide

### 1. Clone the repo

```bash
git clone https://github.com/gusinfosec/budget-sentinel.git
cd budget-sentinel
bash scripts/setup.sh
```

This checks dependencies (`git`, `curl`, `ntfy`), prepares local config,
and copies the Apps Script code to your clipboard (if supported).

---

### 2. Connect the Google Apps Script

1.  Open your **Budget Tracker Google Sheet**  
2.  Go to **Extensions → Apps Script**  
3.  Delete the default `myFunction()` code  
4.  Paste in [`src/budget-sentinel-pro.gs`](src/budget-sentinel-pro.gs)  
5.  **Save Project** → Name it `Budget Sentinel`  
6.  **Run → onOpen()** once → approve authorization  
7.  Use the new **Budget PRO** menu inside your Sheet to:
    - Send daily or weekly summaries  
    - Create or delete triggers  
    - Run test notifications

---

### 3. Setup ntfy Notifications

1. Subscribe to your topic (default: `budget-sentinel`):

   ```bash
   ntfy subscribe budget-sentinel
   ```

2. Receive notifications like:
   ```
   📣 Budget Sentinel Digest — Oct 10
   💰 Income (Month): $4,200.00 
   ✅ Paid: 18 items – $6,900.76 
   ⚠️ Unpaid: 11 items – $2,948.96
   🚨 Overdue: 2 items
   💸 Remaining After Paid: $1,375.09
   ```

---

## ✨ Features

- 🔔 Google Sheets + ntfy alerts  
- 💵 Smart pay-period recognition (15th & last business day)  
- 📊 Monthly KPI summaries  
- 🧮 Auto `$0.00` fallbacks  
- 🚀 Fast and reliable — no HTML or MailApp  
- 🧱 Modular design, easy to extend  

---

## 🧩 Configuration

Top of `budget-sentinel-pro.gs`:

```js
const CFG = {
  TIMEZONE: "America/New_York",
  UPCOMING_DAYS: 7,
  NTFY_TOPIC: "https://ntfy.sh/budget-sentinel"
};
```

---

## 🗺 Roadmap

| Stage | Feature | Status |
|-------|----------|--------|
| 🔄 | Optional email fallback | Under review |
| 🗂 | Category-based digest (PRO) | Planned |
| 🧭 | Dynamic pay-window logic | ✅ Done |
| 📆 | Weekly summaries by category | Upcoming |
| ⚙️ | Sidebar GUI editor | Planned |

---

## 🧾 Changelog

### **v2.0 — October 2025**
- Moved to ntfy-only plaintext digest  
- Added dual pay-window logic (15th / last business day)  
- Improved fallback handling for blank or missing data  
- Retained original menu + triggers  
- Streamlined for better mobile readability  

---

## 📜 License

[MIT License](LICENSE)

---

## 🤝 Contributing

Pull requests are welcome.  
Open an issue first to discuss improvements or integrations.

---

## 🌟 Show your support

If you find this project useful, please ⭐ the repo or  
support development on [Ko-fi](https://ko-fi.com/s/3d7c0cfd31).
