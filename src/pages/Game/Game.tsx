import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import usePastGames from "src/store/usePastGames";
import { isAddress } from "viem";
import useGame from "src/hooks/useGame";
import toast from "react-hot-toast";
import GameSetupSection from "./sections/GameSetupSection";
import Player2MoveSection from "./sections/Player2MoveSection";
import Player1RevealSection from "./sections/Player1RevealSection";
import GameResultsSection from "./sections/GameResultsSection";
import { usePublicClient } from "wagmi";

const Game: React.FC = () => {
  const { address: gameContract } = useParams();

  const [verifiedContract, setVerifiedContract] = useState<`0x${string}` | undefined>();

  const addGame = usePastGames((state) => state.addGame);
  const navigate = useNavigate();

  const publicClient = usePublicClient();

  useEffect(() => {
    (async () => {
      try {
        if (!gameContract || !isAddress(gameContract)) throw new Error("Specified link is not a contract.");

        const bytecode = await publicClient.getBytecode({ address: gameContract });

        if (!bytecode) throw new Error("Specified link is not a contract.");

        // Possible improvement: add this checking against forged contracts
        // if (bytecode !== RPS.bytecode) throw new Error("Specified link is a contract, but not of a RPS game.");

        addGame(gameContract);
        setVerifiedContract(gameContract);
      } catch (e) {
        toast.error((e as { message: string }).message);
        navigate("/");
      }
    })();
  }, [gameContract, addGame, navigate, publicClient]);

  const { c2, stake } = useGame(verifiedContract);

  return (
    <>
      <h1>Game</h1>

      <GameSetupSection contract={verifiedContract} />

      <hr />
      <Player2MoveSection contract={verifiedContract} />

      {!!c2 && (
        <>
          <hr />
          <Player1RevealSection contract={verifiedContract} />
        </>
      )}

      {!!c2 && !stake && (
        <>
          <hr />
          <GameResultsSection contract={verifiedContract} />
        </>
      )}
    </>
  );
};

export default Game;
