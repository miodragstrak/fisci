import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import YieldCalculator from './components/YieldCalculator';
import RevenueFramework from './components/RevenueFramework';
import PlatformFocus from './components/PlatformFocus';
import ClientOfferings from './components/ClientOfferings';
import logo from './assets/ll2.svg'; // Make sure to import your logo
import './components/styles/main.css';

import {
  ConnectionProvider,
  WalletProvider,
  useConnection,
  useWallet
} from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';

import { 
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  AlphaWalletAdapter,
  CloverWalletAdapter
} from '@solana/wallet-adapter-wallets';

function App() {
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new AlphaWalletAdapter(),
      new CloverWalletAdapter()
    ],
    []
  );

  return (
    <ConnectionProvider endpoint="https://api.mainnet-beta.solana.com">
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <AppContent />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

function AppContent() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [solBalance, setSolBalance] = useState<number | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey) {
        const balance = await connection.getBalance(publicKey);
        setSolBalance(balance / 1e9); // Convert lamports to SOL
      }
    };
    fetchBalance();
  }, [publicKey, connection]);

  return (
    <BrowserRouter>
      {/* Unified Header */}
      
<header className="header">
  {/* Logo centered in header */}
  <div className="logo-container">
    <Link to="/">
      <img src={logo} alt="Fi-Sci-Foo Logo" className="main-logo" />
    </Link>
  </div>
  
  {/* Wallet button properly positioned */}
  <div className="wallet-wrapper">
    <WalletMultiButton className="wallet-connect-btn" />
  </div>
</header>

{/* Navbar below header */}
<nav className="navbar">
  <Link to="/">Finance Science</Link>
  <Link to="/platform">Our Platform</Link>
  <Link to="/revenues">Sci Revenues</Link>
  <Link to="/yield">Yield Calculator</Link>
</nav>

      {/* Main Content */}
      <main className="page-content">
        <Routes>
          <Route path="/" element={<ClientOfferings />} />
          <Route path="/revenues" element={<RevenueFramework />} />
          <Route path="/offerings" element={<ClientOfferings />} />
          <Route path="/platform" element={<PlatformFocus />} />
          <Route path="/yield" element={<YieldCalculator solBalance={solBalance} />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;