"use client";

import { calculatePorcentage } from "@/app/utils";
import ProgressBar from "@/components/ui/ProgressBar";
import { provider } from "@/constants";
import { fundAbi } from "@/contracts/abis/fund";
import { strkAbi } from "@/contracts/abis/strk";
import { addrSTRK } from "@/contracts/addresses";
import { walletStarknetkitLatestAtom } from "@/state/connectedWallet";
import { useAtomValue } from "jotai";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { Contract, InvokeFunctionResponse } from "starknet";

interface FundDonateProps {
  currentBalance: number;
  goal: number;
  addr: string;
  icon?: StaticImageData;
}

const FundDonate = ({ currentBalance, goal, addr, icon }: FundDonateProps) => {
  const [amount, setAmount] = useState<number | "">("");
  const [error, setError] = useState<string>("");
  const wallet = useAtomValue(walletStarknetkitLatestAtom);
  const progress = calculatePorcentage(currentBalance, goal);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? "" : Number(e.target.value);
    setAmount(value);
    setError("");
  };

  const handleDonateClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (amount === "") {
      setError("This field is required.");
    } else if (typeof amount === "number" && amount < 0) {
      setError("The amount cannot be negative.");
    } else {
      setError("");
      const erc20 = new Contract(strkAbi, addrSTRK, provider);
      const transferCall = erc20.populate('transfer', {
        recipient: addr,
        amount: BigInt(amount * 10 ** 18)
      });
      wallet?.account?.execute(transferCall)
        .then(async (resp: InvokeFunctionResponse) => {
          console.log("DONE!");
        })
        .catch((e: any) => { console.log("error increase balance =", e) });
    }
  };


  return (
    <div className="flex flex-col">
      <ProgressBar progress={progress} />
      <div className="flex justify-center my-2">
        <p className="text-center mx-2">{currentBalance.toString()} / {goal.toString()} </p>
        <Image src={icon || ""} alt="icon" width={24} height={24} />
      </div>
      <div className="flex justify-center">
        <input
          className={`border p-2 my-5 rounded w-1/4 ${error ? "border-red-500" : "border-gray-400"
            }`}
          type="number"
          placeholder="Enter the amount of STRK"
          onChange={handleAmountChange}
          value={amount}
          min={0}
          required
        />
      </div>
      {error && (
        <p className="text-red-500 text-center mb-4">{error}</p>
      )}
      <button
        onClick={handleDonateClick}
        className="self-center bg-darkblue text-white py-2 px-6 md:py-3 md:px-10 rounded-md text-xs md:text-sm shadow-xl hover:bg-starkorange active:bg-darkblue ease-in-out duration-500 active:duration-0 shadow-gray-400"
      >
        Donate
      </button>
    </div>
  );
};

export default FundDonate;
