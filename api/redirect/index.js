module.exports = async function (context, req) {
  try {
    const currentUrl = new URL(req.url);
    const path = currentUrl.pathname || "/";
    const qs = currentUrl.search || "";
    const target = "https://safetypermit.io/s" + path + qs;
    context.res = {
      status: 301,
      headers: {
        "Location": target,
        "Cache-Control": "public, max-age=31536000"
      }
    };
  } catch (e) {
    context.log("redirect error", e);
    context.res = { status: 500, body: "redirect error" };
  }
};
