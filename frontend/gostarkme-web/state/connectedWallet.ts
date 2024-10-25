import { atomWithReset } from "jotai/utils"
import { StarknetWindowObject } from "starknetkit"

export const walletStarknetkitLatestAtom = atomWithReset<
  StarknetWindowObject | null | undefined
>(undefined)
