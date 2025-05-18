import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const ConnectWallet = () => {
  const { publicKey } = useWallet();
  
  return (
    <div className="wallet-wrapper">
      <WalletMultiButton 
        style={{
          backgroundColor: publicKey ? 'var(--primary)' : 'var(--accent)',
          fontFamily: 'var(--font-heading)',
          height: '40px'
        }}
      >
        {publicKey ? 
          `${publicKey.toBase58().slice(0,4)}...${publicKey.toBase58().slice(-4)}` : 
          'Connect Wallet'
        }
      </WalletMultiButton>
    </div>
  );
};

export default ConnectWallet;