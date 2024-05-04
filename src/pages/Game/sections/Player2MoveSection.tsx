import React, { useEffect, useState } from "react";
import useGame from "src/hooks/useGame";
import Button from "src/components/ui/Button";
import MoveChoice, { MoveStatus, StyledMove } from "src/components/MoveChoice";
import TimeoutButton from "../ui/TimeoutButton";
import { StyledRow, StyledSimpleRow } from "../ui/StyledElements";
import { useAccount, useBalance } from "wagmi";
import toast from "react-hot-toast";
import PlayAgainButton from "../ui/PlayAgainButton";
import { GameMove, PlayerRole } from "src/types/types";

const Player2MoveSection: React.FC<{ contract?: `0x${string}` }> = ({ contract }) => {
  const { playerRole, c2, timeLeft, stake, writeP2Play, writeP1TimeoutsP2 } = useGame(contract);

  const { address } = useAccount();
  const { data: balance } = useBalance({ address });

  const [selectedMove, setSelectedMove] = useState<GameMove>(GameMove.NULL);
  const [isSubmittingPlay, setIsSubmittingPlay] = useState(false);
  const [isSubmittingTimeout, setIsSubmittingTimeout] = useState(false);

  const onCommit = async () => {
    if (balance && stake && stake >= balance.value) {
      toast.error("You don't have enough ETH in your wallet.");
      return;
    }

    setIsSubmittingPlay(true);
    await writeP2Play(selectedMove);
    setIsSubmittingPlay(false);
  };

  const onTimeout = async () => {
    setIsSubmittingTimeout(true);
    await writeP1TimeoutsP2();
    setIsSubmittingTimeout(false);
  };

  const onSelect = (move: number) => {
    if (!c2 && !isSubmittingPlay) setSelectedMove(move);
  };

  useEffect(() => {
    if (c2) setSelectedMove(c2);
  }, [c2]);

  // If timeouted
  if (stake === BigInt(0) && !c2)
    return (
      <StyledRow>
        <p>Player 2 was timeouted and the wager was returned to player 1.</p>
        <PlayAgainButton />
      </StyledRow>
    );

  // Active player in this section and move made
  if (playerRole === PlayerRole.PLAYER2 && c2)
    return (
      <StyledRow>
        <StyledSimpleRow style={{ paddingBottom: "12px" }}>
          <p>You played:</p>
          <StyledMove $move={c2} $status={MoveStatus.NONE} />
        </StyledSimpleRow>
      </StyledRow>
    );

  // Active player in this section and move not yet made
  if (playerRole === PlayerRole.PLAYER2 && !c2)
    return (
      <>
        <StyledRow>
          <StyledSimpleRow>
            <p style={{ paddingRight: "20px" }}>Make your move:</p>
            <MoveChoice selected={selectedMove} onSelect={onSelect} />
          </StyledSimpleRow>
          <TimeoutButton timeLeft={timeLeft} clickable={false} />
        </StyledRow>

        <StyledRow>
          <Button
            text="Commit"
            disabled={selectedMove === GameMove.NULL}
            pending={isSubmittingPlay}
            onClick={onCommit}
          />
        </StyledRow>
      </>
    );

  // Observer and the choice was not yet made
  if (!c2)
    return (
      <StyledRow>
        <p>Waiting for Player 2 move...</p>
        <TimeoutButton
          timeLeft={timeLeft}
          clickable={playerRole === PlayerRole.PLAYER1}
          onClick={onTimeout}
          pending={isSubmittingTimeout}
        />
      </StyledRow>
    );

  // Observer and the move was made
  return (
    <StyledRow>
      <StyledSimpleRow>
        <p>Player 2 move:</p>
        <StyledMove $move={c2!} $status={MoveStatus.NONE} />
      </StyledSimpleRow>
    </StyledRow>
  );
};
export default Player2MoveSection;
