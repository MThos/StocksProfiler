import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Terms from './components/Terms';
import Privacy from './components/Privacy'
import Cookies from './components/Cookies';
import Contact from './components/Contact';
import Company from './components/Company';
import Charts from './components/Charts';
import Details from './components/Details';
import StockTicker from './components/StockTicker';
import NotFound from './components/NotFound';

const App = () => {
  const [active, setActive] = useState('AAPL');

  useEffect(() => {
    try {
      if (localStorage.getItem('active') === null) {
        localStorage.setItem('active', active);
        setActive(localStorage.getItem('active'));
      };
    } catch (error) {
      console.log(error);
    }    
  });

  return (
    <div className="App">      
      <BrowserRouter>
        <Header />
        <StockTicker />
        <Navbar />
        <Routes>
          <Route path="/" element={<section></section>} />
          <Route path="charts" element={<Charts />} />
          <Route path="details" element={<Details />} />
          <Route path="company" element={<Company />} />
          <Route path="terms" element={<Terms />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="cookies" element={<Cookies />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
