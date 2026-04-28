function sortByBestDeal(products) {
  return products.sort((a, b) => {
    return (a.price / a.moq) - (b.price / b.moq);
  });
}

module.exports = sortByBestDeal;
