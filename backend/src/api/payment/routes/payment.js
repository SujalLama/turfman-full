module.exports = {
  routes: [
    {
      method: "POST",
      path: "/payment",
      handler: "payment.createPayment",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
