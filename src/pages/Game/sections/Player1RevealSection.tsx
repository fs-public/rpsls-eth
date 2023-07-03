import React, { useState } from "react";
import useGame from "src/hooks/useGame";
import Button from "src/components/ui/Button";
import TimeoutButton from "../ui/TimeoutButton";
import { StyledRow, StyledSimpleRow } from "../ui/StyledElements";
import Input from "src/components/ui/Input";
import { keccak256 } from "viem";
import useGameSalt from "src/hooks/useGameSalt";
import usePastGames from "src/store/usePastGames";
import { Icon } from "@iconify/react";
import { PlayerRole } from "src/types/types";

const Player1RevealSection: React.FC<{ contract?: `0x${string}` }> = ({ contract }) => {
  const { playerRole, stake, c1, timeLeft, gameSalt, writeP1Solve, writeP2TimeoutsP1 } = useGame(contract);

  const [isSubmittingReveal, setIsSubmittingReveal] = useState(false);
  const [isSubmittingTimeout, setIsSubmittingTimeout] = useState(false);

  const [password, setPassword] = useState<string | undefined>();
  const [isSaltGenerating, setIsSaltGenerating] = useState(false);
  const { getMessageForSigning, signMessage } = useGameSalt();
  const addSalt = usePastGames((state) => state.addSalt);

  const onSolve = async () => {
    setIsSubmittingReveal(true);
    await writeP1Solve();
    setIsSubmittingReveal(false);
  };

  const onTimeout = async () => {
    setIsSubmittingTimeout(true);
    await writeP2TimeoutsP1();
    setIsSubmittingTimeout(false);
  };

  const onPasswordChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onGenerateSalt = async () => {
    setIsSaltGenerating(true);
    const { message } = getMessageForSigning(password?.trim());
    const signature = await signMessage(message);
    if (signature) {
      const salt = keccak256(signature);
      addSalt(contract!, salt);
    }
    setIsSaltGenerating(false);
  };

  // active player in this section, stake paid out
  if (playerRole === PlayerRole.PLAYER1 && stake === BigInt(0))
    return (
      <StyledRow>
        <p>Both players made their moves and revealed them or player 1 was timeouted.</p>
      </StyledRow>
    );

  // active player in this section, game not yet concluded
  if (playerRole === PlayerRole.PLAYER1 && stake !== BigInt(0))
    return (
      <>
        <StyledRow>
          <p>Both players made their moves. Reveal your move now.</p>
          {stake !== undefined && stake > 0 && <TimeoutButton timeLeft={timeLeft} clickable={false} />}
        </StyledRow>
        {(!c1 || !gameSalt) && (
          <>
            <StyledRow>
              <StyledSimpleRow>
                <Icon icon="ph:warning-bold" style={{ width: "16px", color: "red" }} />
                Your secret was not found or mismatches. Try inputting it again:
              </StyledSimpleRow>
            </StyledRow>
            <StyledRow>
              <Input
                label="Game Password"
                placeholder="1680000000000/0123456789abcdef"
                register={{
                  onChange: onPasswordChange,
                }}
              />
              <Button onClick={onGenerateSalt} pending={isSaltGenerating} text="Generate secret" />
            </StyledRow>
          </>
        )}
        <StyledRow>
          <Button
            text="Reveal your move and distribute ETH"
            disabled={!c1}
            pending={isSubmittingReveal}
            onClick={onSolve}
          />
        </StyledRow>
      </>
    );

  // observer in this section
  return (
    <StyledRow>
      <p>Both players made their move. Waiting for player 1 to reveal his move and distribute ETH.</p>
      {stake !== undefined && stake > 0 && (
        <TimeoutButton
          timeLeft={timeLeft}
          clickable={playerRole === PlayerRole.PLAYER2}
          pending={isSubmittingTimeout}
          onClick={onTimeout}
        />
      )}
    </StyledRow>
  );
};

export default Player1RevealSection;
