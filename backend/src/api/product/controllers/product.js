"use strict";

/**
 * product controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::product.product", ({ strapi }) => ({
  async update(ctx) {
    const { popularity } = ctx.request.body?.data;
    const { id } = ctx.params;

    if (!popularity) {
      return ctx.forbidden("Please provide required field");
    }

    const entry = await strapi.entityService.update(
      "api::product.product",
      id,
      {
        data: {
          popularity,
        },
      }
    );

    return entry;
  },
}));
