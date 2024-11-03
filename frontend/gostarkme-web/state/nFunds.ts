import { atomWithReset } from "jotai/utils"

export const clickedFundState = atomWithReset<
  Number | null | undefined
>(undefined)