# Google Drive Setup — bienzoli

## Purpose
Automatically sync project documents, case studies, social cards, client deliverables, and business documents to Google Drive for backup and sharing.

## Google Drive Folder Structure
`/bienzoli/`
- `/docs/` — mirrors local `/docs/`
- `/case-studies/` — published case studies and supporting screenshots
- `/social-cards/` — social media assets per client
- `/client-deliverables/` — final exported deliverables
- `/invoices/` — generated invoices
- `/contracts/` — signed contracts
- `/content/` — marketing content assets

## Setup Steps
1. Create Google Cloud project at `console.cloud.google.com`.
2. Enable Google Drive API.
3. Create OAuth 2.0 credentials (Desktop app type).
4. Download `credentials.json` and place it in project root (add to `.gitignore`).
5. Run initial auth flow and store refresh token.
6. Populate folder IDs in `scripts/gdrive-folders.json`.
7. Add `GDRIVE_ROOT_FOLDER_ID` and OAuth vars to `.env.local`.

## Environment Variables
- `GDRIVE_ROOT_FOLDER_ID=[root folder ID]`
- `GDRIVE_CLIENT_ID=[OAuth client ID]`
- `GDRIVE_CLIENT_SECRET=[OAuth client secret]`
- `GDRIVE_REFRESH_TOKEN=[OAuth refresh token]`

## Sync Triggers
- New file in `content/case-studies/` -> Drive `/case-studies/`
- New file in `design/exports/` -> Drive `/social-cards/`
- Updated `docs/business/` files -> Drive `/docs/`
- New invoice -> Drive `/invoices/`
- New signed contract -> Drive `/contracts/`
- Manual trigger: `node scripts/sync-to-drive.mjs`

## Sync Manifest
Track all synced files in `logs/drive-sync.md` with:
- Local path
- Drive file ID
- Shareable link
- Last sync timestamp
