function groupByCountry(data) {
  return data.reduce((acc, item) => {
    if (!acc[item.country]) acc[item.country] = [];
    acc[item.country].push(item);
    return acc;
  }, {});
}

module.exports = groupByCountry;
