const express = require('express');
const axios = require('axios');
const cors = require('cors');
const port = 8000;
const app = express();
require('dotenv').config();

app.use(cors());

// API KEY
const API_KEY = process.env.REACT_APP_API_KEY

// COMPANY
app.get('/company', (req, res) => {
  let symbol = req.query.symbol;

  const options = {
    method: 'GET',
    url: 'https://financialmodelingprep.com/api/v3/profile/' + symbol + '?apikey=' + API_KEY
  };

  axios.request(options).then((response) => {
    res.json(response.data);
  }).catch((error) => {
    console.log(error);
  });
});

// INDEXES
app.get('/indexes', (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://financialmodelingprep.com/api/v3/quote/%5EGSPC,%5EDJI,%5EIXIC?apikey=' + API_KEY
  };

  axios.request(options).then((response) => {
    res.json(response.data);
  }).catch((error) => {
    console.log(error);
  });
});

// GAINERS
app.get('/gainers', (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=' + API_KEY
  };

  axios.request(options).then((response) => {
    res.json(response.data);
  }).catch((error) => {
    console.log(error);
  });
});

// LOSERS
app.get('/losers', (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://financialmodelingprep.com/api/v3/stock_market/losers?apikey=' + API_KEY
  };

  axios.request(options).then((response) => {
    res.json(response.data);
  }).catch((error) => {
    console.log(error);
  });
});

app.listen(8000, () => console.log(`Server is running on port ${port}.`));