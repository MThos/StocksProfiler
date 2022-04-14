const express = require('express');
const axios = require('axios');
const cors = require('cors');
const port = 8000;
const app = express();
require('dotenv').config();

app.use(cors());

app.get('/company', (req, res) => {
  let API_KEY = process.env.REACT_APP_API_KEY;
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

app.listen(8000, () => console.log(`Server is running on port ${port}.`));