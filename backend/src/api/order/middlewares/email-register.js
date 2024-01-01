"use strict";

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    let order = ctx.request.body.data;

    if (typeof order === "string") {
      order = JSON.parse(order);
    }

    try {
      const { data } = await strapi
        .service("api::order.order")
        .engageBayService({
          name: order?.firstName ?? "",
          email: order?.email ?? "",
          city: order?.deliveryAddress?.city ?? "",
          state: order?.deliveryAddress?.state ?? "",
          zip: order?.deliveryAddress?.postcode ?? "",
          country: order?.deliveryAddress?.street ?? "",
          phone: order?.phone ?? "",
          tags: order?.products?.map((item) => ({ tag: item.category })) ?? [],
        });

      if (data) {
        await next();
      }
    } catch (error) {
      await next();
    }
  };
};
