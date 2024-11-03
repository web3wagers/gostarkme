"use client";

import FundDonate from "./FundDonate";
import starknetlogo from "@/public/icons/starklogo.png";
import { FundVote } from "./FundVote";
import { useEffect, useState } from "react";
import { FUND_MANAGER_ADDR, upVotesNeeded } from "@/constants";
import Divider from "@/components/ui/Divider";
import hex2ascii from "@/app/utils";
import { fundAbi } from "@/contracts/abis/fund";
import { fundManager } from "@/contracts/abis/fundManager";
import { walletStarknetkitLatestAtom } from "@/state/connectedWallet";
import { useAtomValue } from "jotai";
import { Contract } from "starknet";
import { clickedFundState } from "@/state/nFunds";

const Fund = () => {

  const wallet = useAtomValue(walletStarknetkitLatestAtom);

  const [fundManagerContract, _setFundManagerContract] = useState<Contract>(new Contract(fundManager, FUND_MANAGER_ADDR, wallet?.account));

  const [fund, setFund] = useState<any>({});

  const clickedFund = useAtomValue(clickedFundState);

  async function getDetails() {
    let addr = await fundManagerContract.getFund(clickedFund);
    addr = "0x" + addr.toString(16);
    const fundContract = new Contract(fundAbi, addr, wallet?.account);

    // GET FUND NAME
    let name = await fundContract.getName();
    name = hex2ascii(name.toString(16));
    // GET FUND DESCRIPTION
    let desc = await fundContract.getReason();
    if (desc == " ") {
      desc = "No description provided";
    }
    let state = await fundContract.getState();

    let currentBalance = await fundContract.getCurrentGoalState();

    let goal = await fundContract.getGoal();

    let upVotes = await fundContract.getUpVotes();

    setFund({ name: name, desc: desc, state: state, currentBalance: currentBalance, goal: goal, upVotes: upVotes, addr: addr });
  }

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <section>
      <h2 className="font-bold">{fund.name}</h2>
      <Divider />
      <p className="mb-40">{fund.desc}</p>
      { Number(fund.state) === 0 && <p>Fund is currently innactive.</p>}
      { Number(fund.state) === 1 && <FundVote upVotes={fund.upVotes} upVotesNeeded={upVotesNeeded} addr={fund.addr}/>}
      { Number(fund.state) === 2 && <FundDonate icon={starknetlogo} />}
      { Number(fund.state) === 3 && <p>Fund is currently closed.</p>}
      { Number(fund.state) === 4 && <p>Fund was already withdrawed.</p>}
    </section>
  );
};

export default Fund;
