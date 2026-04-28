function scoreSupplier(product) {
  return (
    (1 / product.price) * 0.5 +
    (product.rating || 0) * 0.3 +
    (1 / product.moq) * 0.2
  );
}

module.exports = scoreSupplier;
