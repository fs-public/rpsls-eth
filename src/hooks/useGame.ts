import { useMemo } from "react";
import {
  useRpsJ1,
  useRpsJ2,
  useRpsC1Hash,
  useRpsC2,
  useRpsStake,
  useRpsTimeout,
  useRpsLastAction,
  useRpsPlay,
  useRpsSolve,
  useRpsJ1Timeout,
  useRpsJ2Timeout,
} from "./contracts/generated";
import { useAccount } from "wagmi";
import { isAddressEqual, parseEther } from "viem";
import useToastedTransaction from "./useToastedTransaction";
import usePastGames from "src/store/usePastGames";
import useGameSalt from "./useGameSalt";
import toast from "react-hot-toast";
import useCountdown from "./useCountdown";
import { GameMove, PlayerRole } from "src/types/types";

const useGame = (address?: `0x${string}`) => {
  const { address: userAddress } = useAccount();
  const gameSalt = usePastGames((state) => state.games.find((game) => game.address === address)?.salt);
  const { deriveMoveFromSalt } = useGameSalt();

  const addSolveHash = usePastGames((state) => state.addSolveHash);

  const hookArgs = useMemo(() => ({ address, watch: true }), [address]);

  // Contract reads ============================================================

  const j1 = useRpsJ1(hookArgs).data;
  const j2 = useRpsJ2(hookArgs).data;
  const c1Hash = useRpsC1Hash(hookArgs).data;
  const c2 = (useRpsC2(hookArgs).data || 0) as GameMove;
  const stake = useRpsStake(hookArgs).data;
  const timeout = Number(useRpsTimeout(hookArgs).data);
  const lastAction = Number(useRpsLastAction(hookArgs).data);

  // Derived reads helpers ============================================================

  const playerRole = useMemo(() => {
    if (!j1 || !j2 || !userAddress) return PlayerRole.UNKNOWN;

    if (isAddressEqual(j1!, userAddress as `0x${string}`)) return PlayerRole.PLAYER1;
    else if (isAddressEqual(j2!, userAddress as `0x${string}`)) return PlayerRole.PLAYER2;
    else return PlayerRole.OBSERVER;
  }, [j1, j2, userAddress]);

  const c1 = useMemo(() => deriveMoveFromSalt(c1Hash, gameSalt), [c1Hash, gameSalt, deriveMoveFromSalt]);

  const timeLeft = useCountdown(lastAction + timeout);

  // Contract writes ============================================================

  const { execute: executeToastedTransaction } = useToastedTransaction();

  const play = useRpsPlay({ address, value: stake || parseEther("0") });
  const solve = useRpsSolve({ address, args: [c1 || 0, BigInt(gameSalt || 0)] });
  const p1TimeoutsP2 = useRpsJ2Timeout({ address });
  const p2TimeoutsP1 = useRpsJ1Timeout({ address });

  const writeP2Play = async (c2: number) => {
    return executeToastedTransaction(() =>
      play.writeAsync({
        value: stake,
        args: [c2],
      })
    );
  };

  const writeP1Solve = async () => {
    if (!c1 || !gameSalt) {
      toast.error("Your secret signature was not found or does not match. Try again.");
      return;
    }

    const hash = await executeToastedTransaction(() => solve.writeAsync());

    if (address && hash) {
      addSolveHash(address, hash);
    }

    return hash;
  };

  const writeP1TimeoutsP2 = async () => executeToastedTransaction(() => p1TimeoutsP2.writeAsync());
  const writeP2TimeoutsP1 = async () => executeToastedTransaction(() => p2TimeoutsP1.writeAsync());

  return {
    // reads
    j1,
    j2,
    c1Hash,
    c2,
    c1,
    stake,
    timeout,
    lastAction,

    // helpers
    timeLeft,
    playerRole,
    gameSalt,

    // writes
    writeP2Play,
    writeP1Solve,
    writeP1TimeoutsP2,
    writeP2TimeoutsP1,
  };
};

export default useGame;
