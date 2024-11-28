"use client";

import { calculatePorcentage } from "@/app/utils";
import ProgressBar from "@/components/ui/ProgressBar";
import { provider } from "@/constants";
import { strkAbi } from "@/contracts/abis/strk";
import { addrSTRK } from "@/contracts/addresses";
import { walletStarknetkitLatestAtom } from "@/state/connectedWallet";
import { useAtomValue } from "jotai";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { CallData, cairo } from "starknet";

interface FundDonateProps {
  currentBalance: number;
  goal: number;
  addr: string;
  icon?: StaticImageData;
}

const FundDonate = ({ currentBalance, goal, addr, icon }: FundDonateProps) => {
  const [amount, setAmount] = useState<number | "">("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [localBalance, setLocalBalance] = useState<number>(currentBalance);
  const wallet = useAtomValue(walletStarknetkitLatestAtom);
  const progress = calculatePorcentage(localBalance, goal);

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
    } finally {
      setIsLoading(false);
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
        <p className={`text-center mb-4 ${
          error === "Transaction successful!" ? "text-green-500" : "text-red-500"
        }`}>
          {error}
        </p>
      )}
      <button
        onClick={handleDonateClick}
        disabled={isLoading}
        className={`self-center py-2 px-6 md:py-3 md:px-10 rounded-md text-xs md:text-sm shadow-xl ease-in-out duration-500 active:duration-0 shadow-gray-400 
          ${isLoading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-darkblue text-white hover:bg-starkorange active:bg-darkblue'
          }`}
      >
        {isLoading ? "Processing..." : "Donate"}
      </button>
    </div>
  );
};

export default FundDonate;