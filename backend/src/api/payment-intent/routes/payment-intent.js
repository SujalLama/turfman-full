module.exports = {
  routes: [
    {
      method: "POST",
      path: "/payment-intent",
      handler: "payment-intent.paymentAction",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
