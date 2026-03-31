# Google Sheets Waitlist — Apps Script Setup

Zero cost. No credit card. No Google Cloud Console.

---

## 1. Prepare the Sheet

1. Open your Google Sheet
2. Rename the first tab to exactly: **Priorities Waitlist**
3. Add headers in Row 1:
   - **A1:** Email
   - **B1:** Submitted At
   - **C1:** Source

---

## 2. Apps Script Code

1. In your sheet → **Extensions → Apps Script**
2. Delete all existing code and paste this:

```js
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet()
      .getSheetByName('Priorities Waitlist');

    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.email        || '',
      data.submittedAt  || new Date().toISOString(),
      data.source       || 'website',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// doGet so you can test the URL in a browser
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'Priorities Waitlist is live 🌸' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Click **Deploy → New deployment**
4. Gear icon ⚙️ → **Web app**
5. Execute as: **Me** | Who has access: **Anyone**
6. Click **Deploy** → copy the Web App URL

> **Important:** Every time you change the Apps Script code,
> you must create a **New Deployment** (not update existing)
> for the changes to take effect.

---

## 3. Add env var

`.env.local`:
```env
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Vercel: Settings → Environment Variables → same key + value.

---

## 4. Test the URL directly

Open this in your browser — if you see `{"status":"Priorities Waitlist is live 🌸"}` it’s working:
```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

---

## Limits (all free)

| What | Limit |
|---|---|
| Script executions/day | 6,000 |
| Concurrent executions | 30 |
| Sheet rows | 10,000,000 |
