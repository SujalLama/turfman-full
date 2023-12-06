"use strict";

const stripe = require("stripe")(
  process.env.STRAPI_ADMIN_TEST_STRIPE_SECRET_KEY
);
const YOUR_DOMAIN = process.env.YOUR_DOMAIN;

/**
 * A set of functions called "actions" for `stripe-payment-intent`
 */

module.exports = {
  postAction: async (ctx, next) => {
    try {
      const { total } = ctx.request.body.data;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: parseInt(total),
        currency: "inr",
        payment_method_types: ["card"],
      });

      return { clientSecret: paymentIntent.client_secret };
    } catch (err) {
      ctx.response.status = 500;
      return {
        error: { message: "There was a problem creating the charge" },
      };
    }
  },
};
