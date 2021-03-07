const manifestJSON = require('./public/manifest.json');

module.exports = {
  publicPath: './',
  pwa: {
    manifestPath: 'manifest.json',
    name: manifestJSON.short_name,
    themeColor: manifestJSON.theme_color,
    msTileColor: manifestJSON.background_color,
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'white',
    manifestOptions: {
      gcm_sender_id: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
    },
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
    },
  },
};
