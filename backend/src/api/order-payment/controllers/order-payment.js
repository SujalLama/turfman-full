"use strict";

/**
 * A set of functions called "actions" for `order-payment`
 */

module.exports = {
  updatePaymentAction: async (ctx, next) => {
    try {
      const { orderId, email, paymentMethod } = ctx.request.body.data;

      if (!orderId || !email) {
        return ctx.forbidden("Please provide required field");
      }

      const order = await strapi.db.query("api::order.order").findOne({
        where: { orderId, email },
      });

      if (!order) {
        return ctx.notFound("You are not authorized");
      }

      const entry = await strapi.entityService.update(
        "api::order.order",
        order.id,
        {
          data: {
            paymentMethod,
            paymentStatus:
              paymentMethod === "bankTransfer" ? "unpaid" : order.paymentStatus,
            token: null,
          },
        }
      );

      if (!entry) {
        return ctx.internalServerError("Entry not updated");
      }

      return entry;
    } catch (err) {
      return ctx.internalServerError("Entry not updated");
    }
  },
};
