# IMDb Movie Scraper Button

A Chrome extension that detects IMDb movie pages and opens the corresponding scraper page on https://rdm.ayush.gg.

## Features

- Detects IMDb movie URLs (e.g., `tt1234567`).
- Activates the toolbar button only on movie pages.
- Clicking the button opens the scraper site in a **new tab**.
- Easily configurable scraper base URL (default: `https://rdm.ayush.gg/app/scraper/movie/`).

## Files

- `manifest.json` — Chrome extension manifest.
- `background.js` — Service worker script handling tab detection and button actions.
- `icon16.png`, `icon32.png`, `icon48.png`, `icon128.png` — Extension icons.

## Setup Instructions

1. **Download the extension**
   - Clone or download this repository as a ZIP.
   - Ensure all files (`manifest.json`, `background.js`, icons) are in one folder.

2. **Load the extension in Chrome**
   - Go to `chrome://extensions`.
   - Enable **Developer mode** (top right).
   - Click **Load unpacked**.
   - Select the extension folder.

3. **Test the extension**
   - Visit an IMDb movie page (e.g., https://www.imdb.com/title/tt1234567).
   - The button should become active.
   - Click it → a new tab should open with the scraper page.

4. **Prepare ZIP for Web Store**
   - Select all extension files (not the folder itself).
   - Compress into a ZIP file (`imdb-extension.zip`).

5. **Publish on Chrome Web Store**
   - Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole).
   - Pay the one-time $5 developer fee if you haven’t already.
   - Click **Add new item** → upload `imdb-extension.zip`.
   - Fill in title, description, screenshots, and category.
   - Submit for review.
