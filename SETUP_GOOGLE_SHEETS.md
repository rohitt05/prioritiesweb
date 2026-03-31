# Google Sheets Waitlist — Apps Script Setup

Zero cost. No credit card. No Google Cloud Console.

---

## 1. Prepare the Sheet

1. Open your Google Sheet (the one you already connected)
2. Rename the first tab to exactly: **Priorities Waitlist**
3. Add headers in Row 1:
   - **A1:** Email
   - **B1:** Submitted At
   - **C1:** Source

---

## 2. Create the Apps Script Webhook

1. In your sheet → **Extensions → Apps Script**
2. Delete all existing code and paste this:

```js
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName('Priorities Waitlist');
  var data  = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.email,
    data.submittedAt,
    data.source || 'website',
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Click **Deploy → New deployment**
4. Click the gear icon ⚙️ next to "Select type" → choose **Web app**
5. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
6. Click **Deploy**
7. Copy the **Web app URL** — it looks like:
   `https://script.google.com/macros/s/AKfycb.../exec`

---

## 3. Add the URL to your project

Create or edit `.env.local` in the project root:

```env
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

> **Never commit `.env.local`** — it's already in `.gitignore`.

---

## 4. Deploy to Vercel

In **Vercel → Settings → Environment Variables**, add:

| Name | Value |
|---|---|
| `GOOGLE_APPS_SCRIPT_URL` | your web app URL |

---

## 5. Test

```bash
npm run dev
```

Go to the waitlist section, submit an email — it should appear in the sheet within a few seconds.

---

## Limits (all free)

| What | Limit |
|---|---|
| Script executions/day | 6,000 |
| Concurrent executions | 30 |
| Sheet rows | 10,000,000 |

More than enough for a waitlist. 🌸
