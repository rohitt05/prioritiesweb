# Google Sheets Waitlist Setup

This guide connects the waitlist form to a Google Sheet called **"Priorities Waitlist"**.

---

## 1. Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet
2. Rename it: **Priorities Waitlist**
3. Rename the first tab (bottom) to: **Priorities Waitlist**
4. Add headers in Row 1:
   - A1: `Email`
   - B1: `Submitted At`
   - C1: `Source`
5. Copy the **Spreadsheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_IS_HERE/edit
   ```

---

## 2. Create a Google Service Account

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project (or use existing)
3. Enable **Google Sheets API**: APIs & Services → Enable APIs → search "Google Sheets API" → Enable
4. Go to **IAM & Admin → Service Accounts** → Create Service Account
   - Name: `priorities-waitlist`
   - Click Create
5. On the service account page → **Keys** tab → Add Key → JSON
6. Download the JSON file — keep it safe, don't commit it

---

## 3. Share the sheet with the service account

1. Open your Google Sheet
2. Click **Share**
3. Paste the service account email (looks like `priorities-waitlist@project-name.iam.gserviceaccount.com`)
4. Give it **Editor** access
5. Click Send

---

## 4. Add environment variables

Create a `.env.local` file in the project root (never commit this):

```env
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=priorities-waitlist@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQ...your key...\n-----END PRIVATE KEY-----\n"
```

> **Important:** The private key must have literal `\n` characters (not real newlines) in the `.env.local` file.
> Copy the `private_key` field from the downloaded JSON, and replace all real newlines with `\n`.

---

## 5. Deploy to Vercel

In your Vercel project → **Settings → Environment Variables**, add the same 3 variables.

---

## 6. Test it

Run `npm run dev`, go to the waitlist section, enter an email — it should appear in the sheet within seconds.
