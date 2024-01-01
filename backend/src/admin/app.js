const favicon = require("./extensions/favicon.png");

module.exports = {
  config: {
    // replace favicon with a custom icon
    head: {
      favicon: favicon,
    },
    translations: {
      en: {
        "app.components.LeftMenu.navbrand.title": "Turfman Admin",
      },
    },
  },
};
