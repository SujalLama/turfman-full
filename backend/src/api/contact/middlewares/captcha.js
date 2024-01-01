"use strict";

const axios = require("axios");

const CAPTCHA_VERIFY = process.env.CAPTCHA_VERIFY;
const CAPTCHA_SECRET = process.env.CAPTCHA_SECRET;

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    let contactData = ctx.request.body.data;

    if (typeof contactData === "string") {
      contactData = JSON.parse(contactData);
    }

    if (!contactData.captcha) {
      return ctx.badRequest("Validate captcha first.");
    }

    try {
      const { data } = await axios.post(
        `${CAPTCHA_VERIFY}?secret=${CAPTCHA_SECRET}&response=${contactData.captcha}`
      );

      if (!data?.success) {
        return ctx.notFound("Validate captcha first.");
      }

      await next();
    } catch (error) {
      return ctx.internalServerError("Server error");
    }
  };
};
