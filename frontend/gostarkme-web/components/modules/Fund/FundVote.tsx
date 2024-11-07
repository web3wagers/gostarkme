import { calculatePorcentage } from "@/app/utils";
import { Button } from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import { fundAbi } from "@/contracts/abis/fund";
import { walletStarknetkitLatestAtom } from "@/state/connectedWallet";
import { latestTxAtom } from "@/state/latestTx";
import { useAtomValue, useSetAtom } from "jotai";
import { Contract, InvokeFunctionResponse } from "starknet";
import { useRouter } from "next/navigation";

interface FundVoteProps {
  upVotes: number,
  upVotesNeeded: number,
  addr: string,
  setLoading: (load: boolean) => void,
  getDetails: () => void,
}

export const FundVote = ({ upVotes, upVotesNeeded, addr, setLoading, getDetails }: FundVoteProps) => {

  const wallet = useAtomValue(walletStarknetkitLatestAtom);

  const progress = calculatePorcentage(upVotes, upVotesNeeded);

  const setLatestTx = useSetAtom(latestTxAtom);

  const router = useRouter();

  async function vote() {
    setLoading(true);
    const fundContract = new Contract(fundAbi, addr, wallet?.account);
    fundContract.receiveVote()
      .then(async (resp: InvokeFunctionResponse) => {
        setLatestTx({ txHash: resp.transaction_hash, type: "vote" });
        router.push("/app/confirmation");
      })
      .catch((e: any) => { getDetails() });
  }

  return (
    <div className="flex flex-col">
      <ProgressBar progress={progress} />
      <div className="flex justify-center my-2">
        <p className="text-center mx-2">{upVotes.toString()} / {upVotesNeeded.toString()} </p>
        <p>&#127775;</p>
      </div>
      <Button label="Vote" onClick={vote}></Button>
    </div>
  );
};
