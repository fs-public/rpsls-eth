import { useSignMessage } from "wagmi";
import { encodePacked, keccak256 } from "viem";
import { randomBytes } from "crypto";
import { wagmiErrorToast } from "src/utils/wagmi";
import { GameMove } from "src/types/types";

const useGameSalt = () => {
  const { signMessageAsync: wagmiSignAsync } = useSignMessage();

  const getMessageForSigning = (existingPassword?: string) => {
    const password = existingPassword || `${Date.now()}/${randomBytes(8).toString("hex")}`;
    const message =
      "Signature of this message proves commitment to your move without revealing it." +
      " Signing a message will not initiate an Ethereum transaction." +
      `\n\nGame password: ${password}`;
    return { message, password };
  };

  const signMessage = async (message: string) => {
    try {
      const signed = await wagmiSignAsync({ message });
      return signed;
    } catch (e) {
      wagmiErrorToast(e);
      return null;
    }
  };

  const hashGameMessage = (move: GameMove, salt: `0x${string}`) =>
    keccak256(encodePacked(["uint8", "uint256"], [move, BigInt(salt)]));

  const deriveMoveFromSalt = (commitment?: `0x${string}`, salt?: `0x${string}`) => {
    if (!commitment || !salt) return GameMove.NULL;

    for (let i = 1; i <= 5; i++) {
      if (commitment === hashGameMessage(i, salt)) return i as GameMove;
    }

    return GameMove.NULL;
  };

  return { getMessageForSigning, signMessage, hashGameMessage, deriveMoveFromSalt };
};

export default useGameSalt;
