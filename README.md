<p align="center">
  <img src="assets/budget-sentinel-logo.png" width="260" alt="Budget Sentinel Logo" />
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

## 🧾 About

**Budget Sentinel** empowers you to **take control of your finances** with dynamic Google Sheets budgeting, automated calendar alerts, and real-time push notifications via `ntfy`.

This system is ideal for:
- Busy professionals tracking multiple bills
- Monthly income/expense planning
- Automating bill due dates and alert reminders

---

## 📸 Screenshots

### 📊 Budget Sheet + Alert System

<p align="center">
  <img src="assets/screenshot-tracker-preview.png" width="720" alt="Budget Tracker Google Sheets + NTFY" />
</p>

---

## ⚙️ How It Works

1. **Google Sheets** stores your monthly budget, dates, and tags.
2. **Apps Script** automatically pushes alerts to your `ntfy` channel (topic: `budget`) and Google Calendar.
3. **Bill alerts** notify you of due/overdue items.
4. **Dashboard tab** aggregates income, remaining balance, and milestones.

---

## 🚀 Setup

```bash
git clone https://github.com/gusinfosec/budget-sentinel.git
cd budget-sentinel
bash scripts/setup.sh
```

Follow the [setup guide](https://github.com/gusinfosec/budget-sentinel#-setup) for linking Google Sheets with your Apps Script and setting up `ntfy`.

---

## 📂 Project Structure

```
budget-sentinel/
├── assets/
│   ├── budget-sentinel-logo.png
│   └── screenshot-tracker-preview.png
├── scripts/
│   └── setup.sh
├── src/
│   └── budget-alert.gs
├── README.md
├── LICENSE
└── .gitignore
```

---

## 📜 License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.

---

> Created with ❤️ by [@gusinfosec](https://github.com/gusinfosec) — Budgeting like a pro!

