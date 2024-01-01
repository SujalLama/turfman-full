"use strict";

const axios = require("axios");
const AFTERPAY_CHARGE_URL = process.env.AFTERPAY_CHARGE_URL;
const AFTERPAY_SECRET = process.env.AFTERPAY_SECRET;
const AFTERPAY_MERCHANT_ID = process.env.AFTERPAY_MERCHANT_ID;

const ZIPPAY_CHARGE_URL = process.env.ZIPPAY_CHARGE_URL;
const ZIPPAY_API_TOKEN = process.env.ZIPPAY_API_TOKEN;

/**
 * A set of functions called "actions" for `payment`
 */

module.exports = {
  createPayment: async (ctx, next) => {
    try {
      const { paymentMethod, token } = ctx.request.body.data;

      if (!paymentMethod) {
        return ctx.badRequest("Please provide required field");
      }

      const order = await strapi.db.query("api::order.order").findMany({
        where: { token, paymentStatus: "processing" },
      });

      if (order.length === 0) {
        return ctx.notFound("No order found");
      }

      let data = false;

      if (paymentMethod === "zipPay") {
        data = await zipPayPayment(order[0], token);
      }

      if (paymentMethod === "afterPay") {
        data = await afterPayPayment(order[0], token);
      }

      if (!data) {
        await strapi.db.query("api::order.order").update({
          where: { id: order[0].id },
          data: { paymentStatus: "cancelled" },
        });

        return ctx.internalServerError("Payment not approved");
      }

      const updateOrder = await strapi.db.query("api::order.order").update({
        where: { id: order[0].id },
        data: { paymentStatus: "paid" },
      });

      if (!updateOrder) {
        return ctx.internalServerError("Order not updated");
      }

      return updateOrder;
    } catch (err) {
      return ctx.internalServerError("Payment cancelled");
    }
  },
};

async function zipPayPayment(order, token) {
  try {
    const options = {
      method: "POST",
      url: ZIPPAY_CHARGE_URL,
      headers: {
        accept: "application/json",
        "Zip-Version": "2021-08-25",
        "content-type": "application/json",
        Authorization: `Bearer ${ZIPPAY_API_TOKEN}`,
      },
      data: {
        authority: {
          type: "checkout_id",
          value: token,
        },
        reference: order.id,
        amount: order.total,
        currency: "AUD",
        capture: true,
      },
    };

    const { data } = await axios.request(options);

    if (!data || data.state !== "captured") {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}

async function afterPayPayment(order, token) {
  try {
    const { data } = await axios.post(
      AFTERPAY_CHARGE_URL,
      {
        token,
        originalAmount: {
          amount: order.total.toFixed(2),
          currency: "AUD",
        },
      },
      {
        auth: {
          username: AFTERPAY_MERCHANT_ID,
          password: AFTERPAY_SECRET,
        },
      }
    );

    if (!data || data.status !== "APPROVED") {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}
