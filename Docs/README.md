<p align="center">
  <img src="assets/budget-sentinel-logo.png" width="300" alt="Budget Sentinel Logo" />
</p>

<h1 align="center">Budget Sentinel PRO — v2.4.1</h1>

<p align="center">
<i>Your automated Google Sheets + ntfy alert system for smarter monthly budgeting</i>
</p>

<p align="center">
  <img alt="license" src="https://img.shields.io/badge/license-MIT-green">
  <img alt="status" src="https://img.shields.io/badge/status-active-brightgreen">
  <img alt="version" src="https://img.shields.io/badge/version-2.4.1-blue">
  <img alt="stars" src="https://img.shields.io/github/stars/gusinfosec/budget-sentinel?style=social">
</p>

---

## 🚀 Overview

**Budget Sentinel PRO** (v2.4.1) refines your budgeting workflow into a **secure, tiered ecosystem** built on **Google Sheets + ntfy**.  
Whether you’re tracking personal expenses or managing household finances, it runs quietly in the background — calculating, comparing, and alerting in real time.

### 🧩 Three-Tier Lineup

| Tier | Features | Distribution |
|------|-----------|---------------|
| **FREE** | Basic tracker + manual digests | GitHub |
| **PRO** | Full ntfy digests, dashboard protection, drilldown, offline license | Ko-fi |
| **PUBLISHER TOOLKIT** | License rotation, key ledger, admin automation | Private |

---

## 🆕 What’s New in v2.4.1

- ⚙️ **Offline license system (HMAC)** — secure, serverless activation  
- 🧾 **Dashboard hardening** — B3 editable, rest locked  
- 📡 **ntfy topic manager** — per-file topic storage and testing  
- 💹 **Income & net delta tracking** — compare vs previous month  
- 🔒 **Publisher Admin Menu** — rotate, backup, and log license events  
- 📦 **Free, PRO, and Toolkit bundles** for clean distribution

---

## 📸 Screenshots

<p align="center">
  <img src="assets/screenshot-tracker-preview.png" alt="Google Sheets Budget Tracker" width="720"/>
</p>

---

## 📦 Build Packages

| Package | Purpose | Description |
|----------|----------|-------------|
| 🟢 **Free (GitHub)** | Public version | Basic digests, no licensing |
| 🟣 **PRO (Ko-fi)** | Buyer version | Full automation, license validation |
| 🟠 **Publisher Toolkit** | Private admin | Secret rotation + ledger tracking |

> **Ko-fi Store:** [Budget Sentinel PRO — v2.4.1](https://ko-fi.com/s/3d7c0cfd31)

---

## 🛠 Setup Guide (PRO Edition)

### 1. Install the Google Apps Script
1. Open your **Budget Tracker Google Sheet**
2. **Extensions → Apps Script**
3. Paste in scripts from `/Google-Sheets` in the PRO package:
   - `budget-sentinel-pro.gs`
   - `license-gate.gs`
   - `license-modal.html`
   - `tier-selftest.gs`
4. Save → Run `onOpen()` → approve permissions → reload the Sheet

### 2. Activate PRO
1. In the Sheet menu → **License → Set Secret…**
2. Generate a key (via your Publisher Toolkit)
3. **License → Enter/Change License** → paste the key
4. **Budget PRO → Tier Self-Test** → should show `Mode: PRO`

### 3. Setup ntfy Notifications
1. Subscribe to your topic:
   ```bash
   ntfy subscribe budget-sentinel
   ```
2. Test from the Sheet:
   - **Budget PRO → Test Notification**

---

## ✨ Core Features

- 🔔 Real-time ntfy alerts (daily or weekly)
- 📊 Smart monthly KPI summary (Income, Paid, Due, Net)
- 💰 Dual pay-window logic (15th / last business day)
- 🧮 Auto `$0.00` formatting for missing data
- 🧭 Drilldown (PRO only)
- 🛡 Dashboard protection (PRO only)
- 🔒 Offline license (no server required)

---

## 🧾 Changelog

### **v2.4.1 — November 2025**
- Added publisher toolkit + offline license HMAC
- Split Free / PRO / Publisher tiers
- Added Quickstart + SmokeTest docs
- Hardened dashboard data validation
- Refined digest readability for mobile

---

## 📜 License

[MIT License](LICENSE) — for code.  
**EULA restrictions apply** to redistribution of the PRO and Toolkit bundles.

---

## 🌟 Support the Project

If this system saves you time or keeps your budget on track,  
⭐ star this repo and consider supporting on [Ko-fi](https://ko-fi.com/s/3d7c0cfd31).

---

<footer style="text-align:center;font-size:13px;color:#7a8b9a;padding:16px 0;border-top:1px solid #1f2a3a;margin-top:30px;">
  <p>© 2025 <strong>Cyber Global Technologies LLC</strong> — Secure, practical tools for finance and automation.</p>
</footer>

