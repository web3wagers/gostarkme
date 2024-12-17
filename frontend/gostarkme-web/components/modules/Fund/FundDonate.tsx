"use client";

import { calculatePorcentage } from "@/app/utils";
import ProgressBar from "@/components/ui/ProgressBar";
import ShareXButton from "@/components/ui/ShareOnX";
import { provider } from "@/constants";
import { addrSTRK } from "@/contracts/addresses";
import { activeChainId } from "@/state/activeChain";
import {
  walletStarknetkitLatestAtom,
} from "@/state/connectedWallet";
import { latestTxAtom } from "@/state/latestTx";
import { useAtom, useAtomValue } from "jotai";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { CallData, cairo } from "starknet";

interface FundDonateProps {
  currentBalance: number;
  goal: number;
  addr: string;
  name: string;
  icon?: StaticImageData;
}

const FundDonate = ({ currentBalance, goal, addr, name, icon }: FundDonateProps) => {
  const [amount, setAmount] = useState<number | "">("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [localBalance, setLocalBalance] = useState<number>(currentBalance);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [latestTx, setLatestTx] = useAtom(latestTxAtom);
  const [isDonating, setIsDonating] = useState(false);
  const wallet = useAtomValue(walletStarknetkitLatestAtom);
  const chainId = useAtomValue(activeChainId);
  const networkEnvironment = process.env.NEXT_PUBLIC_CHAIN_ID;
  const progress = calculatePorcentage(localBalance, goal);

  const donationMessage = `🙌 Supporting ${name} on Go Stark Me! Donate now: https://web3wagers.github.io/gostarkme/ 💪 @undefined_org_ @Starknet`;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? "" : Number(e.target.value);
    setAmount(value);
    setError("");
  };

  const waitForTransaction = async (hash: string) => {
    try {
      await provider.waitForTransaction(hash);
      return true;
    } catch (error) {
      console.error("Error waiting for transaction:", error);
      return false;
    }
  };

  const handleDonateClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (amount === "") {
      setError("This field is required.");
      return;
    }

    if (typeof amount === "number" && amount < 0) {
      setError("The amount cannot be negative.");
      return;
    }

    setError("");
    setIsLoading(true);
    setIsDonating(true);

    try {
      const tx = await wallet?.account.execute([
        {
          contractAddress: addrSTRK,
          entrypoint: 'transfer',
          calldata: CallData.compile({
            recipient: addr,
            amount: cairo.uint256(amount * 10 ** 18)
          }),
        },
        {
          contractAddress: addr,
          entrypoint: 'update_receive_donation',
          calldata: CallData.compile({
            strks: cairo.uint256(amount * 10 ** 18)
          }),
        },
      ]);

      if (tx) {
        const isConfirmed = await waitForTransaction(tx.transaction_hash);

        if (isConfirmed) {
          if (typeof amount === 'number') {
            setLocalBalance(prev => Number(prev) + amount);
          }
          setAmount("");
          setLatestTx(tx.transaction_hash);
          setShowSuccessPopup(true);
          setError("Transaction successful!");
          setTimeout(() => {
            setError("");
          }, 3000);
        } else {
          setError("Transaction failed to confirm. Please try again.");
        }
      }
    } catch (error: any) {
      setError(error.message || "Transaction failed. Please try again.");
      setIsLoading(false);
      setIsDonating(false);
    } finally {
      setIsLoading(false);
      setIsDonating(false);
    }
  };

  return (
    <div className="flex flex-col">
      <ProgressBar progress={progress} />
      <div className="flex justify-center my-2">
        <p className="text-center mx-2">{localBalance.toString()} / {goal.toString()} </p>
        <Image src={icon || ""} alt="icon" width={24} height={24} />
      </div>
      <div className="flex justify-center">
        <input
          className={`border p-2 my-5 rounded w-1/4 ${error ? "border-red-500" : "border-gray-400"}`}
          type="number"
          placeholder="Enter the amount of STRK"
          onChange={handleAmountChange}
          value={amount}
          min={0}
          required
          disabled={isLoading}
        />
      </div>
      {error && (
        <p className={`text-center mb-4 ${error === "Transaction successful!" ? "text-green-500" : "text-red-500"
          }`}>
          {error}
        </p>
      )}
      <div className="text-center">
        <button
          disabled={chainId !== networkEnvironment || !wallet || isDonating}
          onClick={handleDonateClick}
          className={`self-center bg-darkblue text-white py-2 px-6 md:py-3 md:px-10 rounded-md
          text-xs md:text-sm shadow-xl hover:bg-starkorange active:bg-darkblue ease-in-out
          duration-500 active:duration-0 shadow-gray-400 ${chainId !== networkEnvironment || isDonating ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isDonating === true ? "Donating..." : "Donate"}
        </button>
        {wallet && chainId !== networkEnvironment && (
          <p className="text-sm text-gray-500 mt-2">
            Your wallet is currently connected to the wrong network. Please
            switch to {networkEnvironment} to continue.
          </p>
        )}
        {!wallet && (
          <p className="text-sm text-gray-500 mt-2">
            Please connect your wallet to donate.
          </p>
        )}
      </div>

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
            <p className="text-l font-light m-5">Your donation was received, take a look at the transaction <a className="text-blue-600" target="_blank" href={"https://sepolia.voyager.online/tx/" + latestTx}>here.</a></p>
            <p className="text-l font-light m-5">Share your contribution via X to tell everyone how cool you are</p>
            <ShareXButton message={donationMessage} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FundDonate;