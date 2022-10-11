const formatProducts = (data) => {
  const items = [];
  let countItems = 0;
  for (let index = 0; index < data.length; index++) {
    if (countItems === 4) break;
    const currentValue = data[index];
    const splitPrice = currentValue.price.toString().split(".");
    const item = {
      id: currentValue.id,
      title: currentValue.title,
      price: {
        currency: currentValue.currency_id,
        amount: +splitPrice[0],
        decimals: splitPrice[1] ? +splitPrice[1] : 00,
      },
      picture: currentValue.thumbnail,
      condition: currentValue.condition,
      free_shipping: currentValue.shipping.free_shipping,
    };
    countItems += 1;
    items.push(item);
  }
  return items;
};

const compare = (a, b) => {
  if (a.results < b.results) {
    return 1;
  }
  if (a.results > b.results) {
    return -1;
  }
  return 0;
};

module.exports = {
  formatProducts,
  compare,
};
