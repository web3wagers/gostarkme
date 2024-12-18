import { atomWithReset } from "jotai/utils"

export const activeChainId = atomWithReset<
  string | null | undefined
>(undefined)