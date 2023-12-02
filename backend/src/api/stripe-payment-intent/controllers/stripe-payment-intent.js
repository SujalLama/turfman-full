"use strict";

const stripe = require("stripe")(
  process.env.STRAPI_ADMIN_TEST_STRIPE_SECRET_KEY
);
const YOUR_DOMAIN = process.env.YOUR_DOMAIN;

/**
 * A set of functions called "actions" for `stripe-payment-intent`
 */

module.exports = {
  postAction: async (ctx, next) => {
    try {
      const { total } = ctx.request.body.data;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: parseInt(total),
        currency: "inr",
        payment_method_types: ["card"],
      });

      return { clientSecret: paymentIntent.client_secret };
    } catch (err) {
      ctx.response.status = 500;
      return {
        error: { message: "There was a problem creating the charge" },
      };
    }
  },
};

async function createInvoice(customer_id) {
  try {
    const invoice = await stripe.invoices.create({
      customer: customer_id,
    });
    console.log(invoice);
    return invoice;
  } catch (error) {
    console.error("Error creating invoice:", error);
    throw error;
  }
}

// Step 2: Create an invoice item for the invoice obtained from the previous step, by passing the customer_id, invoice_id, and either price_id or amount and currency.
async function createInvoiceItem(customer_id, amount, currency) {
  try {
    const invoiceItem = await stripe.invoiceItems.create({
      customer: customer_id,
      amount,
      currency,
    });
    return invoiceItem;
  } catch (error) {
    console.error("Error creating invoice item:", error);
    throw error;
  }
}

// Step 3: Finalize the invoice to set its status to "open" and automatically receive the payment intent.
async function finalizeInvoice(invoice_id) {
  try {
    const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice_id);
    return finalizedInvoice;
  } catch (error) {
    console.error("Error finalizing invoice:", error);
    throw error;
  }
}

// Step 4: Request the payment intent for the invoice.
async function getPaymentIntent(invoice_id, amount, currency) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      invoice: invoice_id,
      amount,
      currency,
      payment_method_types: ["card"],
    });
    return paymentIntent;
  } catch (error) {
    console.error("Error getting payment intent:", error);
    throw error;
  }
}
