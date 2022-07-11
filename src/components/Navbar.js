import React from 'react';
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const active = location.pathname
  
  return(
    <nav id="navbar">
      <ul>
        <li><Link to="/charts" id="charts" className={active === "/charts" ? 'nav-active' : 'nav-link'} >Charts</Link></li>
        <li><Link to="/details" id="details" className={active === "/details" ? 'nav-active' : 'nav-link'}>Details</Link></li>
        <li><Link to="/financials" id="financials" className={active === "/financials" ? 'nav-active' : 'nav-link'}>Financials</Link></li>
        <li><Link to="/analysis" id="analysis" className={active === "/analysis" ? 'nav-active' : 'nav-link'}>Analysis</Link></li>
        <li><Link to="/company" id="company" className={active === "/company" ? 'nav-active' : 'nav-link'}>Company</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar;