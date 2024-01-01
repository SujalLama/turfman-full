module.exports = {
  async afterCreate(event) {
    const { result } = event;

    await strapi.service("api::order.order").engageBayService({
      name: result?.name ?? "",
      email: result?.email ?? "",
      zip: "",
      city: "",
      state: "",
      country: result?.address ?? "",
      phone: result?.phone ?? "",
      tags: [{ tag: "fertiliser" }, { tag: "turf" }],
    });
  },
};
