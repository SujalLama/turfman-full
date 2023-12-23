"use strict";

const axios = require("axios");
const stripe = require("stripe")(
  process.env.STRAPI_ADMIN_TEST_STRIPE_SECRET_KEY
);

const AFTERPAY_CHECKOUT_URL = process.env.AFTERPAY_CHECKOUT_URL;
const AFTERPAY_SECRET = process.env.AFTERPAY_SECRET;
const AFTERPAY_MERCHANT_ID = process.env.AFTERPAY_MERCHANT_ID;

const ZIPPAY_CHECKOUT_URL = process.env.ZIPPAY_CHECKOUT_URL;
const ZIPPAY_API_TOKEN = process.env.ZIPPAY_API_TOKEN;
/**
 * A set of functions called "actions" for `payment-intent`
 */

module.exports = {
  paymentAction: async (ctx, next) => {
    try {
      const { paymentMethod, order } = ctx.request.body.data;

      if (!paymentMethod) {
        return ctx.forbidden("Please provide required field");
      }

      // stripe payment
      if (paymentMethod === "stripe") {
        const { total } = order;
        const paymentIntent = await stripe.paymentIntents.create({
          amount: parseInt(total),
          currency: "inr",
          payment_method_types: ["card"],
        });

        return { clientSecret: paymentIntent.client_secret };
      }

      // afterpay payment
      if (paymentMethod === "afterPay") {
        const { data } = await axios.post(AFTERPAY_CHECKOUT_URL, order, {
          auth: {
            username: AFTERPAY_MERCHANT_ID,
            password: AFTERPAY_SECRET,
          },
        });

        return (ctx.response.body = data);
      }

      // zippay payment
      if (paymentMethod === "zipPay") {
        const options = {
          method: "POST",
          url: ZIPPAY_CHECKOUT_URL,
          headers: {
            accept: "application/json",
            "Zip-Version": "2021-08-25",
            "content-type": "application/json",
            Authorization: `Bearer ${ZIPPAY_API_TOKEN}`,
          },
          data: {
            type: "standard",
            ...order,
          },
        };
        const { data } = await axios.request(options);

        return {
          id: data.id,
          uri: data.uri,
        };
      }
    } catch (err) {
      ctx.response.status = 500;
      return {
        error: { message: "There was a problem creating the charge!" },
      };
    }
  },
};
