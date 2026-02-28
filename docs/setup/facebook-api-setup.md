# Facebook Graph API Setup — bienzoli Marketing Engine

## Overview

The bienzoli marketing engine auto-posts to the **bienzoli Facebook Page** every day at 10:00 AM MUT (Mauritius Time, UTC+4) using a GitHub Actions cron job. Posts include a generated social card image + caption.

This guide walks you through getting a permanent **Page Access Token**.

---

## Prerequisites

- A Facebook account with admin access to the bienzoli Page
- The bienzoli Facebook Page is already created

---

## Step 1 — Create a Facebook App

1. Go to [developers.facebook.com](https://developers.facebook.com)
2. Click **My Apps → Create App**
3. Select **Business** as the app type
4. Fill in:
   - App name: `bienzoli-marketing`
   - Contact email: `vince@bienzoli.com`
5. Click **Create App**

---

## Step 2 — Add the Pages API Product

1. In your app dashboard, click **Add a Product**
2. Find **Facebook Login** → click **Set Up**
3. Choose **Web**, enter `https://bienzoli.com` as the site URL
4. Save and go back to the dashboard

---

## Step 3 — Get a Short-Lived User Token

1. Go to the [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Select your `bienzoli-marketing` app in the top-right dropdown
3. Click **Generate Access Token**
4. Grant these permissions:
   - `pages_manage_posts`
   - `pages_read_engagement`
   - `pages_show_list`
   - `publish_video` (optional, for video posts)
5. Copy the generated **User Access Token**

---

## Step 4 — Get Your Page ID

In Graph API Explorer, run:
```
GET /me/accounts
```
Find your bienzoli page in the response. Copy the `id` field — this is your **Page ID**.

Also copy the `access_token` from this response — this is your **Page Access Token** (short-lived at this point).

---

## Step 5 — Exchange for a Long-Lived Token

Long-lived tokens last ~60 days. Run this in your terminal (fill in your values):

```bash
curl "https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=YOUR_APP_ID&client_secret=YOUR_APP_SECRET&fb_exchange_token=SHORT_LIVED_USER_TOKEN"
```

Get the returned `access_token` — this is your long-lived user token.

Then exchange for a **permanent Page Access Token** (never expires):

```bash
curl "https://graph.facebook.com/v19.0/YOUR_PAGE_ID?fields=access_token&access_token=LONG_LIVED_USER_TOKEN"
```

Copy the `access_token` from this response — **this is your permanent Page Access Token.**

---

## Step 6 — Add to .env.local

```env
FACEBOOK_PAGE_ID=your_page_id_here
FACEBOOK_PAGE_ACCESS_TOKEN=your_permanent_page_access_token_here
```

---

## Step 7 — Add to GitHub Secrets

In your GitHub repository:
1. Go to **Settings → Secrets and variables → Actions**
2. Add two secrets:
   - `FACEBOOK_PAGE_ID`
   - `FACEBOOK_PAGE_ACCESS_TOKEN`

These are used by the daily GitHub Actions workflow.

---

## Token Maintenance

Permanent Page Access Tokens linked to a System User do not expire. However, if you:
- Change your Facebook password
- Revoke app permissions
- Deactivate your Facebook account

...the token will be invalidated. If posts start failing, regenerate following Steps 3–5 and update GitHub Secrets.

---

## Testing

Once your `.env.local` has the tokens, test with:
```bash
node --env-file=.env.local scripts/facebook-post.mjs --test
```

This sends a test post to your Facebook Page.

---

## Permissions Reference

| Permission | Purpose |
|---|---|
| `pages_manage_posts` | Create/delete posts on the Page |
| `pages_read_engagement` | Read likes, comments, reach (for analytics) |
| `pages_show_list` | List pages the user manages |

---

*Agent 12 — Marketing Engine | bienzoli Agency System*
