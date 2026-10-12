# CV Screening Website

Browser website with a server-side chat token API. Requires Node.js 22 or newer.
No npm dependencies are needed.

## Run locally

1. Set BOT_SECRET to Direct Line secret in .env.
2. Run npm start and open http://localhost:3000 in  browser.

The local server reads .env and serves /api/token and the HTML page. Open the
localhost URL instead of double-clicking index.html.

## Deploy to Vercel

Uploaded these files to GitHub, preserving the folder structure:

- index.html
- api/token.js
- scripts/build-web.js
- server.js
- vercel.json
- package.json
- package-lock.json
- .gitignore
- .env.example
- README.md


## Dashboard behavior

On smaller screens, the history sidebar opens as a drawer. Chat text history is
stored in this browser; selecting an old chat shows its saved text and starts a
new bot session. Uploaded files are not saved in browser history. PDF optimization
preserves searchable text and retains the original when optimization fails or
does not reduce the file size.
