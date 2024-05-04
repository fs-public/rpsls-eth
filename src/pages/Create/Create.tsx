import React, { useState } from "react";
import MoveChoice from "src/components/MoveChoice";
import { useForm } from "react-hook-form";
import { isAddress, isAddressEqual, keccak256, parseEther } from "viem";
import Input from "src/components/ui/Input";
import styled from "styled-components";
import Button from "src/components/ui/Button";
import { useNavigate } from "react-router-dom";
import useCreateGame from "src/hooks/useCreateGame";
import { Icon } from "@iconify/react";
import useGameSalt from "src/hooks/useGameSalt";
import WalletFallback from "src/components/web3/WalletFallback";
import { useAccount, useBalance } from "wagmi";
import { GameMove } from "src/types/types";
import useToastedClipboard from "src/hooks/useToastedClipboard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  max-width: 540px;
  margin: 0px auto;
`;

const StyledSaltRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

interface CreateGameForm {
  opponentAddress: string;
  wager: string;
}

const Create: React.FC = () => {
  const [selectedMove, setSelectedMove] = useState<GameMove>(GameMove.NULL);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [salt, setSalt] = useState<`0x${string}` | null>(null);

  const navigate = useNavigate();
  const { createGame } = useCreateGame();
  const { getMessageForSigning, signMessage } = useGameSalt();

  const writeToClipboard = useToastedClipboard(["Your game password was saved to your clipboard."]);

  const { address } = useAccount();
  const { data: balance } = useBalance({ address });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateGameForm>({
    mode: "onBlur",
  });

  const onGenerateSalt = async () => {
    setIsGenerating(true);
    const { message, password } = getMessageForSigning();
    const signature = await signMessage(message);
    if (signature) {
      const salt = keccak256(signature);
      setSalt(salt);
      writeToClipboard(password);
    }
    setIsGenerating(false);
  };

  const onCreateGame = async (formData: CreateGameForm) => {
    if (isSubmitting || !salt) return;

    setIsSubmitting(true);

    try {
      const gameAddress = await createGame(
        formData.opponentAddress as `0x${string}`,
        formData.wager,
        selectedMove,
        salt
      );
      setIsSubmitting(false);
      if (gameAddress) navigate(`/game/${gameAddress}`);
    } catch (e) {
      console.error(e);
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <h1>Create Game</h1>
      <Container>
        <p>
          This game uses a commit-reveal scheme for player 1 to commit to his move without revealing it. You will be
          prompted to sign a message to create this commitment. We use local storage of the browser to keep this secret.
          If you have local storage disabled or purge it, make sure to save the password within that message to be able
          to reconstruct the secret when concluding the game.
        </p>
        {salt ? (
          <StyledSaltRow>
            <Icon icon="ph:check-fat-fill" style={{ width: "16px", color: "green" }} />
            Secret for this game is ready!
          </StyledSaltRow>
        ) : (
          <WalletFallback>
            <Button onClick={onGenerateSalt} pending={isGenerating} text="Generate secret" />
          </WalletFallback>
        )}
        <Input
          label="Opponent address"
          placeholder="0x0000000000000000000000000000000000000000"
          register={register("opponentAddress", {
            required: "Please fill in opponent's address.",
            validate: (val) => {
              if (!isAddress(val)) return "This is not a valid address.";
              if (address && isAddressEqual(address, val)) return "It's more fun to play with others :)";
              return true;
            },
          })}
          error={errors.opponentAddress}
        />
        <Input
          label="Wager"
          placeholder="0.0"
          unit="ETH"
          register={register("wager", {
            required: "Please fill in your wager.",
            pattern: {
              value: /^(0|[1-9]\d*)\.?\d*$/,
              message: "Must be a number.",
            },
            validate: (val) => {
              if (isNaN(+val) || +val <= 0) return "Must be a positive number.";
              if (balance && parseEther(val) >= balance.value) return "You don't have enough ETH in your wallet.";
              return true;
            },
          })}
          error={errors.wager}
        />
        <MoveChoice selected={selectedMove} onSelect={setSelectedMove} />
        <WalletFallback>
          <Button
            onClick={handleSubmit(onCreateGame)}
            disabled={selectedMove === GameMove.NULL || !salt}
            pending={isSubmitting}
            text="Create game"
          />
        </WalletFallback>
      </Container>
    </>
  );
};

export default Create;
