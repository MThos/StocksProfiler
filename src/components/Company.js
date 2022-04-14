import { useState, useEffect } from 'react';
import axios from 'axios';

const Company = () => {
  const [stockData, setStockData] = useState(0);
  let active = (localStorage.getItem('active')) ? localStorage.getItem('active') : '';

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'http://localhost:8000/company',
      params: { symbol: active }
    };

    axios.request(options).then((response) => {
      console.log(response.data[0]);
      console.log(response.status);
      setStockData(response.data[0]);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  function convertCurrency(value) {
    return Math.abs(Number(value)) >= 1.0e+12
    ? (Math.abs(Number(value)) / 1.0e+12).toFixed(2) + "T"
    // Nine Zeroes for Billions
    : Math.abs(Number(value)) >= 1.0e+9
    ? (Math.abs(Number(value)) / 1.0e+9).toFixed(2) + "B"
    // Six Zeroes for Millions 
    : Math.abs(Number(value)) >= 1.0e+6
    ? (Math.abs(Number(value)) / 1.0e+6).toFixed(2) + "M"
    // Three Zeroes for Thousands
    : Math.abs(Number(value)) >= 1.0e+3
    ? (Math.abs(Number(value)) / 1.0e+3).toFixed(2) + "K"
    : Math.abs(Number(value));
  }

  return(
    <section>
      <div id="company" className="company-flex">
        <div id="company-symbol">{stockData['symbol']}</div>
        <div id="company-name">{stockData['companyName']}</div>
        <div id="company-image"><img src={stockData['image']} /></div>        
        <div id="company-middle">
          <div id="company-exchange">{stockData['exchangeShortName']}</div>
          <div id="company-country">{stockData['country']}</div>
          <div id="company-sector">{stockData['sector']}</div>
          <div id="company-industry">{stockData['industry']}</div>
        </div>
        <div id="company-money-details">
          <div id="company-price">PRICE&#183;<span className="company-green">${stockData['price']}</span></div>
          <div id="company-market-cap">MARKET CAP&#183;<span className="company-green">${convertCurrency(stockData['mktCap'])}</span></div>
        </div>
        <div id="company-middle-across">
          <div id="company-ipo">IPO&#183;{stockData['ipoDate']}</div>
          <div id="company-ceo">CEO&#183;{stockData['ceo']}</div>
          <div id="company-employees">Employees&#183;{stockData['fullTimeEmployees']}</div>
        </div>
        <div id="company-description">{stockData['description']}</div>
      </div>
    </section>    
  )
}

export default Company;