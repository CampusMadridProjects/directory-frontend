function getUrl() {
  const protocol = process.env.VUE_APP_API_PROTOCOL;
  const url = process.env.VUE_APP_API_URL;
  const subdomain = '';

  return protocol + subdomain + url;
}

export default {
  url: getUrl(),
};
