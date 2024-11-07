import { atomWithReset } from "jotai/utils"

interface tx {
    txHash: String;
    type: String
}

export const latestTxAtom = atomWithReset<tx | undefined>(undefined)