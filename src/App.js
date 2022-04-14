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
import NotFound from './components/NotFound';

const App = () => {
  return (
    <div className="App">      
      <BrowserRouter>
        <Header title="STOCKS·PROFILER" placeholder="SYMBOL" />
        <Navbar />
        <Routes>
          <Route path="/" element={<section></section>} />
          <Route path="charts" element={<Charts />} />
          <Route path="company" element={<Company />} />
          <Route path="terms" element={<Terms />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="cookies" element={<Cookies />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer active="" />
      </BrowserRouter>
    </div>
  );
}

export default App;
