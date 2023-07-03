import React, { useMemo } from "react";
import BlockExplorerLink from "src/components/web3/BlockExplorerLink";
import { StyledRow, StyledSimpleRow } from "../ui/StyledElements";
import PlayAgainButton from "../ui/PlayAgainButton";
import usePastGames from "src/store/usePastGames";

const GameResultsSection: React.FC<{ contract?: `0x${string}` }> = ({ contract }) => {
  const pastGames = usePastGames((state) => state.games);

  const solveTx = useMemo(
    () => pastGames.find((game) => game.address === contract)?.solveTxHash,
    [pastGames, contract]
  );

  return (
    <>
      <StyledRow>
        <StyledSimpleRow>
          <p>
            <span style={{ paddingRight: "10px" }}>The game has concluded and the wagered ETH have been credited.</span>
            {solveTx && <BlockExplorerLink hex={solveTx} />}
          </p>
        </StyledSimpleRow>
        <PlayAgainButton />
      </StyledRow>
    </>
  );

  /* Player 2 can't see the results
  return (
    <>
      <StyledRow>
        <StyledSimpleRow>
          Player 1 <StyledMove $move={0} $status={MoveStatus.NONE} /> won/tied against Player 2{" "}
          <StyledMove $move={c2 || 0} $status={MoveStatus.NONE} />
        </StyledSimpleRow>
      </StyledRow>
      <StyledRow>
        <p>{stake ? formatEther(stake) : "..."} ETH have been credited: tx link</p>
        <Button text="Play again?" onClick={() => navigate("/")} />
      </StyledRow>
    </>
  );*/
};

export default GameResultsSection;
