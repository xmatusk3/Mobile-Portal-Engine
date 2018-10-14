export default utils = {
  relativeToAbsoluteUrl: (relativeUrl, absolutePrefix) => relativeUrl.replace("~", absolutePrefix),

  ensureHttpsAddress: (url) => {
    let ensuredUrl = url;

    if (ensuredUrl.startsWith('http') && !ensuredUrl.startsWith('https')) {
      ensuredUrl = ensuredUrl.replace('http', 'https');
    }
  
    if (!ensuredUrl.startsWith('https')) {
      ensuredUrl = `https://${ensuredUrl}`;
    }

    return ensuredUrl;
  },
}
