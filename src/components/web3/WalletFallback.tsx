import React from "react";
import { useAccount, useNetwork } from "wagmi";
import { TESTNET_CHAIN } from "src/config/chains";
import WalletButton from "./WalletButton";

const WalletFallback: React.FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
  const { chain } = useNetwork();
  const { isConnected } = useAccount();

  if (!isConnected || !chain || chain.id !== TESTNET_CHAIN.chainId) return <WalletButton />;

  return <>{children}</>;
};

export default WalletFallback;
