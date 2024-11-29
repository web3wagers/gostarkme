import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";
import { StarknetWindowObject } from "starknetkit";

export const walletStarknetkitLatestAtom = atomWithReset<
  StarknetWindowObject | null | undefined
>(undefined);

export const networkAtom = atom(false);
export const networkEnvironmentAtom = atom(["Mainnet", "Sepolia", "Devnet"]);
