# File.io Playwright Automation

This project contains a Playwright TypeScript automation test for the file upload and sharing flow on [file.io](https://www.file.io/).

Prerequisites:
Use Node.js version 20 or 22.
node -v 

Installation:
npm install
npx playwright install chromium
Run Tests
Run in headed mode:

npm test:
Run in headless mode:

npm run test:headless
Run with Playwright UI:

npm run test:ui

## Scenario Covered

- Open file.io
- Upload two image files
- Wait until the upload/share page is ready
- Add one more file using the menu option
- Generate and copy the share link
- Open the share link in a new browser tab
- Validate that the shared link loads successfully

## Tech Stack

- Playwright
- TypeScript
- Node.js

## Project Structure


```text

.
├── locators/        # Centralized selectors
├── pages/           # Page Object Model methods
├── test-data/       # Files used for upload testing
├── tests/           # Playwright test specs
├── playwright.config.ts
├── package.json
└── tsconfig.json


