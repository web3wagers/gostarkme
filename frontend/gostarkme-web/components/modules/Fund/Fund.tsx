"use client";

import FundDonate from "./FundDonate";
import starknetlogo from "@/public/icons/starklogo.png";
import { FundVote } from "./FundVote";
import { useState } from "react";
import { upVotesNeeded } from "@/constants";

interface FundProps {
  message: string,
  state: number,
  currentBalance: number,
  goal: number,
  upVotes: number
  addr: string
}

const Fund = ({ message, state, currentBalance, goal, upVotes, addr }: FundProps) => {
  return (
    <section>
      <p className="mb-40">{message}</p>
      { Number(state) === 0 && <p>Fund is currently innactive.</p>}
      { Number(state) === 1 && <FundVote upVotes={upVotes} upVotesNeeded={upVotesNeeded} addr={addr}/>}
      { Number(state) === 2 && <FundDonate icon={starknetlogo} />}
      { Number(state) === 3 && <p>Fund is currently closed.</p>}
      { Number(state) === 4 && <p>Fund was already withdrawed.</p>}
    </section>
  );
};

export default Fund;
