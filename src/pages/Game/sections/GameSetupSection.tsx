import React from "react";
import { useNavigate } from "react-router-dom";
import usePastGames from "src/store/usePastGames";
import { formatEther } from "viem";
import useGame from "src/hooks/useGame";
import Button from "src/components/ui/Button";
import { MoveStatus, StyledMove } from "src/components/MoveChoice";
import { useLocation } from "react-use";
import BlockExplorerLink from "src/components/web3/BlockExplorerLink";
import { StyledRow, StyledSimpleRow } from "../ui/StyledElements";
import { PlayerRole } from "src/types/types";
import useToastedClipboard from "src/hooks/useToastedClipboard";

const GameSetupSection: React.FC<{ contract?: `0x${string}` }> = ({ contract }) => {
  const { j1, j2, playerRole, c1, c2, stake } = useGame(contract);

  const removeGame = usePastGames((state) => state.removeGame);
  const { href } = useLocation();

  const navigate = useNavigate();
  const writeToClipboard = useToastedClipboard();

  const onRemoveGame = () => {
    if (contract) {
      removeGame(contract);
      navigate("/");
    }
  };

  const onInviteOpponent = () => {
    writeToClipboard(href || "");
  };

  return (
    <>
      <StyledRow>
        <Button onClick={onInviteOpponent} text="Invite opponent" />
        <Button onClick={onRemoveGame} text="Forget game" />
      </StyledRow>
      <p>
        <span style={{ paddingRight: "10px" }}>Game contract:</span>
        <BlockExplorerLink hex={contract} />
      </p>
      <p>
        Players: <BlockExplorerLink hex={j1} />
        {playerRole === PlayerRole.PLAYER1 && <span className="highlight"> (that&apos;s you!)</span>}
        &nbsp; vs &nbsp;
        <BlockExplorerLink hex={j2} />
        {playerRole === PlayerRole.PLAYER2 && <span className="highlight"> (that&apos;s you!)</span>}
        {playerRole === PlayerRole.OBSERVER && <span className="highlight"> (you&apos;re observing)</span>}
      </p>
      <p>
        Remaining wager of {stake !== undefined ? formatEther(stake * (c2 ? BigInt(2) : BigInt(1))) : "..."}
        &nbsp;ETH
      </p>
      {!!c1 && (
        <StyledSimpleRow style={{ paddingBottom: "12px" }}>
          <p>You played:</p>
          <StyledMove $move={c1} $status={MoveStatus.NONE} />
        </StyledSimpleRow>
      )}
    </>
  );
};

export default GameSetupSection;
