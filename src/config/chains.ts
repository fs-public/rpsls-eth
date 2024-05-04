import { arbitrumGoerli, avalancheFuji } from "wagmi/chains";

const chains = {
  "avax-fuji": {
    name: "Avalanche Fuji",
    chainId: 43113,
    nativeCurrency: { name: "AVAX", symbol: "AVAX", decimals: 18 },
    rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
    blockExplorerUrls: ["https://testnet.snowtrace.io"],
    wagmiConfig: avalancheFuji,
  },
  "arbitrum-goerli": {
    name: "Arbitrum Goerli",
    chainId: 421613,
    nativeCurrency: { name: "AGOR", symbol: "AGOR", decimals: 18 },
    rpcUrls: ["https://goerli-rollup.arbitrum.io/rpc"],
    blockExplorerUrls: ["https://goerli-rollup-explorer.arbitrum.io"],
    wagmiConfig: arbitrumGoerli,
  },
};

export const TESTNET_CHAIN = chains["avax-fuji"];
