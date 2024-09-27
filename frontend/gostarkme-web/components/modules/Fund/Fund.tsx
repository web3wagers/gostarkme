"use client";

import FundDonate from "./FundDonate";
import starknetlogo from "@/public/icons/starklogo.png";
import { FundVote } from "./FundVote";
import { useState } from "react";

interface FundProps {
  message: string;
}

const Fund = ({ message }: FundProps) => {
  const [type, setType] = useState<string>("donate");

  return (
    <section>
      <p className="mb-40">{message}</p>

      {type === "donate" ? <FundDonate icon={starknetlogo} /> : <FundVote />}
      {/* For Vote, there is no logo, but when you already have it, just pass it through the prop */}
    </section>
  );
};

export default Fund;
