module.exports = {
  routes: [
    {
      method: "POST",
      path: "/stripe-payment-intent",
      handler: "stripe-payment-intent.postAction",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
