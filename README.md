<p align="center">
<img src="assets/budget-sentinel-logo.png" width="300" alt="Budget Sentinel Logo" />
</p>


<h1 align="center">Budget Sentinel</h1>


<p align="center">
<i>Your automated Google Sheets + Calendar + Alerts system for managing monthly budgets</i>
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

**Budget Sentinel** empowers you to take control of your finances with dynamic **Google Sheets budgeting**, **Google Calendar alerts**, and **`ntfy` push notifications**. Track bills, categorize expenses, and never miss a due date again.

---

## 📸 Screenshots

<p align="center">
  <img src="assets/screenshot-tracker-preview.png" alt="Google Sheets Budget Tracker" width="720"/>
</p>

---

📂 A working sample tracker is included at:  
[assets/Budget_Tracker_2025_Dashboard.xlsx](assets/Budget_Tracker_2025_Dashboard.xlsx)

---

## 📦 Project Structure

    budget-sentinel/
    ├── assets/
    │   ├── budget-sentinel-logo.png
    │   └── screenshot-tracker-preview.png
    ├── scripts/
    │   └── setup.sh
    ├── src/
    │   └── budget-alert.gs
    ├── .gitignore
    ├── LICENSE
    └── README.md

------------------------------------------------------------------------

## 🛠 Setup Guide

### 1. Clone the repo

``` bash
git clone https://github.com/gusinfosec/budget-sentinel.git
cd budget-sentinel
bash scripts/setup.sh
```

This checks dependencies (`git`, `curl`, `ntfy`), prepares local config,
and copies the Apps Script code to your clipboard (if supported).

------------------------------------------------------------------------

### 2. Connect the Google Apps Script

1.  Open your **Budget Tracker Google Sheet**.\
2.  Go to **Extensions → Apps Script**.\
3.  In the editor:
    -   Delete the default `myFunction()` code.\
    -   Paste in the content from
        [`src/budget-alert.gs`](src/budget-alert.gs).\
    -   (Optional) Rename the file tab from **Code.gs** to
        **budget-alert.gs** for consistency.\
4.  Click **File → Save Project**, and name the project **Budget
    Sentinel**.\
5.  From the toolbar, go to **Triggers → Add Trigger**:
    -   Function: `createBudgetReminders`\
    -   Event source: **Time-driven**\
    -   Type: **Daily** or **Hourly** (your choice)\
6.  Authorize the script when prompted.

------------------------------------------------------------------------

### 3. Setup ntfy Notifications (Optional but Recommended)

1. Pick a topic name (default: `budget-sentinel`).\

2. Install the `ntfy` app on your phone or subscribe via CLI:

   ``` bash
   ntfy subscribe budget-sentinel
   ```

3. Your script will publish alerts like:

   > 📢 Budget Alert: Rent \$142 due in 4 days

------------------------------------------------------------------------

### 4. Customize as Needed

-   Add more fields (e.g., Category, Frequency).\
-   Tweak notification messages.\
-   Sync to Notion, Telegram, or other channels.

------------------------------------------------------------------------

## ✨ Features

-   🔔 Google Calendar-style alerts\
-   📊 Google Sheets as the source of truth\
-   🚀 Real-time push notifications via `ntfy`\
-   📁 Simple project structure, ready to expand\
-   ✅ Fully offline-friendly (Apps Script hosted by Google)

------------------------------------------------------------------------

## 📜 License

[MIT License](LICENSE)

------------------------------------------------------------------------

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first to
discuss what you'd like to improve or expand.

------------------------------------------------------------------------

## 🌟 Show your support

If you find this project useful, please ⭐ the repo to help others
discover it.\
Or support development on [Ko-fi](https://ko-fi.com/s/3d7c0cfd31).

------------------------------------------------------------------------

