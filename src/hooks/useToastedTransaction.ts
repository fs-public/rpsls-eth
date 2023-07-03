import toast from "react-hot-toast";
import { wagmiErrorToast } from "src/utils/wagmi";
import { usePublicClient } from "wagmi";

const useToastedTransaction = () => {
  const publicClient = usePublicClient();

  const execute = async (write: () => Promise<any>, functionResolveHashKey = "hash") => {
    try {
      const writeResult = await write();

      if (!writeResult || typeof writeResult !== "object" || !writeResult[functionResolveHashKey])
        throw new Error("The write result does not have '" + functionResolveHashKey + "' property");

      const hash = writeResult[functionResolveHashKey];

      const txPromise = publicClient.waitForTransactionReceipt({ hash });

      toast.promise(txPromise, {
        loading: "Waiting for transaction confirmation",
        success: "Transaction confirmed",
        error: "There was an issue with the transaction (see console for details).",
      });

      await txPromise;

      return hash;
    } catch (e) {
      wagmiErrorToast(e);

      return false;
    }
  };

  return { execute };
};

export default useToastedTransaction;
