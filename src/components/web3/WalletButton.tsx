import React from "react";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";
import { TESTNET_CHAIN } from "src/config/chains";
import Button from "../ui/Button";
import { abbrevAddress } from "src/utils/address";

const AccountDisplay: React.FC = () => {
  const { address } = useAccount();

  return <p style={{ textAlign: "right" }}>{address && abbrevAddress(address)}</p>;
};

const SwitchChainButton: React.FC = () => {
  const { switchNetwork, isLoading } = useSwitchNetwork();

  const handleSwitch = () => {
    if (!switchNetwork) {
      console.error("Cannot switch network. Please do it manually.");
      return;
    }
    try {
      switchNetwork(TESTNET_CHAIN.chainId);
    } catch (err) {
      console.error(err);
    }
  };

  return <Button pending={isLoading} text={`Switch to ${TESTNET_CHAIN.name}`} onClick={handleSwitch} />;
};

const ConnectButton: React.FC = () => {
  const { open, isOpen } = useWeb3Modal();
  return <Button disabled={isOpen} text={"Connect"} onClick={async () => await open({ route: "ConnectWallet" })} />;
};

const WalletButton: React.FC = () => {
  const { chain } = useNetwork();
  const { isConnected } = useAccount();
  if (isConnected) {
    if (chain && chain.id !== TESTNET_CHAIN.chainId) return <SwitchChainButton />;
    return <AccountDisplay />;
  }
  return <ConnectButton />;
};

export default WalletButton;
