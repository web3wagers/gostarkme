import { calculatePorcentage } from "@/app/utils";
import { Button } from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import {
  walletStarknetkitLatestAtom,
} from "@/state/connectedWallet";
import { latestTxAtom } from "@/state/latestTx";
import { useAtom, useAtomValue } from "jotai";
import { useState } from "react";
import ShareXButton from "@/components/ui/ShareOnX";
import { provider } from "@/constants";
import { CallData } from "starknet";

interface FundVoteProps {
  name: String,
  upVotes: number,
  upVotesNeeded: number,
  addr: string,
  voted: any,
  setLoading: (load: boolean) => void,
}

export const FundVote = ({ name, upVotes, upVotesNeeded, addr, voted, setLoading }: FundVoteProps) => {
  const wallet = useAtomValue(walletStarknetkitLatestAtom);
  const [network, setNetwork] = useState(wallet?.chainId);
  const networkEnvironment = process.env.NEXT_PUBLIC_CHAIN_ID;

  const [progress, setProgress] = useState(calculatePorcentage(upVotes, upVotesNeeded));
  const [currentUpvotes, setCurrentUpvotes] = useState(upVotes);
  const voteMessage = ` 🗳️ Just cast my vote for an amazing cause called ${name} on Go Stark Me! This fund needs more votes to start raising funds—every vote counts! Let’s support projects that make a difference at https://web3wagers.github.io/gostarkme/ @undefined_org_ 🙌💫 #GoStarkMe #Starknet #CommunityPower`;

  const [isVoting, setIsVoting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [latestTx, setLatestTx] = useAtom(latestTxAtom);
  const [canVote, setCanVote] = useState((voted != BigInt(0) ? false : true));

  const handleNetwork = (chainId?: string, accounts?: string[]) => {
    setNetwork(wallet?.chainId);
  };
  wallet?.on('networkChanged', handleNetwork);

  const waitForTransaction = async (hash: string) => {
    try {
      await provider.waitForTransaction(hash);
      return true;
    } catch (error) {
      console.error("Error waiting for transaction:", error);
      return false;
    }
  };

  const handleVoteClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsVoting(true);

    try {
      const tx = await wallet?.account.execute([
        {
          contractAddress: addr,
          entrypoint: 'receive_vote',
          calldata: CallData.compile({
          }),
        },
      ]);

      if (tx) {
        const isConfirmed = await waitForTransaction(tx.transaction_hash);

        if (isConfirmed) {
          setLatestTx(tx.transaction_hash);
          setCanVote(false);
          setShowSuccessPopup(true);
          setCurrentUpvotes(prev => Number(BigInt(prev) + BigInt(1)));
          setProgress(calculatePorcentage(Number(BigInt(upVotes) + BigInt(1)), Number(upVotesNeeded)))
          setTimeout(() => {
          }, 3000);
        } else {
          console.log('tx not successfull')
        }
      }
    } catch (error: any) {
      console.log(error.message || "Transaction failed. Please try again.");
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="flex flex-col">
      <ProgressBar progress={progress} />
      <div className="flex justify-center my-2">
        <p className="text-center mx-2">{currentUpvotes.toString()} / {upVotesNeeded.toString()} </p>
        <p>&#127775;</p>
      </div>
      {isVoting ? (
        <div className="text-center">
          <Button
            label="Voting..."
            onClick={() => { }}
            className="opacity-50 cursor-not-allowed"
            disabled={true}
          />
        </div>
      ) : wallet ? (
        !canVote ? (
          <div className="text-center">
            <Button
              label="Vote"
              onClick={() => { }}
              className="opacity-50 cursor-not-allowed"
              disabled={true}
            />
            <p className="text-sm text-gray-500 mt-2">You have already voted</p>
          </div>
        ) : (
          <div className="text-center">
            <button
              onClick={handleVoteClick}
              disabled={isVoting || network !== networkEnvironment}
              className={`self-center bg-darkblue text-white py-2 px-6 md:py-3 md:px-10 rounded-md
                text-xs md:text-sm shadow-xl hover:bg-starkorange active:bg-darkblue ease-in-out
                duration-500 active:duration-0 shadow-gray-400 ${network !== networkEnvironment ? "opacity-50 cursor-not-allowed" : ""}`}
            >Vote</button>
            {network !== networkEnvironment && (
              <p className="text-sm text-gray-500 mt-2">
                Your wallet is currently connected to the wrong network. Please
                switch to {networkEnvironment} to continue.
              </p>
            )}
          </div>
        )
      ) : (
        <div className="text-center">
          <Button
            label="Vote"
            onClick={() => { }}
            className="opacity-50 cursor-not-allowed"
            disabled={true}
          />
          <p className="text-sm text-gray-500 mt-2">
            Connect your wallet to vote
          </p>
        </div>
      )}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
          <div className="w-[600px] rounded-md flex flex-col items-center justify-center gap-4 text-center bg-white drop-shadow p-7">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={(e) => {
                e.stopPropagation();
                setShowSuccessPopup(false);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h1 className="text-xl">Success</h1>
            <p className="text-l font-light m-5">Your vote was submitted, take a look at the transaction <a className="text-blue-600" target="_blank" href={"https://sepolia.voyager.online/tx/" + latestTx}>here.</a></p>
            <p className="text-l font-light m-5">Share your contribution via X to tell everyone how cool you are</p>
            <ShareXButton message={voteMessage} />
          </div>
        </div>
      )}
    </div>
  );
};