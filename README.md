
<p align="center">
  <img src="assets/budget-sentinel-logo.png" width="240" alt="Budget Sentinel Logo" />
</p>

<h1 align="center">Budget Sentinel</h1>
<p align="center"><em>Your automated Google Sheets + Calendar + Alerts system for managing monthly budgets</em></p>

<p align="center">
  <img alt="GitHub license" src="https://img.shields.io/github/license/gusinfosec/budget-sentinel">
  <img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg">
  <img alt="Status" src="https://img.shields.io/badge/status-active-success">
  <img alt="Stars" src="https://img.shields.io/github/stars/gusinfosec/budget-sentinel?style=social">
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

## 📦 Project Structure

```
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
```

---

## 🛠 Setup Guide

Follow this guide to link your Google Sheets with Apps Script and activate alerts via [`ntfy`](https://ntfy.sh).

### 1. Clone the repo

```bash
git clone https://github.com/gusinfosec/budget-sentinel.git
cd budget-sentinel
bash scripts/setup.sh  # optional placeholder
```

### 2. Connect the Google Apps Script

1. Open your Google Sheet.
2. Go to **Extensions → Apps Script**.
3. Replace the script content with the code from `src/budget-alert.gs`.
4. Click **Save**, then name your project (e.g., “Budget Sentinel”).
5. From the toolbar, click **Triggers → Add Trigger**.
    - Function: `createBudgetReminders`
    - Event source: **Time-driven**
    - Type: **Daily** or **Hourly** depending on your preference.
6. Authorize the script when prompted.

### 3. Setup ntfy Notifications (Optional but recommended)

1. Choose a topic name (e.g., `budget-sentinel`).
2. Install the `ntfy` app on your phone or subscribe via CLI:
   ```bash
   ntfy subscribe budget-sentinel
   ```
3. Your `budget-alert.gs` script will publish alerts like:
   > "🚨 Bill Due: $342 – Rent – Sep 25"

### 4. Customize as Needed

- Add more fields (e.g., Category, Frequency).
- Tweak notification messages.
- Sync to Notion, Telegram, etc.

---

## ✨ Features

- 🔔 Google Calendar alerts
- 📊 Google Sheets as the source of truth
- 🚀 Real-time push notifications via `ntfy`
- 📁 Simple project structure, ready to expand
- ✅ Fully offline-friendly (Apps Script hosted by Google)

---

## 📜 License

[MIT License](LICENSE)

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you’d like to improve or expand.

---

## 🌟 Show your support

If you find this project useful, please ⭐ the repo to help others discover it.

---
