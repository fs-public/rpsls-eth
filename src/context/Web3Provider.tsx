import React from "react";
import { EthereumClient, w3mConnectors } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { TESTNET_CHAIN } from "src/config/chains";

const chains = [TESTNET_CHAIN.wagmiConfig];
const projectId = process.env.WALLETCONNECT_PROJECT_ID || "";

const { publicClient } = configureChains(chains, [publicProvider()]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);

const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <WagmiConfig config={wagmiConfig}> {children} </WagmiConfig>
    <Web3Modal {...{ projectId, ethereumClient }} />
  </>
);

export default Web3Provider;
