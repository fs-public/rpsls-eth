import usePastGames from "src/store/usePastGames";
import { useWalletClient, usePublicClient } from "wagmi";
import { parseEther } from "viem";
import { rpsABI } from "./contracts/generated";
import RPS from "src/contracts/";
import { toast } from "react-hot-toast";
import useGameSalt from "./useGameSalt";
import { GameMove } from "src/types/types";

const useCreateGame = () => {
  const addGame = usePastGames((state) => state.addGame);

  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const { hashGameMessage } = useGameSalt();

  const createGame = async (opponentAddress: `0x${string}`, wager: string, move: GameMove, salt: `0x${string}`) => {
    if (!walletClient) {
      toast.error("Please connect your wallet first.");
      return "";
    }

    const commitment = hashGameMessage(move, salt);

    try {
      const hash = await walletClient.deployContract({
        abi: rpsABI,
        bytecode: RPS.bytecode as `0x${string}`,
        // @ts-expect-error New functionality apparently, not yet added to types?
        value: parseEther(wager).toString(),
        args: [commitment, opponentAddress],
      });

      const contractPromise = new Promise<`0x${string}`>((resolve, reject) => {
        publicClient
          .waitForTransactionReceipt({ hash })
          .then((tx) => (tx.contractAddress ? resolve(tx.contractAddress) : reject()));
      });

      toast.promise(contractPromise, {
        loading: "Waiting for transaction confirmation",
        success: "Contract deployed successfully",
        error: "There was an issue with contract creation (see console for details).",
      });

      const deployedContract = await contractPromise;

      addGame(deployedContract, salt);
      return deployedContract;
    } catch (e) {
      console.error(e);

      const stringified = typeof e === "string" ? e : JSON.stringify(e);

      if (stringified.includes("rejected") || stringified.includes("denied"))
        toast.error("You rejected the request. Please try again.");

      return "";
    }
  };

  return { createGame };
};

export default useCreateGame;
