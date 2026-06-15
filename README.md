# 🏠 CleanHome

A smart home cleaning management system that tells you (or your cleaner) exactly what to clean, in the right order, based on how much time you have.

---

## What It Does

- You say **"I have 1 hour"** — the app builds your task list automatically
- Tasks are prioritized by **tier** (essentials first, deep cleans last) and by **how overdue they are**
- When a task is done, you check it off and log the actual time
- Everything syncs to **Google Sheets** in real time — so you and your cleaner always see the same data
- History shows **who cleaned what, when, and how long it took** — full accountability

---

## The Three Tiers

| Tier | Label | What's in it |
|------|-------|--------------|
| 🟢 Tier 1 | Must Do First | Dusting → Dog door/windows → Vacuum → Mop → Surface wipes → Sink/toilet/mirror → Shower → Tub |
| 🟡 Tier 2 | When Time Allows | Windows, baseboards, appliances, walls, door frames, cabinet fronts |
| ⚪ Tier 3 | Deep Cleans Only | Inside cabinets, floor grout, deep clean fridge/oven, polishing, annual tasks |

The app **always fills Tier 1 before showing Tier 2**, and Tier 2 before Tier 3. If you only have 30 minutes, you only see the most critical Tier 1 tasks. No cabinet-arranging showing up in a quick session.

**Floor priority:** When cleaning the whole house, Downstairs Tier 1 is always scheduled before Upstairs Tier 1.

---

## The Files

| File | What it is |
|------|-----------|
| `CleanHome.html` | The web app — open in any browser, save to phone home screen |
| `cleaning_master.xlsx` | The master task list — 134 tasks across Downstairs + Upstairs |
| `appsscript.js` | The Google Apps Script code that connects the app to Google Sheets |

---

## The Task List

**134 tasks total** across two floors:

**Downstairs:** Living Room, Kid Living Room, Dining Room, Kitchen, Foyer, Downstairs Washroom

**Upstairs:** Upstairs Foyer, Master Bedroom, Master Ensuite, Kid Bedroom, Reese's Office, Washroom 1, Washroom 2

**Frequencies used:**
`Daily` · `Semi Weekly` · `Weekly` · `Bi-Weekly` · `Semi Monthly` · `Monthly` · `I in 2 Month` · `Quarterly` · `Semi Annual` · `Annual`

---

## Setup (One-Time)

### 1. Google Sheet
- Upload `cleaning_master.xlsx` to Google Drive → Open with Google Sheets → Save as Google Sheets
- Rename to **CleanHome**
- Add two more tabs: **History** and **Users**
- Share → Anyone with the link → Editor

### 2. Google Apps Script
- In the Google Sheet: **Extensions → Apps Script**
- Delete the default code, paste in `appsscript.js`
- Click **Deploy → New deployment → Web app**
  - Execute as: Me
  - Who has access: Anyone
- Click **Deploy → Authorize → Allow**
- Copy the Web App URL

### 3. The App
- The Web App URL is already embedded in `CleanHome.html`
- If you need to update it, open the HTML file and find the line: `const API = '...'`

---

## How to Open on Your Phone

The app needs to be hosted at a URL (not opened from Google Drive directly).

**Recommended: GitHub Pages (free)**
1. Create a GitHub account at [github.com](https://github.com)
2. Create a new repository called `cleanhome`
3. Upload `CleanHome.html` — rename it to `index.html`
4. Go to Settings → Pages → Source: main branch → Save
5. Your URL will be: `https://yourusername.github.io/cleanhome`

**Add to Home Screen:**
- **Android (Chrome):** Open URL → ⋮ menu → Add to Home Screen
- **iPhone (Safari):** Open URL → Share icon → Add to Home Screen

Both you and your cleaner use the same URL. Data syncs through Google Sheets.

---

## How to Use the App

1. **Open the app** → tap your name (or add yourself first)
2. **Dashboard** shows: overdue tasks, due soon, done this week
3. Tap **Start Cleaning Session**
4. Enter how much time you have (30 min, 2 hrs, whatever — no fixed schedule)
5. App builds your task list — Tier 1 first, most overdue at the top
6. Clean, tap each task → enter actual time → Mark Done
7. Tap **Finish Session** to see your summary
8. **History tab** shows everything logged by everyone

---

## Updating the Task List

All tasks live in the **Tasks tab of your Google Sheet**. You can:
- Change a frequency (e.g. Weekly → Bi-Weekly)
- Change a priority tier (1, 2, or 3)
- Add a new task — just add a row with the same columns
- Edit a description

The app reads the task list from the spreadsheet, so changes take effect immediately.

**Valid frequency values** (must match exactly):
`Daily` · `Semi Weekly` · `Weekly` · `Bi-Weekly` · `Semi Monthly` · `Monthly` · `I in 2 Month` · `Quarterly` · `Semi Annual` · `Annual`

---

## Weekly Hour Estimates

Based on the full task list:

| | Min hrs/week | Max hrs/week |
|---|---|---|
| Downstairs | 8.6 | 12.9 |
| Upstairs | 6.0 | 9.6 |
| **Total** | **14.5** | **22.5** |

Current plan: 2 sessions × 4 hours = **8 hrs/week** of cleaning time. The app manages what gets done each session and tracks what gets pushed forward.

---

## Users

- **Maitri** (Owner) — full access, can see all history
- **Cleaner** — add when she starts, same app, same data

To add a new user: open the app → tap "Add new person" on the welcome screen.

---

## Built With

- Vanilla HTML/CSS/JavaScript (no frameworks, no dependencies)
- Google Sheets as the database
- Google Apps Script as the API
- Runs in any modern mobile browser
