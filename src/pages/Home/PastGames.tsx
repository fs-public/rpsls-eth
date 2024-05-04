import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "src/components/ui/Button";
import { rpsABI } from "src/hooks/contracts/generated";
import usePastGames from "src/store/usePastGames";
import { pastActionString } from "src/utils/date";
import { styled } from "styled-components";
import { formatEther, getContract } from "viem";
import { usePublicClient } from "wagmi";

const Container = styled.div``;

const StyledGrid = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 0.7fr 0.5fr 1fr;
  align-items: center;
  gap: 12px;

  @media (max-width: 640px) {
    display: flex;
    flex-direction: column;
    align-items: start;

    & > * > b {
      display: none;
    }

    & > :nth-child(4n + 8) {
      padding-bottom: 60px;
    }
  }
`;

const StyledGameAddress = styled.div`
  font-family: monospace;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const PastGames: React.FC = () => {
  const pastGames = usePastGames((state) => state.games);
  const publicClient = usePublicClient();

  const [displayGames, setDisplayGames] = useState<{ address: `0x${string}`; stake: string; activeBefore: number }[]>(
    []
  );

  useEffect(() => {
    (async () => {
      const now = Math.round(Date.now() / 1000);

      const contracts = pastGames.map((game) => getContract({ address: game.address, abi: rpsABI, publicClient }));
      const lastActions = await Promise.all(contracts.map((contract) => contract.read.lastAction()));
      const stakes = await Promise.all(contracts.map((contract) => contract.read.stake()));

      const combinedGames = pastGames.map((game, i) => ({
        address: game.address,
        stake: formatEther(stakes[i]),
        lastAction: Number(lastActions[i]),
      }));
      combinedGames.sort((a, b) => b.lastAction - a.lastAction);

      const newDisplay = combinedGames.map((game) => ({
        address: game.address,
        stake: game.stake,
        activeBefore: now - game.lastAction,
      }));

      setDisplayGames(newDisplay);
    })();
  }, [pastGames, publicClient]);

  return (
    <Container>
      <h2>Past Games</h2>
      {displayGames && displayGames.length > 0 ? (
        <StyledGrid>
          <StyledGameAddress>
            <b>Game Contract</b>
          </StyledGameAddress>
          <StyledGameAddress>
            <b>Last Active</b>
          </StyledGameAddress>
          <StyledGameAddress>
            <b>Stake</b>
          </StyledGameAddress>
          <div />
          {displayGames.map((game) => (
            <React.Fragment key={game.address}>
              <StyledGameAddress>{game.address}</StyledGameAddress>
              <StyledGameAddress>{pastActionString(game.activeBefore)}</StyledGameAddress>
              <StyledGameAddress>{game.stake} ETH</StyledGameAddress>
              <Link to={`/game/${game.address}`}>
                <Button text="Resume" />
              </Link>
            </React.Fragment>
          ))}
        </StyledGrid>
      ) : (
        <p>No games played yet. Create or join one!</p>
      )}
    </Container>
  );
};

export default PastGames;
