module.exports = {
  solidity: {
    version: "0.4.26",
    settings: {
      optimizer: {
        enabled: true,
        runs: 100,
      },
    },
  },
  paths: {
    sources: "./src/contracts",
    cache: "./src/contracts/.cache",
    artifacts: "./src/contracts/artifacts",
  },
};
