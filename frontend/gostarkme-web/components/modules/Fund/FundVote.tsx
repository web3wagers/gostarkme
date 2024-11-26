import { calculatePorcentage } from "@/app/utils";
import { Button } from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import { fundAbi } from "@/contracts/abis/fund";
import { walletStarknetkitLatestAtom } from "@/state/connectedWallet";
import { latestTxAtom } from "@/state/latestTx";
import { useAtomValue, useSetAtom } from "jotai";
import { Contract, InvokeFunctionResponse } from "starknet";
import { useRouter } from "next/navigation";
import {useState, useEffect} from "react";

interface FundVoteProps {
  upVotes: number,
  upVotesNeeded: number,
  addr: string,
  setLoading: (load: boolean) => void,
  getDetails: () => void,
  numberVotes: number //declare the amount of votes
}

export const FundVote = ({ upVotes, upVotesNeeded, addr, setLoading, getDetails, numberVotes}: FundVoteProps) => {

  const wallet = useAtomValue(walletStarknetkitLatestAtom);

  const progress = calculatePorcentage(upVotes, upVotesNeeded);

  const setLatestTx = useSetAtom(latestTxAtom);

  const router = useRouter();

  //create const to define vote status
  const [voteStatus, setVoteStatus] = useState(false);

  async function vote() {
    setLoading(true);
    const fundContract = new Contract(fundAbi, addr, wallet?.account);
    fundContract.receiveVote()
      .then(async (resp: InvokeFunctionResponse) => {
        setLatestTx({ txHash: resp.transaction_hash, type: "vote" });
        router.push("/app/confirmation");
      })
      .catch((e: any) => { getDetails() })
  }

  useEffect(() => {
    setVoteStatus(numberVotes >= 1); // Update voteStatus to TRUE if numberVotes is 1
  }, [numberVotes]);

  return (
    <div className="flex flex-col">
      <ProgressBar progress={progress} />
      <div className="flex justify-center my-2">
        <p className="text-center mx-2">{upVotes.toString()} / {upVotesNeeded.toString()} </p>
        <p>&#127775;</p>
      </div>
      {wallet ? (// Check if a wallet is connected by evaluating 'wallet' condition
        voteStatus ? (//if voteStatus is true buttons is disabled
          <div className="text-center"> 
            <Button 
              label="Vote" 
              onClick={() => {}} 
              className="opacity-50 cursor-not-allowed"
              disabled={true}
            />
            <p className="text-sm text-gray-500 mt-2">You have already voted</p>
          </div>
        ) : (
          <Button label="Vote" onClick={vote} /> // If the wallet is connected, and voteStatus is false render a button that allows voting
        )
      ) : ( // If the wallet is not connected, render a disabled vote button with instructions
        <div className="text-center"> 
          <Button 
            label="Vote" 
            onClick={() => {}} 
            className="opacity-50 cursor-not-allowed"
            disabled={true}
          />
          <p className="text-sm text-gray-500 mt-2">
          Connect your wallet to vote
          </p>
        </div>
      )}
    </div>
  );
};