const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const cors = require('cors');
const morgan = require('morgan');
const findFluctuations = require('./helpers/findFluctuations');
const app = express();
dotenv.config();
const port = process.env.PORT || 3001;
const API_KEY = process.env.API_KEY;

app.use(cors());
app.use(morgan('combined'));

app.get(
  '/api/v1/stocks/percent-above/ticker=:ticker&percent=:percent&time=:time',
  (req, res) => {
    const { ticker, percent, time } = req.params;
    const today = Math.floor(Date.now() / 1000);
    const URL = `https://finnhub.io/api/v1/stock/candle?symbol=${ticker}&resolution=D&from=${time}&to=${today}&token=${API_KEY}`;
    axios
      .get(URL)
      .then((response) => {
        const results = findFluctuations(response.data, percent);
        res.json(results);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: 'error' });
      });
  }
);

axios
  .get(
    'https://finnhub.io/api/v1/stock/symbol?exchange=US&token=bsta22v48v6ug49hg0n0'
  )
  .then((response) => {
    console.log(response.data);
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
