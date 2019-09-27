function getUrl() {
  let api = `${window.location.origin}/api`;
  
  if (process.env.VUE_APP_API_URL) {
  	api = process.env.VUE_APP_API_URL;
  }

  return api;
}

export default {
  url: getUrl(),
};
