"use strict";

/**
 * A set of functions called "actions" for `detrack-webhook`
 */

module.exports = {
  handleWebhookAction: async (ctx, next) => {
    try {
      const data = ctx.request.body;
      console.log("Webhook data received:", data);
    } catch (err) {
      ctx.body = err;
    }
  },
};
