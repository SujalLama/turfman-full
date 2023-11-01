"use strict";
const stripe = require("stripe")(
  process.env.STRAPI_ADMIN_TEST_STRIPE_SECRET_KEY
);
const YOUR_DOMAIN = process.env.YOUR_DOMAIN;

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized("You are not authorized!");
    }

    const { address, amount, products, token, city, state } = ctx.request.body;

    try {
      const productsList = [
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: "Hat",
            },
            unit_amount: 100,
          },
          quantity: 10,
        },
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: "Jeans",
            },
            unit_amount: 100,
          },
          quantity: 10,
        },
      ];

      const session = await stripe.checkout.sessions.create({
        shipping_address_collection: {
          allowed_countries: ["IN"],
        },
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `${YOUR_DOMAIN}?success=true`,
        cancel_url: `${YOUR_DOMAIN}?cancel=true`,
        line_items: productsList,
      });

      // Create the order
      const order = await strapi.service("api::order.order").create({
        data: {
          amount,
          address,
          products,
          city,
          state,
          token: session.id,
          user: ctx.state.user.id,
        },
      });

      return { stripeSession: session };
    } catch (err) {
      // return 500 error
      console.log("err", err);
      ctx.response.status = 500;
      return {
        error: { message: "There was a problem creating the charge" },
        address,
        amount,
        products,
        token,
        city,
        state,
      };
    }
  },
}));
