import { useState, useEffect } from 'react';
import Ticker from 'react-ticker';
import axios from 'axios';
import { NumberConverter } from '../helper';

const StockTicker = () => {
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);
  const [indexes, setIndexes] = useState([]);

  useEffect(() => {
    try {
      const gainerOptions = {
        method: 'GET',
        url: 'http://localhost:8000/gainers'
      };
  
      const loserOptions = {
        method: 'GET',
        url: 'http://localhost:8000/losers'
      };
  
      const indexOptions = {
        method: 'GET',
        url: 'http://localhost:8000/indexes'
      };
  
      axios.request(gainerOptions).then((response) => {
        console.log(response.data);
        console.log(response.status);
        setGainers(response.data.slice(0, 5));
      }).catch((error) => {
        console.log(error);
      });
  
      axios.request(loserOptions).then((response) => {
        console.log(response.data);
        console.log(response.status);
        setLosers(response.data.slice(0, 5));
      }).catch((error) => {
        console.log(error);
      });
  
      axios.request(indexOptions).then((response) => {
        console.log(response.data);
        console.log(response.status);
        setIndexes(response.data);
      }).catch((error) => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }    
  }, []);

  if (gainers.length > 0 && losers.length > 0 && indexes.length > 0) {
    return(
      <Ticker speed={5}>
        {(index) => (
          <div id="ticker">
          <>
          {
          indexes.map(stock =>
            <div className="ticker-symbol">
              <span>{stock.symbol == "^IXIC" ? 
                stock.name.toUpperCase().substring(0,6) : 
                stock.name.toUpperCase().substring(0,3)}:
              </span>
              <span className={stock.changesPercentage.toString().substring(0,1) == "-" ? 
                "ticker-plus-minus red" : 
                "ticker-plus-minus green"}>
                  {stock.changesPercentage.toString().substring(0,1) == "-" ? "-" : "+"}
              </span>
              <span className={stock.changesPercentage.toString().substring(0,1) == "-" ? 
                "ticker-percent red" : 
                "ticker-percent green"}>{NumberConverter(stock.changesPercentage, 2)}%</span>
            </div>)            
          }
          {
          gainers.map(stock =>
            <div className="ticker-symbol">
              <span>{stock.symbol}:</span>
              <span className="ticker-plus-minus green">+</span>
              <span className="ticker-percent green">{NumberConverter(stock.changesPercentage, 1)}%</span>
            </div>)
          }
          {
          losers.map(stock =>
            <div className="ticker-symbol">
              <span>{stock.symbol}:</span>
              <span className="ticker-plus-minus red">-</span>
              <span className="ticker-percent red">{NumberConverter(stock.changesPercentage, 1)}%</span>
            </div>)
          }
          </>
          </div>
        )}
      </Ticker>
    )
  } else {
    return null;
  }
}

export default StockTicker;