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

// CACHE TIMES
const QUOTE_CACHE_TIME = 1000 * 60 * 5 // 5 minutes
const GAINER_CACHE_TIME = 1000 * 60 * 5 // 5 minutes
const LOSER_CACHE_TIME = 1000 * 60 * 5 // 5 minutes
const INDEX_CACHE_TIME = 1000 * 60 * 5 // 5 minutes
const PROFILE_CACHE_TIME = 1000 * 60 * 60; // 60 minutes
const KEY_METRIC_CACHE_TIME = 1000 * 60 * 60; // 60 minutes
const INCOME_CACHE_TIME = 1000 * 60 * 60; // 60 minutes
const CASH_CACHE_TIME = 1000 * 60 * 60; // 60 minutes

// MONGODB CONNECTION
const mongoAddress = "127.0.0.1";
const mongoPort = "27017";
mongoose.connect(`mongodb://${mongoAddress}:${mongoPort}/stocks?directConnection=true&serverSelectionTimeoutMS=2000`);
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('connected', () => {
  console.log(`MongoDB connected -> ${mongoAddress} : ${mongoPort}.`);
  //db.collection('stocks').deleteMany(); // delete all data
});

// PROFILE
app.get('/profile', (req, res) => {
  try {
    let symbol = req.query.symbol;

    db.collection('stocks').countDocuments(
      {
        symbol: symbol, 
        timestamp: {
          $gt: Date.now() - PROFILE_CACHE_TIME
        }
      }
    )
    .then((counter) => {
      if (counter === 0) {
        const options = {
          method: 'GET',
          url: `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${API_KEY}`
        };
    
        axios.request(options).then((response) => {
          db.collection('stocks').replaceOne(
            {
              symbol: symbol
            },
            {
              symbol: symbol, 
              timestamp: Date.now(),
              profile: response.data
            },
            {
              upsert: true
            }
          );

          res.json(response.data);
          console.log(`API request -> ${new Date().toUTCString()}`);
        }).catch((error) => {
          console.log(error); 
        });
      } else {
        db.collection('stocks').find(
          {
            symbol: symbol
          }
        ).forEach((stock) => {
          res.json(stock.profile);
        });

        console.log(`Database request -> ${new Date().toUTCString()}`);
      }
    });    
  } catch (error) {
    console.log(error);
  }
});

// QUOTE
app.get('/quote', (req, res) => {
  try {
    let symbol = req.query.symbol;

    db.collection('stocks').countDocuments(
      {
        symbol: symbol, 
        timestamp: {
          $gt: Date.now() - QUOTE_CACHE_TIME
        }
      }
    )
    .then((counter) => {
      if (counter === 0) {
        const options = {
          method: 'GET',
          url: `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${API_KEY}`
        };
    
        axios.request(options).then((response) => {
          db.collection('stocks').replaceOne(
            {
              symbol: symbol
            },
            {
              symbol: symbol, 
              timestamp: Date.now(),
              quote: response.data
            },
            {
              upsert: true
            }
          );

          res.json(response.data);
          console.log(`API request -> ${new Date().toUTCString()}`);
        }).catch((error) => {
          console.log(error); 
        });
      } else {
        db.collection('stocks').find(
          {
            symbol: symbol
          }
        ).forEach((stock) => {
          res.json(stock.quote);
        });

        console.log(`Database request -> ${new Date().toUTCString()}`);
      }
    });
  } catch (error) {
    console.log(error);
  }  
});

// KEY METRICS
app.get('/keymetrics', (req, res) => {
  try {
    let symbol = req.query.symbol;

    const options = {
      method: 'GET',
      url: `https://financialmodelingprep.com/api/v3/key-metrics/${symbol}?limit=1&apikey=${API_KEY}`
    };

    axios.request(options).then((response) => {
      res.json(response.data);
    }).catch((error) => {
      console.log(error);
    });
  } catch (error) {
    console.log(error);
  }  
});

// INCOME STATEMENT
app.get('/income', (req, res) => {
  try {
    let symbol = req.query.symbol;

    const options = {
      method: 'GET',
      url: `https://financialmodelingprep.com/api/v3/income-statement/${symbol}?limit=1&apikey=${API_KEY}`
    };

    axios.request(options).then((response) => {
      res.json(response.data);
    }).catch((error) => {
      console.log(error);
    });
  } catch (error) {
    console.log(error);
  }  
});

// CASH FLOW STATEMENT
app.get('/cash', (req, res) => {
  try {
    let symbol = req.query.symbol;

    const options = {
      method: 'GET',
      url: `https://financialmodelingprep.com/api/v3/cash-flow-statement/${symbol}?limit=1&apikey=${API_KEY}`
    };

    axios.request(options).then((response) => {
      res.json(response.data);
    }).catch((error) => {
      console.log(error);
    });
  } catch (error) {
    console.log(error);
  }  
});

// INDEXES
app.get('/indexes', (req, res) => {
  try {
    const options = {
      method: 'GET',
      url: `https://financialmodelingprep.com/api/v3/quote/%5EGSPC,%5EDJI,%5EIXIC?apikey=${API_KEY}`
    };
  
    axios.request(options).then((response) => {
      res.json(response.data);
    }).catch((error) => {
      console.log(error);
    });
  } catch (error) {
    console.log(error);
  }  
});

// GAINERS
app.get('/gainers', (req, res) => {
  try {
    const options = {
      method: 'GET',
      url: `https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=${API_KEY}`
    };
  
    axios.request(options).then((response) => {
      res.json(response.data);
    }).catch((error) => {
      console.log(error);
    });
  } catch (error) {
    console.log(error);
  }  
});

// LOSERS
app.get('/losers', (req, res) => {
  try {
    const options = {
      method: 'GET',
      url: `https://financialmodelingprep.com/api/v3/stock_market/losers?apikey=${API_KEY}`
    };
  
    axios.request(options).then((response) => {
      res.json(response.data);
    }).catch((error) => {
      console.log(error);
    });
  } catch (error) {
    console.log(error);
  }  
});

try {  
  app.listen(8000, () => console.log(`Server is running -> 127.0.0.1 : ${port}.`));
} catch (error) {
  console.log(error);
}