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
        if (response.data.s === 'no_data') {
          res.json({ error: 'Could not find any data for that stock' });
        } else {
          const results = findFluctuations(response.data, percent);
          res.json(results);
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: 'error' });
      });
  }
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
