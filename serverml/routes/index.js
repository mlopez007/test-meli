const express = require("express");
const axios = require("axios").default;
const router = express.Router();
const utils = require("./utils");
const api = axios.create({
  baseURL: "https://api.mercadolibre.com",
});

router.get("/items", async function (req, res, next) {
  try {
    const response = await api.get("/sites/MLA/search", {
      params: { q: req.query.q },
    });
    const result = {
      author: {
        name: "Matias",
        lastname: "Lopez",
      },
    };

    const data = response.data.results;

    const items = utils.formatProducts(data);

    const categories = response.data.available_filters
      .find((item) => item.id === "category")
      ?.values.sort(utils.compare)
      .slice(0, 4)
      .map((item) => item.name);

    result["items"] = items;
    result["categories"] = categories;

    res.send(result);
  } catch (error) {
    console.log("error: ", error);
    res.json({});
  }
});

router.get("/items/:id", async function (req, res, next) {
  try {
    const result = {
      author: {
        name: "Matias",
        lastname: "Lopez",
      },
    };
    const [responseItem, responseItemDescription] = await Promise.all([
      api.get(`/items/${req.params.id}`),
      api.get(`/items/${req.params.id}/description`),
    ]);
    const splitPrice = responseItem.data.price.toString().split(".");
    const item = {
      id: responseItem.data.id,
      title: responseItem.data.title,
      price: {
        currency: responseItem.data.currency_id,
        amount: +splitPrice[0],
        decimals: splitPrice[1] ? +splitPrice[1] : 00,
      },
      picture: responseItem.data.thumbnail,
      condition: responseItem.data.condition,
      free_shipping: responseItem.data.shipping.free_shipping,
      sold_quantity: responseItem.data.sold_quantity,
      description: responseItemDescription.data.plain_text,
    };
    result["item"] = item;
    res.json(result);
  } catch (error) {
    console.log("error: ", error);
    res.json({});
  }
});

module.exports = router;
