# Rock-Paper-Scissors-Lizard-Spock on Ethereum

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Ethereum](https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=Ethereum&logoColor=white)

Rock-Paper-Scissors-Lizard-Spock (also RPSLS) is a popular extension of the commonly known game [Rock-Paper-Scissors](https://en.wikipedia.org/wiki/Rock_paper_scissors). The rules state:

> Scissors cuts paper. Paper covers rock. Rock crushes lizard. Lizard poisons Spock. Spock smashes scissors. Scissors decapitates lizard. Lizard eats paper. Paper disproves Spock. Spock vaporizes rock. Rock crushes scissors.

It is an imperfect information game with a single mixed-strategy Nash equilibrium given by a uniform probability across all five possible moves.

This repository is an implementation of RPSLS on Ethereum (specifically Arbitrum Goerli testnet). Do you want to play it out with your nemesis over some testnet tokens? A new game is just one click away: **LINK TO DEPLOY**

### Technical overview

The RPS contract uses a commit-reveal scheme to assure Player 1 can commit to his move without revealing it. On the frontend, this is handled by a hash of a wallet signature of a password message. This hash (salt) is saved in localStorage, which is expected to be secure in the context of the application. If user does not use localStorage, he has the ability to save the password and provide a new signature at the reveal step.

#### Installation

```
yarn install
yarn prepare
```

For development build, run `yarn start`. For build, run `yarn build`.

Please note that `wagmi` often throws `TypeError: (0 , _reactQuery.QueryClient) is not a constructor` on development build. To fix, simply replace `@tanstack/react-query` with `@tanstack/react-query/` on 5th line in `node_modules/wagmi/dist/index.js`. Apparently an issue with run environments, happens with Jest (see [discussion](https://github.com/TanStack/query/issues/2226)), Parcel (see [discussion](https://stackoverflow.com/questions/74121341/typeerror-0-h-queryclient-is-not-a-constructor-react-query)).

#### Technology

Project runs on `yarn`, `React` and is served by `Parcel`. Ethereum connection is assured with modern frameworks `wagmi`, `viem`, `web3modal`. Styling is done with `styled-components`, state managed with `zustand` :bear:, and helpers used include `react-use`, `iconify`, `react-hook-form`, `react-hot-toast` and others. Contracts compiled with `hardhat`. Code quality assured by `eslint`, `prettier`, and `typescript`. Deployed with :heart: by Vercel.

#### Limitations

This is a complex, integrated application developed in a very short amount of time. As such, there is a range of limitations at the moment:

- There is no testing upon game join that the contract is not forged (except that it is indeed a contract). (todo)
- There is little testing that public RPC is communicating at the moment. Good connectivity is expected both at client and at the RPC.
- The solidity contract keeps little information closer to game closure (e.g. original stake or Player 1's real move), and does not emit events. Will need either manual parse of all transactions that happened or a backend cache. This makes result display less than ideal, particularly for Player 2.
- `Tailwind` with `PostCSS` shortcuts might have been faster to work with in a simpler project like this without a loss of semanticity.

Nice to have refactors:

- Use profiler and refactor to decrease number of rerenders, possibly call `useGame` hook fewer times and rather pass results as props (see how exactly wagmi caches).
- Use multicalls in `useGame.tsx` and `PastGames.tsx`, as well as wagmi's `usePrepareContractWrite`s elsewhere.
- Null/non-null assertions, as well as isAdressEqual assertions, are all around the place. Would be nice to consolidate, and possibly extract into utils to enforce this.
- Add more explanations to the frontend, possibly a dedicated route to the page. Add a modal to password generation.

#### Credits

Original implementation of solidity contract by [Clément Lesaege](https://github.com/clesaege/RPS/blob/master/RPS.sol). Images from [Wikipedia](http://commons.wikimedia.org/wiki/File:pierre_ciseaux_feuille_lézard_spock.svg).
