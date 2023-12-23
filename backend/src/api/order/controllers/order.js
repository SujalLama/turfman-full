"use strict";

/**
 * product controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async update(ctx) {
    let orderInput = ctx.request.body.data;

    const { id } = ctx.params;

    // converting formData
    if (typeof orderInput === "string") {
      orderInput = JSON.parse(orderInput);
    }

    if (!orderInput.email) {
      return ctx.forbidden("Please provide required field");
    }

    const orders = await strapi.db.query("api::order.order").findMany({
      where: { email: orderInput.email },
    });

    if (orders.length === 0) {
      return ctx.notFound("You are not authorized");
    }

    const newOrders = orders.map((order) => order.id);

    if (!newOrders.includes(parseInt(id))) {
      return ctx.notFound("You are not authorized");
    }

    // canceling the order
    if (orderInput.paymentCancel) {
      const entry = await strapi.entityService.update("api::order.order", id, {
        data: {
          paymentStatus: "cancelled",
        },
      });

      return entry;
    }

    // uploading the payment slip
    if (ctx.request?.files) {
      const upload = await strapi.entityService.update("api::order.order", id, {
        data: {},
        files: {
          paymentSlip: ctx.request.files["files.paymentSlip"],
        },
      });

      if (!upload) {
        return ctx.badRequest("File is not uploaded");
      }
    }

    // updating the order
    const entry = await strapi.entityService.update("api::order.order", id, {
      data: {
        token: orderInput.token ?? "",
        paymentStatus: "processing",
      },
    });

    return entry;
  },
}));
