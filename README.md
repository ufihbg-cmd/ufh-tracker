# UFH Guest Tracker

A static website: `index.html` + `app.js` (no build step).

- Database and logins: Supabase (project `ufh-tracker`, already set up).
- Hosting: Vercel.
- `app.js` contains your Supabase address and public key in the `CONFIG` block at the top. The public (publishable) key is meant to be public. Never put a secret or service_role key in these files.

Upload both files to the root of the repository. Vercel republishes whenever the files change.
