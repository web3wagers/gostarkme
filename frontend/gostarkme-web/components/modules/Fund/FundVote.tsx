import { calculatePorcentage } from "@/app/utils";
import { Button } from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import { fundAbi } from "@/contracts/abis/fund";
import { walletStarknetkitLatestAtom } from "@/state/connectedWallet";
import { latestTxAtom } from "@/state/latestTx";
import { useAtomValue, useSetAtom } from "jotai";
import { Contract, InvokeFunctionResponse } from "starknet";
import { useRouter } from "next/navigation";
import {useState, useEffect} from "react"; //import useState and useEffect

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

  const [isChecking, setIsChecking] = useState(true); //create const to check if the vote status is being checked
  const [voteStatus, setVoteStatus] = useState(false); //create const to define vote status
  const [isVoting, setIsVoting] = useState(false); //create const to check if the user is voting

  //useEffect to check if the user has voted
  useEffect(() => {
    const checkVoteStatus = async () => {
      if (!wallet?.account) {
        setIsChecking(false); //if the wallet is not connected, set isChecking to false
        return;
      }
      
      setIsChecking(true);
      try { //try to check the vote status
        const fundContract = new Contract(fundAbi, addr, wallet.account);
        
        try {
          await fundContract.estimate('receiveVote');
          setVoteStatus(false);
        } catch (error: any) {
          if (error?.toString().includes('User already voted')) { //if the user has voted, set voteStatus to true
            setVoteStatus(true);
          }
        }
      } catch (error) {
        console.error("Contract interaction error:", error);
      } finally {
        setIsChecking(false);
      }
    };

    checkVoteStatus();
  }, [wallet?.account, addr]);
  
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


  return (
    <div className="flex flex-col">
      <ProgressBar progress={progress} />
      <div className="flex justify-center my-2">
        <p className="text-center mx-2">{upVotes.toString()} / {upVotesNeeded.toString()} </p>
        <p>&#127775;</p>
      </div>
      {isChecking ? ( //if isChecking is true render a button that checks the vote status
        <div className="text-center">
          <Button 
            label="Checking vote status..." 
            onClick={() => {}} 
            className="opacity-50 cursor-not-allowed"
            disabled={true}
          />
        </div>
      ) : wallet ? ( // Check if a wallet is connected by evaluating 'wallet' condition
        voteStatus ? ( //if voteStatus is true button is disabled
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
          <Button 
            label={isVoting ? "Voting..." : "Vote"} 
            onClick={vote}
            disabled={isVoting} 
            className={isVoting ? "opacity-50 cursor-not-allowed" : ""}
          /> // If the wallet is connected, and voteStatus is false render a button that allows voting
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