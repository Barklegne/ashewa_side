module.exports = {
  transpileDependencies: ["vuetify"],
  pwa: {
    name: "Ashewa Marketplace",
    short_name: "Ashewa",
    start_url: "./index.html",
    display: "standalone",
    icons: [
      {
        src: "./images/mobile-logo.jpg",
        sizes: "192x192",
        type: "image/jpg",
      },
      {
        src: "./images/mobile-logo.jpg",
        sizes: "512x512",
        type: "image/jpg",
      },
      {
        src: "./images/mobile-logo.jpg",
        sizes: "192x192",
        type: "image/jpg",
        purpose: "maskable",
      },
      {
        src: "./images/mobile-logo.jpg",
        sizes: "512x512",
        type: "image/jpg",
        purpose: "maskable",
      },
    ],
    themeColor: "#4DBA87",
    msTileColor: "#ffffff",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
  },
};
