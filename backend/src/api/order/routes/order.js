"use strict";

/**
 * order router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::order.order", {
  config: {
    create: {
      auth: false,
      policies: [],
      middlewares: ["api::order.email-register"],
    },
  },
});
