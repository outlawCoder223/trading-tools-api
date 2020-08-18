const getStockSymbol = (stocks) => {
  const results = [];
  for (const stock of stocks) {
    results.push(stock.displaySymbol);
  }
  return results;
};
