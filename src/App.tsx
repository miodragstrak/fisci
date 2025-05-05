import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import YieldCalculator from './components/YieldCalculator';
import RevenueFramework from './components/RevenueFramework';
import logo from './assets/ll2.svg';
import './components/styles/main.css';

function App() {
  return (
    <BrowserRouter>
      {/* Logo */}
      <header className="header-logo">
        <img src={logo} alt="Logo" style={{ width: '150px', height: 'auto' }} />
      </header>

      {/* Navbar */}
      <nav className="navbar">
        <Link to="/">Revenue Framework</Link>
        <Link to="/yield">Yield Calculator</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<RevenueFramework />} />
        <Route path="/yield" element={<YieldCalculator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
