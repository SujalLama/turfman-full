// "use strict";
// const stripe = require("stripe")(
//   process.env.STRAPI_ADMIN_TEST_STRIPE_SECRET_KEY
// );
// const YOUR_DOMAIN = process.env.YOUR_DOMAIN;

// /**
//  * order controller
//  */

// const { createCoreController } = require("@strapi/strapi").factories;

// module.exports = createCoreController("api::order.order", ({ strapi }) => ({
//   async create(ctx) {
//     // const user = ctx.state.user;

//     // if (!user) {
//     //   return ctx.unauthorized("You are not authorized!");
//     // }

//     const {
//       deliveryAddress,
//       total,
//       products,
//       paymentMethod,
//       phone,
//       deliveryNotes,
//       deliveryDate,
//       shippingCost,
//       email,
//       firstName,
//       lastName,
//     } = ctx.request?.body?.data;

//     validation(ctx);

//     try {
//       //   Create the order
//       const order = await strapi.service("api::order.order").create({
//         data: {
//           deliveryAddress,
//           total,
//           products,
//           paymentMethod,
//           phone,
//           deliveryNotes,
//           deliveryDate,
//           shippingCost,
//           email,
//         },
//       });

//       return {
//         success: { message: "Order successfully placed" },
//         order,
//       };
//     } catch (err) {
//       ctx.response.status = 500;
//       return {
//         error: { message: "There was a problem creating the charge" },
//         products,
//       };
//     }
//   },
// }));

// function validation(ctx) {
//   const { deliveryAddress, email } = ctx.request.body?.data;

//   if (!email) {
//     ctx.response.status = 500;
//     return {
//       error: { message: "Email is required." },
//     };
//   }

//   if (!deliveryAddress?.state) {
//     ctx.response.status = 500;
//     return {
//       error: { message: "State is required." },
//     };
//   }

//   if (!deliveryAddress?.postcode) {
//     ctx.response.status = 500;
//     return {
//       error: { message: "Postcode is required." },
//     };
//   }

//   if (!deliveryAddress?.city) {
//     ctx.response.status = 500;
//     return {
//       error: { message: "City is required." },
//     };
//   }

//   if (!deliveryAddress?.street) {
//     ctx.response.status = 500;
//     return {
//       error: { message: "Street is required." },
//     };
//   }
// }

"use strict";

/**
 * product controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async update(ctx) {
    let orderInput = ctx.request.body.data;

    const { id } = ctx.params;

    // converting formData
    if (typeof orderInput === "string") {
      orderInput = JSON.parse(orderInput);
    }

    if (!orderInput.email) {
      return ctx.forbidden("Please provide required field");
    }

    const orders = await strapi.db.query("api::order.order").findMany({
      where: { email: orderInput.email },
    });

    if (orders.length === 0) {
      return ctx.notFound("You are not authorized");
    }

    const newOrders = orders.map((order) => order.id);

    if (!newOrders.includes(parseInt(id))) {
      return ctx.notFound("You are not authorized");
    }

    if (ctx.request?.files) {
      const upload = await strapi.entityService.update("api::order.order", id, {
        data: {},
        files: {
          paymentSlip: ctx.request.files["files.paymentSlip"],
        },
      });

      if (!upload) {
        return ctx.badRequest("File is not uploaded");
      }
    }

    const entry = await strapi.entityService.update("api::order.order", id, {
      data: {
        token: orderInput.token ?? "",
        paymentStatus: "processing",
      },
    });

    return entry;
  },
}));
