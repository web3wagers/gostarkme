import { calculatePorcentage } from "@/app/utils";
import { Button } from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import { fundAbi } from "@/contracts/abis/fund";
import {
  walletStarknetkitLatestAtom,
} from "@/state/connectedWallet";
import { latestTxAtom } from "@/state/latestTx";
import { useAtomValue, useSetAtom } from "jotai";
import { Contract } from "starknet";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface FundVoteProps {
  upVotes: number,
  upVotesNeeded: number,
  addr: string,
  setLoading: (load: boolean) => void,
  getDetails: () => void,
}

export const FundVote = ({ upVotes, upVotesNeeded, addr, setLoading }: FundVoteProps) => {

  const wallet = useAtomValue(walletStarknetkitLatestAtom);
  const [network, setNetwork] = useState(wallet?.chainId);
  const networkEnvironment = process.env.NEXT_PUBLIC_CHAIN_ID;

  const progress = calculatePorcentage(upVotes, upVotesNeeded);

  const setLatestTx = useSetAtom(latestTxAtom);

  const router = useRouter();

  const [isChecking, setIsChecking] = useState(true);
  const [voteStatus, setVoteStatus] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  const handleNetwork = (chainId?: string, accounts?: string[]) => {
    setNetwork(wallet?.chainId);
  };
  wallet?.on('networkChanged', handleNetwork);

  useEffect(() => {
    const checkVoteStatus = async () => {
      if (!wallet?.account) {
        setIsChecking(false);
        return;
      }

      setIsChecking(true);
      try {
        const fundContract = new Contract(fundAbi, addr, wallet.account);

        try {
          await fundContract.estimate('receiveVote');
          setVoteStatus(false);
        } catch (error: any) {
          if (error?.toString().includes('User already voted')) {
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

  const handleVote = async () => {
    if (!wallet?.account) return;
    setLoading(true);
    setIsVoting(true);
    try {
      const fundContract = new Contract(fundAbi, addr, wallet.account);
      const resp = await fundContract.invoke('receiveVote');
      setLatestTx({ txHash: resp.transaction_hash, type: "vote" });
      setVoteStatus(true);
      router.push("/app/confirmation");
    } catch (error: any) {
      console.error("Vote failed:", error);
      if (error?.toString().includes('User already voted')) {
        console.log("User has already voted");
        setVoteStatus(true);
      }
    } finally {
      setLoading(false);
      setIsVoting(false);
    }
  };

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
            onClick={() => { }}
            className="opacity-50 cursor-not-allowed"
            disabled={true}
          />
        </div>
      ) : wallet ? ( // Check if a wallet is connected by evaluating 'wallet' condition
        voteStatus ? ( //if voteStatus is true button is disabled
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
            <Button
              label={isVoting ? "Voting..." : "Vote"}
              onClick={handleVote}
              disabled={isVoting || network !== networkEnvironment}
              className={
                isVoting || network !== networkEnvironment ? "opacity-50 cursor-not-allowed" : ""
              }
            />
            {/* // If the wallet is connected, and voteStatus is false render a button that allows voting */}
            {network !== networkEnvironment && (
              <p className="text-sm text-gray-500 mt-2">
                Your wallet is currently connected to the wrong network. Please
                switch to {networkEnvironment} to continue.
              </p>
            )}
          </div>
        )
      ) : ( // If the wallet is not connected, render a disabled vote button with instructions
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
    </div>
  );
};