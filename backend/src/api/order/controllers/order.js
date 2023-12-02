"use strict";
const stripe = require("stripe")(
  process.env.STRAPI_ADMIN_TEST_STRIPE_SECRET_KEY
);
const YOUR_DOMAIN = process.env.YOUR_DOMAIN;

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    // const user = ctx.state.user;

    // if (!user) {
    //   return ctx.unauthorized("You are not authorized!");
    // }

    const {
      deliveryAddress,
      total,
      products,
      paymentMethod,
      phone,
      deliveryNotes,
      deliveryDate,
      shippingCost,
      email,
      firstName,
      lastName,
    } = ctx.request?.body?.data;

    validation(ctx);

    try {
      //   if (paymentMethod === "stripe") {

      const stripeSession = await stripePayment();

      return stripeSession;
      //   }

      //   Create the order
      const order = await strapi.service("api::order.order").create({
        data: {
          deliveryAddress,
          total,
          products,
          paymentMethod,
          phone,
          deliveryNotes,
          deliveryDate,
          shippingCost,
          email,
        },
      });

      //   ctx.response.status = 200;
      //   return {
      //     success: { message: "Order successfully placed" },
      //     order,
      //   };
    } catch (err) {
      ctx.response.status = 500;
      return {
        error: { message: "There was a problem creating the charge" },
        products,
      };
    }
  },
}));

// "use strict";

// /**
//  * post controller
//  */

// const { createCoreController } = require("@strapi/strapi").factories;

// module.exports = createCoreController("api::order.order");

function validation(ctx) {
  const { deliveryAddress, email } = ctx.request.body?.data;

  if (!email) {
    ctx.response.status = 500;
    return {
      error: { message: "Email is required." },
    };
  }

  if (!deliveryAddress?.state) {
    ctx.response.status = 500;
    return {
      error: { message: "State is required." },
    };
  }

  if (!deliveryAddress?.postcode) {
    ctx.response.status = 500;
    return {
      error: { message: "Postcode is required." },
    };
  }

  if (!deliveryAddress?.city) {
    ctx.response.status = 500;
    return {
      error: { message: "City is required." },
    };
  }

  if (!deliveryAddress?.street) {
    ctx.response.status = 500;
    return {
      error: { message: "Street is required." },
    };
  }
}

async function stripePayment() {
  //   console.log(customerDetails);
  //   const productsList = products.map((product) => {
  //     return {
  //       price_data: {
  //         currency: "INR",
  //         product_data: {
  //           name: product.name,
  //           images: [product.img.src],
  //         },
  //         unit_amount: product.price,
  //       },
  //       quantity: product.quantity,
  //     };
  //   });

  console.log("productsList");

  //   shipping_options: [
  //     {
  //       shipping_rate_data: {
  //         type: "fixed_amount",
  //         fixed_amount: {
  //           amount: shippingCost,
  //           currency: "IN",
  //         },
  //         display_name: "Shipping cost",
  //       },
  //     },
  //   ],
  //
  //   const session = await stripe.checkout.sessions.create({
  //     shipping_address_collection: {
  //       allowed_countries: ["IN"],
  //     },

  //     customer_email: customerDetails.email,
  //     shipping_cost: 120,
  //     payment_method_types: ["card"],
  //     mode: "payment",
  //     success_url: `${YOUR_DOMAIN}?success=true`,
  //     cancel_url: `${YOUR_DOMAIN}?cancel=true`,
  //     line_items: productsList,
  //   });
}
