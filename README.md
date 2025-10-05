# stfy.to → safetypermit.io/s redirect (Azure Static Web Apps - Free)

This repo turns **stfy.to/<anything>** into a **301** to **https://safetypermit.io/s/<anything>**.

## How it works
- `staticwebapp.config.json` rewrites all requests (`/*`) to the API endpoint `/api/redirect`.
- `api/redirect` is a tiny Azure Function that returns a 301 to the target URL, preserving the path and query string.

## Deploy (GitHub)
1. Create a new GitHub repo and push these files.
2. In Azure Portal → *Static Web Apps* → **Create** (Free):
   - Deployment source: **GitHub** (select your repo/branch)
   - Build details preset: **Custom**
   - **App location**: `/`
   - **API location**: `api`
   - **Output location**: (leave blank)
3. Let the GitHub Action finish.
4. In the SWA resource → **Custom domains** → add `stfy.to`:
   - Create a CNAME for `stfy.to` pointing to your SWA default hostname.
   - Verify and enable HTTPS.
5. Test: `https://stfy.to/ABC-DE-XYZ` → `https://safetypermit.io/s/ABC-DE-XYZ`.

## Notes
- This is server-side (301), good for SEO and fast.
- No cold-start issue for the static site; the function is very small and responds immediately.
- If you ever need to change the destination base, edit `index.js`.
