import { calculatePorcentage } from "@/app/utils";
import { Button } from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import { fundAbi } from "@/contracts/abis/fund";
import { walletStarknetkitLatestAtom } from "@/state/connectedWallet";
import { useAtomValue } from "jotai";
import { Contract, InvokeFunctionResponse } from "starknet";

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

  function vote() {
    setLoading(true);
    const fundContract = new Contract(fundAbi, addr, wallet?.account);
    const myCall = fundContract.populate("receiveVote", []);
    wallet?.account?.execute(myCall)
      .then(async (resp: InvokeFunctionResponse) => {
        getDetails();
      })
      .catch((e: any) => { console.log("error increase balance =", e) });
  }

  return (
    <div className="flex flex-col">
      <ProgressBar progress={progress} />
      <div className="flex justify-center my-2">
        <p className="text-center mx-2">{upVotes.toString()} / {upVotesNeeded.toString()} </p>
        <p>&#127775;</p>
      </div>
      {wallet ? (
        <Button label="Vote" onClick={vote} />
      ) : (
        <div className="text-center">
          <Button 
            label="Vote" 
            onClick={() => {}} 
            className="opacity-50 cursor-not-allowed"
            disabled={true}
          />
          <p className="text-sm text-gray-500 mt-2">
          Connect your wallet to be able to vote
          </p>
        </div>
      )}
    </div>
  );
};
