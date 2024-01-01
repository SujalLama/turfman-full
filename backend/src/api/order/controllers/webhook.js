module.exports = {
  async handleWebhook(ctx) {
    // Handle webhook logic here
    const data = ctx.request.body;
    console.log("Webhook data received:", data);

    // Respond to the webhook request
    ctx.send({ success: true });
  },
};
