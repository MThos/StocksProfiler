import React from 'react';
import { useLocation } from 'react-router-dom'

const Footer = () => {
  const location = useLocation();
  const active = location.pathname

  return (
    <footer>
      <ul>
        <li>Copyright &#169; {new Date().getFullYear()}</li>
        <li><a href="/privacy" id="privacy" className={active === "/privacy" ? 'nav-active' : 'nav-link'}>Privacy Policy</a></li>
        <li><a href="/terms" id="terms" className={active === "/terms" ? 'nav-active' : 'nav-link'}>Terms and Conditions</a></li>
        <li><a href="/cookies" id="cookies" className={active === "/cookies" ? 'nav-active' : 'nav-link'}>Cookies</a></li>
        <li><a href="/contact" id="contact" className={active === "/contact" ? 'nav-active' : 'nav-link'}>Contact</a></li>
      </ul>
    </footer>
  )
}

export default Footer;