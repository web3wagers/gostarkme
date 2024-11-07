import { atomWithReset } from "jotai/utils"

interface fundInfo {
  id: Number;
  name: String
}

export const clickedFundState = atomWithReset<
  fundInfo | null | undefined
>(undefined)