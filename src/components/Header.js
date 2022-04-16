import { useState, useEffect } from 'react';

const Header = () => {
  const [active, setActive] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.target.value.length > 0) {
      localStorage.setItem('active', e.target.value.toUpperCase());
      setActive(e.target.value);
      e.target.blur();
      e.target.value = "";
    }
  }

  useEffect(() => {
    setActive(localStorage.getItem('active'));
  });  

  let symbol = (active) ? active : "STOCKS·PROFILER";

  return(
    <header>
      <div className="main-title">
        {symbol}
      </div>
      <div>
        <form>
          <input id="text-input" type="text" placeholder="SYMBOL" onKeyPress={e => handleKeyPress(e)} />
        </form>        
      </div>
    </header>
  )
}

export default Header;