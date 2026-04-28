/**
 * 1. Price Comparison Logic
 * Sorts products based on best price per MOQ unit.
 */
function sortByBestDeal(products) {
    return products.sort((a, b) => {
      // Prevent division by zero
      const moqA = a.moq > 0 ? a.moq : 1;
      const moqB = b.moq > 0 ? b.moq : 1;
      return (a.price / moqA) - (b.price / moqB);
    });
  }
  
  /**
   * 2. Supplier Clustering by Country
   * Groups search results by their origin country.
   */
  function groupByCountry(data) {
    return data.reduce((acc, item) => {
      if (!acc[item.country]) acc[item.country] = [];
      acc[item.country].push(item);
      return acc;
    }, {});
  }
  
  /**
   * 3. Supplier Ranking Algorithm
   * Scores a supplier based on price competitiveness, rating, and flexibility (MOQ).
   */
  function scoreSupplier(product) {
    const priceScore = product.price > 0 ? (1 / product.price) * 0.5 : 0;
    const ratingScore = (product.rating || 0) * 0.3;
    const moqScore = product.moq > 0 ? (1 / product.moq) * 0.2 : 0;
    
    return priceScore + ratingScore + moqScore;
  }
  
  module.exports = {
    sortByBestDeal,
    groupByCountry,
    scoreSupplier
  };
