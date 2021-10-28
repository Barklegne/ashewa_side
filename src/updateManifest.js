var fs = require("fs");

var data = `{
    "name": "Ashewa Marketplace",
    "short_name": "Ashewa Marketplace",
    "theme_color": "#4DBA87",
    "icons": [
      {
        "src": "./img/icons/android-chrome-192x192.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "./img/icons/android-chrome-512x512.png",
        "sizes": "512x512",
        "type": "image/png"
      },
      {
        "src": "./img/icons/android-chrome-maskable-192x192.png",
        "sizes": "192x192",
        "type": "image/png",
        "purpose": "maskable"
      },
      {
        "src": "./img/icons/android-chrome-maskable-512x512.png",
        "sizes": "512x512",
        "type": "image/png",
        "purpose": "maskable"
      }
    ],
    "start_url": ".",
    "scope":".",
    "display": "standalone",
    "background_color": "#ffffff",
    "themeColor": "#4DBA87",
    "msTileColor": "#ffffff",
    "appleMobileWebAppCapable": "yes",
    "appleMobileWebAppStatusBarStyle": "white"
  }`;

fs.writeFile("./dist/manifest.json", data, (err) => {
  if (err) console.log(err);
  console.log("Manifest Updated.");
});
