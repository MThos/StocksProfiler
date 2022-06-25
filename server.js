const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const port = 8000;
const app = express();
require('dotenv').config();

app.use(cors());

// API KEY
const API_KEY = process.env.REACT_APP_API_KEY

// MONGODB CONNECTION
const mongoAddress = "127.0.0.1";
const mongoPort = "27017";
mongoose.connect(`mongodb://${mongoAddress}:${mongoPort}/stocks?directConnection=true&serverSelectionTimeoutMS=2000`);
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('connected', () => {
  console.log(`MongoDB connected -> ${mongoAddress} : ${mongoPort}.`);
  //db.collection('').deleteMany(); // delete collection data
  //db.dropDatabase(); // delete database
});

// RUN SERVER
try {  
  app.listen(8000, () => console.log(`Server is running -> 127.0.0.1 : ${port}.`));
} catch (error) {
  console.log(error);
}

// PROFILE
app.get('/profile', (req, res) => {
  const SYMBOL = req.query.symbol;
  const PROFILE_CACHE_TIME = 1000 * 60 * 60; // 60 minutes
  const PROFILE_ENDPOINT = `https://financialmodelingprep.com/api/v3/profile/${SYMBOL}?apikey=${API_KEY}`;
  cachedStockData('profile', req, res, SYMBOL, PROFILE_ENDPOINT, PROFILE_CACHE_TIME);
});

// QUOTE
app.get('/quote', (req, res) => {
  const SYMBOL = req.query.symbol;
  const QUOTE_CACHE_TIME = 1000 * 60 * 5 // 5 minutes
  const QUOTE_ENDPOINT = `https://financialmodelingprep.com/api/v3/quote/${SYMBOL}?apikey=${API_KEY}`;
  cachedStockData('quote', req, res, SYMBOL, QUOTE_ENDPOINT, QUOTE_CACHE_TIME);
});

// KEY METRICS
app.get('/keymetrics', (req, res) => {
  const SYMBOL = req.query.symbol;
  const KEY_METRIC_CACHE_TIME = 1000 * 60 * 60; // 60 minutes
  const KEY_METRIC_ENDPOINT = `https://financialmodelingprep.com/api/v3/key-metrics/${SYMBOL}?limit=1&apikey=${API_KEY}`;
  cachedStockData('keymetric', req, res, SYMBOL, KEY_METRIC_ENDPOINT, KEY_METRIC_CACHE_TIME);
});

// INCOME STATEMENT
app.get('/income', (req, res) => {
  const SYMBOL = req.query.symbol;
  const INCOME_CACHE_TIME = 1000 * 60 * 60; // 30 minutes
  const INCOME_ENDPOINT = `https://financialmodelingprep.com/api/v3/income-statement/${SYMBOL}?limit=1&apikey=${API_KEY}`;
  cachedStockData('income', req, res, SYMBOL, INCOME_ENDPOINT, INCOME_CACHE_TIME);
});

// CASH FLOW STATEMENT
app.get('/cash', (req, res) => {
  const SYMBOL = req.query.symbol;
  const CASH_CACHE_TIME = 1000 * 60 * 60; // 60 minutes
  const CASH_ENDPOINT = `https://financialmodelingprep.com/api/v3/cash-flow-statement/${SYMBOL}?limit=1&apikey=${API_KEY}`;
  cachedStockData('cash', req, res, SYMBOL, CASH_ENDPOINT, CASH_CACHE_TIME);
});

// ANNUAL STATEMENT
app.get('/annual', (req, res) => {
  const SYMBOL = req.query.symbol;
  const ANNUAL_CACHE_TIME = 1000 * 60 * 60; // 60 minutes
  const ANNUAL_ENDPOINT = `https://financialmodelingprep.com/api/v3/income-statement/${SYMBOL}?limit=120&apikey=${API_KEY}`;
  cachedStockData('annual', req, res, SYMBOL, ANNUAL_ENDPOINT, ANNUAL_CACHE_TIME);
});

// QUARTERLY STATEMENT
app.get('/quarterly', (req, res) => {
  const SYMBOL = req.query.symbol;
  const QUARTERLY_CACHE_TIME = 1000 * 60 * 60; // 60 minutes
  const QUARTERLY_ENDPOINT = `https://financialmodelingprep.com/api/v3/income-statement/${SYMBOL}?period=quarter&limit=400&apikey=${API_KEY}`;
  cachedStockData('quarterly', req, res, SYMBOL, QUARTERLY_ENDPOINT, QUARTERLY_CACHE_TIME);
});

// INDEXES
app.get('/indexes', (req, res) => {
  const INDEX_CACHE_TIME = 1000 * 60 * 5 // 5 minutes
  const INDEX_ENDPOINT = `https://financialmodelingprep.com/api/v3/quote/%5EGSPC,%5EDJI,%5EIXIC?apikey=${API_KEY}`;
  cachedTickerData('indexes', req, res, INDEX_ENDPOINT, INDEX_CACHE_TIME);
});

// GAINERS
app.get('/gainers', (req, res) => {
  const GAINER_CACHE_TIME = 1000 * 60 * 5 // 5 minutes
  const GAINER_ENDPOINT = `https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=${API_KEY}`;
  cachedTickerData('gainers', req, res, GAINER_ENDPOINT, GAINER_CACHE_TIME);
});

// LOSERS
app.get('/losers', (req, res) => {
  const LOSER_CACHE_TIME = 1000 * 60 * 5 // 5 minutes
  const LOSER_ENDPOINT = `https://financialmodelingprep.com/api/v3/stock_market/losers?apikey=${API_KEY}`;
  cachedTickerData('losers', req, res, LOSER_ENDPOINT, LOSER_CACHE_TIME);
});

// requires a symbol to be passed
function cachedStockData(type, req, res, symbol, end_point, cache_time) {
  try {
    db.collection(type).countDocuments(
      {
        symbol: symbol, 
        timestamp: {
          $gt: Date.now() - cache_time
        }
      }
    )
    .then((counter) => {
      if (counter === 0) {
        const options = {
          method: 'GET',
          url: end_point,
        };
    
        axios.request(options).then((response) => {
          db.collection(type).replaceOne(
            {
              symbol: symbol
            },
            {
              symbol: symbol, 
              timestamp: Date.now(),
              [type]: response.data
            },
            {
              upsert: true
            }
          );

          res.json(response.data);
          console.log(`API request (${type}) -> ${new Date().toUTCString()}`);
        }).catch((error) => {
          console.log(error); 
        });
      } else {
        db.collection(type).find(
          {
            symbol: symbol
          }
        ).forEach((response) => {
          if (response[type]) {
            //console.log(response[type]);
            res.json(response[type]);
          }
        });

        console.log(`Database request (${type}) -> (${symbol}) -> ${new Date().toUTCString()}`);
      }
    });    
  } catch (error) {
    console.log(error);
  }
}

// does not require a symbol to be passed
function cachedTickerData(type, req, res, end_point, cache_time) {
  try {
    db.collection(type).countDocuments(
      {
        type: type, 
        timestamp: {
          $gt: Date.now() - cache_time
        }
      }
    )
    .then((counter) => {
      if (counter === 0) {
        const options = {
          method: 'GET',
          url: end_point,
        };
    
        axios.request(options).then((response) => {
          db.collection(type).replaceOne(
            {
              type: type
            },
            {
              type: type, 
              timestamp: Date.now(),
              [type]: response.data
            },
            {
              upsert: true
            }
          );

          res.json(response.data);
          console.log(`API request (${type}) -> ${new Date().toUTCString()}`);
        }).catch((error) => {
          console.log(error); 
        });
      } else {
        db.collection(type).find(
          {
            type: type
          }
        ).forEach((response) => {
          if (response[type]) {
            //console.log(response[type]);
            res.json(response[type]);
          }
        });

        console.log(`Database request (${type}) -> ${new Date().toUTCString()}`);
      }
    });    
  } catch (error) {
    console.log(error);
  }
}