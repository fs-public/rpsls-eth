import { TESTNET_CHAIN } from "src/config/chains";

export const getBlockExplorerAddressLink = (hex: `0x${string}`) => `${TESTNET_CHAIN.blockExplorerUrls}/address/${hex}`;

export const getBlockExplorerTxLink = (hex: `0x${string}`) => `${TESTNET_CHAIN.blockExplorerUrls}/tx/${hex}`;
