module.exports = {
  routes: [
    {
      method: "POST",
      path: "/push",
      handler: "push.handleWebhookAction",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
