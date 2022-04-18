import { useState, useEffect } from 'react';
import axios from 'axios';
import { NumberConverter } from '../helper.js';

const Company = () => {
  const [stockData, setStockData] = useState([]);
  const active = (localStorage.getItem('active')) ? localStorage.getItem('active') : 'AAPL';

  useEffect(() => {
    try {
      const options = {
        method: 'GET',
        url: 'http://localhost:8000/profile',
        params: { symbol: active }
      };
  
      axios.request(options).then((response) => {
        console.log(response.data[0]);
        console.log(response.status);
        setStockData(response.data[0]);
      }).catch((error) => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }    
  }, []);

  return(
    <section>
      <div id="company" className="company-flex">
        <div id="company-symbol">{stockData['symbol']}</div>
        <div id="company-name">{stockData['companyName']}</div>
        <div id="company-image"><img src={stockData['image']} /></div>        
        <div id="company-basic-details">
          <div id="company-exchange">{stockData['exchangeShortName']}</div>
          <div id="company-country">{stockData['country']}</div>
          <div id="company-sector">{stockData['sector']}</div>
          <div id="company-industry">{stockData['industry']}</div>
        </div>
        <div id="company-money-details">
          <div>
            PRICE<span className="company-green">${NumberConverter(stockData['price'], 2)}</span>
          </div>
          <div>
            MARKET CAP<span className="company-green">${NumberConverter(stockData['mktCap'], 2)}</span>
          </div>
          <div>
            VOLUME AVG<span className="company-green">{NumberConverter(stockData['volAvg'], 1)}</span>
          </div>
        </div>
        <div id="company-middle-flex">
          <div>
            IPO<span className="company-large">{stockData['ipoDate']}</span>
          </div>
          <div>
            CEO<span className="company-large">{stockData['ceo']}</span>
          </div>
          <div>
            EMPLOYEES<span className="company-large">{NumberConverter(stockData['fullTimeEmployees'], 0)}</span>
          </div>
        </div>
        <div id="company-description">{stockData['description']}</div>
      </div>
    </section>    
  )
}

export default Company;