# CV Screening Website

Browser website with a server-side chat token API. Requires Node.js 22 or newer.
No npm dependencies are needed.

## Run locally

1. Copy .env.example to .env if you do not already have .env.
2. Set BOT_SECRET to your Direct Line secret in .env.
3. Run npm start and open http://localhost:3000 in your browser.

The local server reads .env and serves /api/token and the HTML page. Open the
localhost URL instead of double-clicking index.html.

## Deploy to Vercel

Upload these files to GitHub, preserving the folder structure:

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

Do not upload .env, node_modules, dist, or the generated public folder.

Import the repository into Vercel. The included vercel.json configures the
build to copy only index.html into public. api/token.js runs as a server
function; server.js is for local development only.

In Vercel project Settings > Environment Variables, set BOT_SECRET for
Production (and Preview if needed), then deploy or redeploy. The secret stays
on the server; the browser receives a conversation token.

The token endpoint allows visitors to start a chat. User login and rate limiting
are not implemented.

## Dashboard behavior

On smaller screens, the history sidebar opens as a drawer. Chat text history is
stored in this browser; selecting an old chat shows its saved text and starts a
new bot session. Uploaded files are not saved in browser history. PDF optimization
preserves searchable text and retains the original when optimization fails or
does not reduce the file size.
