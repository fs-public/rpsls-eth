import { useEffect, useState } from "react";
import { useCopyToClipboard } from "react-use";
import toast from "react-hot-toast";

const useToastedClipboard = (messages?: [string, string?]) => {
  const [clipboardState, clipboardCopy] = useCopyToClipboard();
  const [toSave, setToSave] = useState("");
  const [hasToastedAlready, setHasToastedAlready] = useState(false);

  const writeToClipboard = (text: string) => {
    setToSave(text);
    clipboardCopy(text);
  };

  useEffect(() => {
    if (hasToastedAlready) return;

    if (clipboardState.value === toSave) {
      toast.success(messages?.[0] || "Copied to clipboard!");
      setHasToastedAlready(true);
    }

    if (clipboardState.error) {
      toast.error(messages?.[1] || "Could not copy into clipboard. Please give permissions.");
      setHasToastedAlready(true);
    }
  }, [hasToastedAlready, clipboardState.value, clipboardState.error, toSave, messages]);

  return writeToClipboard;
};

export default useToastedClipboard;
