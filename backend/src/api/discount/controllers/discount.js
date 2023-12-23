"use strict";

/**
 * discount controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::discount.discount",
  ({ strapi }) => ({
    async update(ctx) {
      const { email, code, count } = ctx.request.body?.data;
      const { id } = ctx.params;

      if (!email || !code) {
        return ctx.forbidden("Please provide required field");
      }

      const currentDate = formatDate(new Date());

      const existingDiscount = await strapi.entityService.findOne(
        "api::discount.discount",
        id,
        {
          populate: "discountedCustomers",
        }
      );

      if (
        currentDate < existingDiscount.startDate ||
        currentDate > existingDiscount.endDate
      ) {
        return ctx.forbidden("Date is expired");
      }

      if (existingDiscount.code !== code) {
        return ctx.forbidden("Code is not valid");
      }

      if (
        count > existingDiscount.maxCount ||
        existingDiscount.count >= existingDiscount.maxCount
      ) {
        return ctx.forbidden("Code is expired");
      }

      if (
        existingDiscount.discountedCustomers &&
        existingDiscount.discountedCustomers?.includes(email)
      ) {
        return ctx.forbidden("Code already used.");
      }

      if (!existingDiscount.discountedCustomers) {
        const discount = await strapi.entityService.update(
          "api::discount.discount",
          id,
          {
            data: {
              count,
              discountedCustomers: [email],
            },
          }
        );

        return discount;
      }

      const discount = await strapi.entityService.update(
        "api::discount.discount",
        id,
        {
          data: {
            count,
            discountedCustomers: [
              ...existingDiscount.discountedCustomers,
              email,
            ],
          },
        }
      );

      return discount;
    },
  })
);

function formatDate(date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}
