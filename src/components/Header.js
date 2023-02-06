import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Header = () => {
  const [active, setActive] = useState('');
  const [stockListData, setStockListData] = useState([]);
  const symbol = (active) ? active : "AAPL";
  const title = "LOVE THE STOCKS";

  const handleKeyPress = (e) => {
    try {
      if (e.key === "Enter" && e.target.value.length > 0) {
        localStorage.setItem('active', e.target.value.toUpperCase());
        setActive(e.target.value.toUpperCase());
        //e.target.blur(); // wont allow the state to rerender
        e.target.value = "";
      }
    } catch (error) {
      console.log(error);
    }    
  }

  useEffect(() => {
    try {
      setActive(localStorage.getItem('active'));

      const options = {
        method: 'GET',
        url: 'http://localhost:8000/stocklist'
      };
  
      axios.request(options).then((response) => {
        console.log(response);
        setStockListData(response.data[0]);
      }).catch((error) => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <header>
      <div id="header-symbol">
        {symbol}
      </div>
      <div id="header-title">
        {title}
      </div>
      <div id="header-text-input">
        <form>
          <input type="text" placeholder="SYMBOL" onKeyDown={e => handleKeyPress(e)} />
        </form>        
      </div>
    </header>
  )
}

export default Header;