import React from 'react';
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const active = location.pathname
  
  return(
    <nav id="navbar">
      <ul>
        <li><a href="/charts" id="charts" className={active === "/charts" ? 'nav-active' : 'nav-link'} >Charts</a></li>
        <li><a href="/details" id="details" className={active === "/details" ? 'nav-active' : 'nav-link'}>Details</a></li>
        <li><a href="/financials" id="financials" className={active === "/financials" ? 'nav-active' : 'nav-link'}>Financials</a></li>
        <li><a href="/analysis" id="analysis" className={active === "/analysis" ? 'nav-active' : 'nav-link'}>Analysis</a></li>
        <li><a href="/company" id="company" className={active === "/company" ? 'nav-active' : 'nav-link'}>Company</a></li>
      </ul>
    </nav>
  )
}

export default Navbar;