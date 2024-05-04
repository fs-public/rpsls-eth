import toast from "react-hot-toast";

export const wagmiErrorToast = (e: unknown) => {
  console.error(e);

  const stringified = typeof e === "string" ? e : JSON.stringify(e);

  if (stringified.includes("rejected") || stringified.includes("denied"))
    toast.error("You rejected the request. Please try again.");
  if (stringified.includes("Connector not found")) toast.error("Please connect your wallet first.");
};
