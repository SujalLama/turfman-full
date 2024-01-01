// @ts-nocheck
"use strict";

const axios = require("axios");

/**
 * order service
 */

const { createCoreService } = require("@strapi/strapi").factories;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

module.exports = createCoreService("api::order.order", ({ strapi }) => ({
  async emailService({ to, subject, html }) {
    await strapi.plugins["email"].services.email.send({
      to,
      subject,
      html,
      from: ADMIN_EMAIL,
    });
  },
  async engageBayService({
    name,
    email,
    zip,
    city,
    state,
    country,
    phone,
    tags,
  }) {
    await axios.post(
      process.env.ENGAGE_API_URL,
      {
        score: 10,
        properties: [
          {
            name: "name",
            value: name,
            field_type: "TEXT",
            is_searchable: false,
            type: "SYSTEM",
          },
          {
            name: "email",
            value: email,
            field_type: "TEXT",
            is_searchable: false,
            type: "SYSTEM",
          },
          {
            name: "phone",
            value: phone,
            field_type: "TEXT",
            is_searchable: false,
            type: "SYSTEM",
          },
          {
            name: "country",
            value: country,
            field_type: "TEXT",
            is_searchable: false,
            type: "SYSTEM",
          },
          {
            name: "city",
            value: city,
            field_type: "TEXT",
            is_searchable: false,
            type: "SYSTEM",
          },
          {
            name: "state",
            value: state,
            field_type: "TEXT",
            is_searchable: false,
            type: "SYSTEM",
          },
          {
            name: "zip",
            value: zip,
            field_type: "TEXT",
            is_searchable: false,
            type: "SYSTEM",
          },
        ],
        tags: tags,
      },
      {
        headers: {
          Authorization: process.env.ENGAGE_API_KEY,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  },
  async detrackService(order) {
    const { data } = await axios.post(
      process.env.DETRACK_API_URL,
      {
        data: {
          type: "Delivery",
          order_number: order.orderId,
          date: order.deliveryDate,
          address: order.deliveryAddress.street,
          postal_code: order.deliveryAddress.postcode,
          city: order.deliveryAddress.city,
          state: order.deliveryAddress.state,
          country: "australia",
          deliver_to_collect_from: order.firstName,
          last_name: order.lastName,
          phone_number: order.phone,
          notify_email: order.email,
          items_count: order.products.length,
          do_number: order.orderId,
          payment_mode: order.paymentMethod,
          payment_amount: order.total,
          instructions: order.deliveryNotes,
          items: order.products.map((product) => ({
            id: product.id,
            sku: product.sku,
            description: product.name,
            purchase_order_number: order.orderId,
            quantity: product.quantity,
            photo_url: product.img.src,
          })),
        },
      },
      {
        headers: {
          "x-api-key": process.env.DETRACK_API_KEY,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  },
}));
