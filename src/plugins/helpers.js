// Default vue installation function
function install(Vue, options) {
  // Set protorype functions
  Vue.prototype.$slackUrl = slackUrl;
  Vue.prototype.$link = link;

  // This approach gives me problems with "this" context. I have to explore new options
  // Vue.prototype.$utils = {
  // 	slackUrl,
  // 	link,
  // };
};

// Custom functions. Here we can use all our utils or whatever we need.

/** slackUrl
 *  From a Slack user id, and using the "settings" store module, generate the
 *  slack user url
 *
 *  @param id {string} Slack user id
 *  @return {string} Slack user url
 */
function slackUrl(id = '') {
  let team = this.$store.getters['settings/slackWorkspace'];
  return `https://${team}.slack.com/team/${id}`;
}

/** link
 *  Sanitize a link
 *
 *  @param uri {string} Link to sanitize
 *  @return {string} Sanitized link or null (if no uri passed)
 */
function link(uri) {
  if (!uri) return null;

  let url = uri;

  if (url.toLowerCase().indexOf('http') === -1) {
    url = `https://${url}`;
  }

  return url;
}

export default {
  install,
};