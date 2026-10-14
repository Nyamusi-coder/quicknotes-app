# QuickNotes App

QuickNotes is a lightweight, browser-based note-taking application designed to help users capture, organize, and manage their ideas efficiently. It allows users to add notes with specific categories, search through existing notes, and automatically saves everything locally so no data is lost on refresh.

## Features
- Add notes with a character limit (200 characters max) and category tagging (Personal, Work, Study).
- Real-time search functionality to filter notes instantly.
- LocalStorage persistence: notes survive page refreshes.
- Responsive design that works seamlessly on desktop and mobile devices.
- "Clear All" feature with a safety confirmation prompt.

## How to Run Locally
1. Clone this repository to your local machine.
2. Open the `index.html` file in any modern web browser.
3. Alternatively, use a local server extension like VS Code's "Live Server" for the best experience.

## What I Learned
1. **DOM Manipulation:** I learned how to safely create and append HTML elements using `createElement` and `textContent` instead of `innerHTML` to prevent security issues.
2. **Data Persistence:** I gained a solid understanding of how to use `JSON.stringify` and `JSON.parse` with `localStorage` to save and retrieve complex data structures like arrays of objects.
3. **Event Handling:** I practiced attaching event listeners to forms, inputs, and buttons to create dynamic, interactive features like real-time search and validation.