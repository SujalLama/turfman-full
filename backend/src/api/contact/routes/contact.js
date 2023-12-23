"use strict";

/**
 * contact router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::contact.contact", {
  config: {
    create: {
      auth: false,
      policies: [],
      middlewares: ["api::contact.captcha"],
    },
  },
});
