const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const { type } = require('@testing-library/user-event/dist/type');
const app = express();
require('dotenv').config();

app.use(cors());

// API KEY
const API_KEY = process.env.REACT_APP_API_KEY

// MONGODB CONNECTION
const mongo_address = process.env.REACT_APP_MONGO_ADDR
const mongo_port = process.env.REACT_APP_MONGO_PORT
mongoose.connect(`mongodb://${mongo_address}:${mongo_port}/stocks?directConnection=true&serverSelectionTimeoutMS=2000`);
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('connected', () => {
  console.log(`MongoDB connected -> ${mongo_address} : ${mongo_port}.`);
  //db.collection('').deleteMany(); // delete collection data
  //db.dropDatabase(); // delete database
});

// RUN SERVER
try {
  const port = process.env.REACT_APP_NODE_PORT
  app.listen(port, () => console.log(`Server is running -> 127.0.0.1 : ${port}.`));
} catch (error) {
  console.log(error);
}

// STOCK LIST
app.get('/stocklist', (req) => {
  const STOCKLIST_CACHE_TIME = 1000 * 60 * 60 * 24;; // 60 minutes
  const STOCKLIST_ENDPOINT = `https://financialmodelingprep.com/api/v3/available-traded/list?apikey=${API_KEY}`;
  cachedStockList('stocklist', req, STOCKLIST_ENDPOINT, STOCKLIST_CACHE_TIME);
})

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
  const INDEX_CACHE_TIME = 1000 * 60 * 1 // 1 minutes
  const INDEX_ENDPOINT = `https://financialmodelingprep.com/api/v3/quote/%5EGSPC,%5EDJI,%5EIXIC?apikey=${API_KEY}`;
  cachedTickerData('indexes', req, res, INDEX_ENDPOINT, INDEX_CACHE_TIME);
});

// GAINERS
app.get('/gainers', (req, res) => {
  const GAINER_CACHE_TIME = 1000 * 60 * 1 // 5 minutes
  const GAINER_ENDPOINT = `https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=${API_KEY}`;
  cachedTickerData('gainers', req, res, GAINER_ENDPOINT, GAINER_CACHE_TIME);
});

// LOSERS
app.get('/losers', (req, res) => {
  const LOSER_CACHE_TIME = 1000 * 60 * 1 // 1 minutes
  const LOSER_ENDPOINT = `https://financialmodelingprep.com/api/v3/stock_market/losers?apikey=${API_KEY}`;
  cachedTickerData('losers', req, res, LOSER_ENDPOINT, LOSER_CACHE_TIME);
});

// PRICE TARGETS
app.get('/pricetargets', (req, res) => {
  const SYMBOL = req.query.symbol;
  const PRICE_TARGETS_CACHE_TIME = 1000 * 60 * 120 // 120 minutes
  const PRICE_TARGETS_ENDPOINT = `https://financialmodelingprep.com/api/v4/price-target?symbol=${SYMBOL}&apikey=${API_KEY}`;
  cachedStockData('pricetargets', req, res, SYMBOL, PRICE_TARGETS_ENDPOINT, PRICE_TARGETS_CACHE_TIME);
});

// PRICE TARGET CONSENSUS
app.get('/pricetargetconsensus', (req, res) => {
  const SYMBOL = req.query.symbol;
  const PRICE_TARGET_CONSENSUS_CACHE_TIME = 1000 * 60 * 120 // 120 minutes
  const PRICE_TARGET_CONSENSUS_ENDPOINT = `https://financialmodelingprep.com/api/v4/price-target-consensus?symbol=${SYMBOL}&apikey=${API_KEY}`;
  cachedStockData('pricetargetconsensus', req, res, SYMBOL, PRICE_TARGET_CONSENSUS_ENDPOINT, PRICE_TARGET_CONSENSUS_CACHE_TIME);
});

// DAILY HISTORICAL PRICING
app.get('/dailyhistory', (req, res) => {
  const SYMBOL = req.query.symbol;
  const DAILY_HISTORY_CACHE_TIME = 1000 * 60 * 5 // 5 minutes
  const DAILY_HISTORY_ENDPOINT = `https://financialmodelingprep.com/api/v3/historical-price-full/${SYMBOL}?apikey=${API_KEY}`;
  cachedStockData('dailyhistory', req, res, SYMBOL, DAILY_HISTORY_ENDPOINT, DAILY_HISTORY_CACHE_TIME);
});

// TOP 100 MARKET CAP
app.get('/topmarketcap', (req, res) => {
  const TOP_MARKET_CAP_CACHE_TIME = 1000 * 60 * 1 // 1 minute
  const TOP_MARKET_CAP_ENDPOINT = `https://financialmodelingprep.com/api/v3/stock-screener?marketCapMoreThan=1000000000&volumeMoreThan=1&exchange=NYSE,NASDAQ,AMEX,EURONEXT,TSX&isActivelyTrading=true&isEtf=false&limit=100&apikey=${API_KEY}`;
  cachedTickerData('topmarketcap', req, res, TOP_MARKET_CAP_ENDPOINT, TOP_MARKET_CAP_CACHE_TIME);
});

// NEWS ARTICLES
app.get('/news', (req, res) => {
  const NEWS_CACHE_TIME = 1000 * 60 * 1 // 1 minute
  const NEWS_ENDPOINT = `https://financialmodelingprep.com/api/v3/stock_news?limit=100&apikey=${API_KEY}`;
  cachedTickerData('news', req, res, NEWS_ENDPOINT, NEWS_CACHE_TIME);
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
          access_log(API_KEY, type, end_point, req.socket.remoteAddress, true);
          call_history();
          console.log(`API request (${type}) -> ${new Date().toUTCString()} -> Client: ${req.socket.remoteAddress}`);
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

        console.log(`Database request (${type}) -> (${symbol}) -> ${new Date().toUTCString()} -> Client: ${req.socket.remoteAddress}`);
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
          access_log(API_KEY, type, end_point, req.socket.remoteAddress, true);
          call_history();
          console.log(`API request (${type}) -> ${new Date().toUTCString()} -> Client: ${req.socket.remoteAddress}`);
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

        console.log(`Database request (${type}) -> ${new Date().toUTCString()} -> Client: ${req.socket.remoteAddress}`);
      }
    });    
  } catch (error) {
    console.log(error);
  }
}

// does not require a symbol to be passed
function cachedStockList(type, req, end_point, cache_time) {
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

          access_log(API_KEY, type, end_point, req.socket.remoteAddress, true);
          call_history();
          console.log(`API request (${type}) -> ${new Date().toUTCString()} -> Client: ${req.socket.remoteAddress}`);
        }).catch((error) => {
          console.log(error); 
        });
      } else {
        console.log(`Database request (${type}) -> ${new Date().toUTCString()} -> Client: ${req.socket.remoteAddress}`);
      }
    });    
  } catch (error) {
    console.log(error);
  }
}

// count number of calls in the last minute
function call_history() {
  try {
    db.collection('access_log').countDocuments(
      {
        'success': true,
        'timestamp': {
          $gt: Date.now() - (1000 * 60) // 1m
        }
      }
    ).then((counter) => {      
      console.log(`API calls in the last 60s: ${counter}`);
      return counter;
    });
  } catch (error) {
    console.log(error);
  }
}

// log all api calls
function access_log(api_key, type, end_point, client, success) {
  try {
    db.collection('access_log').insertOne(
      {
        api_key: api_key, 
        type: type,
        end_point: end_point,
        datetimestamp: new Date().toUTCString(),
        timestamp: Date.now(),
        client: client,
        success: success
      }
    );
  } catch (error) {
    console.log(error);
  }
}