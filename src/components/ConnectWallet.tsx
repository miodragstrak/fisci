import { useWallet } from '@solana/wallet-adapter-react';

const ConnectWallet = () => {
  const { publicKey, connect, disconnect, connected } = useWallet();

  return (
    <div>
      {connected ? (
        <>
          <p>Connected: {publicKey?.toBase58()}</p>
          <button onClick={disconnect}>Disconnect</button>
        </>
      ) : (
        <button onClick={connect}>Connect Wallet</button>
      )}
    </div>
  );
};

export default ConnectWallet;