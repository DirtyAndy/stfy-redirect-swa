// api/redirect/index.js
module.exports = async function (context, req) {
  try {
    // Use the original URL before SWA rewrote it to /api/redirect
    const original = req.headers['x-ms-original-url'] || req.url;
    const url = new URL(original);

    // e.g. "/MYCODE" or "/ABC-DE-XYZ/anything"
    const raw = (url.pathname || '/').replace(/^\/+/, '');
    const code = raw.split('/')[0]; // just the first segment

    // optional: validate "ABC-DE-XYZ" pattern
    // const valid = /^[A-Z0-9]+-[A-Z0-9]+-[A-Z0-9]+$/.test(code);
    // if (!valid) { context.res = { status: 404, body: "Not found" }; return; }

    const target = `https://safetypermit.io/checkin/${code}${url.search || ''}`;

    context.res = {
      status: 301,
      headers: {
        Location: target,
        'Cache-Control': 'public, max-age=31536000'
      }
    };
  } catch (e) {
    context.log('redirect error', e);
    context.res = { status: 500, body: 'redirect error' };
  }
};
