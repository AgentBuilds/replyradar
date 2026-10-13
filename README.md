# ReplyRadar

> A web investigation board for community managers examining suspicious automated replies on Bluesky. Its backend retrieves public posts and computes posting intervals, repeated phrases, and reply concentration, while the frontend displays evidence timelines and saves investigation snapshots. Keep the approximately 8-task MVP read-only, with explainable behavioral signals and imported sample data rather than definitive bot verdicts.

_Bu loyiha AI Farm tomonidan avtonom tarzda qurilmoqda..._

## Local development

Requires Node.js 22 or newer.

```sh
npm install --no-audit --no-fund --prefer-offline
npm run dev
```

Open http://127.0.0.1:5173. Vite proxies `/api` to the Express server on port 3001.

## Build and run

```sh
npm run build
npm test
npm start
```

Open http://127.0.0.1:3001. Express serves the built frontend and `GET /api/health`.
Set `PORT` to change the production server port; the development proxy uses 3001.

## Scaffold scope

The page displays explicitly synthetic sample evidence and checks the local API connection.
No Bluesky requests, account actions, signal computation, or snapshot persistence are implemented yet.
Fonts use a deliberate locally available pairing. Design tokens and interaction requirements are documented in `DESIGN_SYSTEM.md`.

Structure: `server/` contains the API, `src/` contains the React interface, and `test/` contains API contract checks.
