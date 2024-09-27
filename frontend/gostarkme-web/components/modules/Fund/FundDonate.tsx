"use client";

import { LinkButton } from "@/components/ui/LinkButton";
import ProgressBar from "@/components/ui/ProgressBar";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";

interface FundDonateProps {
  icon?: StaticImageData;
}

const FundDonate = ({ icon }: FundDonateProps) => {
  const [amount, setAmount] = useState<number>();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setAmount(value);
  };

  return (
    <div className="flex flex-col">
      <ProgressBar progress={34} />
      <div className="flex justify-center my-2">
        <p className="text-center mx-2">200 / 300 </p>
        <Image src={icon || ""} alt="icon" width={24} height={24} />
      </div>
      <div className="flex justify-center">
        <input
          className="border border-gray-400 p-2 my-5 rounded w-1/4"
          type="number"
          placeholder="Enter the amount of STRK"
          onChange={handleAmountChange}
          value={amount}
        />
      </div>
      <LinkButton label="Donate" href="/" />
    </div>
  );
};

export default FundDonate;
