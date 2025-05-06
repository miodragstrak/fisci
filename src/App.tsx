import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import YieldCalculator from './components/YieldCalculator';
import RevenueFramework from './components/RevenueFramework';
import PlatformFocus from './components/PlatformFocus';
import logo from './assets/ll2.svg';
import './components/styles/main.css';

import {
  ConnectionProvider,
  WalletProvider,
  useConnection,
  useWallet
} from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';

import '@solana/wallet-adapter-react-ui/styles.css';

const wallets = [new PhantomWalletAdapter()];

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
      {/* Header */}
      <header className="header-logo">
        <img src={logo} alt="Logo" style={{ width: '150px', height: 'auto' }} />
        <div style={{ position: 'absolute', right: '1rem', top: '1rem' }}>
          <WalletMultiButton />
        </div>
      </header>

      {/* Navbar */}
      <nav className="navbar">
        <Link to="/">Finance Science</Link>
        <Link to="/platform">Our Platform</Link>
        <Link to="/yield">Yield Calculator</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<RevenueFramework />} />
        <Route path="/platform" element={<PlatformFocus />} />
        <Route path="/yield" element={<YieldCalculator solBalance={solBalance} />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
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

export default App;
