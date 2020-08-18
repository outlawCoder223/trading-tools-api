const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.get('/api/v1/stocks/percent-above/:ticker&:percent&:time', (req, res) => {
  const { ticker, percent, time } = req.params;
  console.log(ticker);
  console.log(percent);
  console.log(time);
  const today = Math.floor(Date.now() / 1000);
  const URL = `https://finnhub.io/api/v1/stock/candle?symbol=${ticker}&resolution=D&from=${time}&to=${today}&token=${process.env.API_KEY}`;
  axios
    .get(URL)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
