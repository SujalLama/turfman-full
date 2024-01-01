module.exports = {
  routes: [
    {
      method: "POST",
      path: "/order-payment",
      handler: "order-payment.updatePaymentAction",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
