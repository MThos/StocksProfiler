import { useState, useEffect } from 'react';

const Header = () => {
  const [active, setActive] = useState('');

  const handleKeyPress = (e) => {
    try {
      if (e.key === "Enter" && e.target.value.length > 0) {
        localStorage.setItem('active', e.target.value.toUpperCase());
        setActive(e.target.value);
        e.target.blur();
        e.target.value = "";
      }
    } catch (error) {
      console.log(error);
    }    
  }

  useEffect(() => {
    setActive(localStorage.getItem('active'));
  });  

  let symbol = (active) ? active : "";
  let title = "STOCKS·PROFILER";

  return(
    <header>
      <div id="header-symbol">
        {symbol}
      </div>
      <div id="header-title">
        {title}
      </div>
      <div id="header-text-input">
        <form>
          <input type="text" placeholder="SYMBOL" onKeyPress={e => handleKeyPress(e)} />
        </form>        
      </div>
    </header>
  )
}

export default Header;