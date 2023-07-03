import { defineConfig } from "@wagmi/cli";
import { react, actions } from "@wagmi/cli/plugins";
import RPS from "./src/contracts";

export default defineConfig({
  out: "src/hooks/contracts/generated.ts",
  contracts: [
    {
      name: "RPS",
      abi: RPS.abi,
    },
  ],
  plugins: [react(), actions()],
});
