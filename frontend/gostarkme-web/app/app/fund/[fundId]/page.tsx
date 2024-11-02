'use client';

import hex2ascii from "@/app/utils";
import Fund from "@/components/modules/Fund/Fund";
import Bounded from "@/components/ui/Bounded";
import Divider from "@/components/ui/Divider";
import { FUND_MANAGER_ADDR } from "@/constants";
import { fundAbi } from "@/contracts/abis/fund";
import { fundManager } from "@/contracts/abis/fundManager";
import { walletStarknetkitLatestAtom } from "@/state/connectedWallet";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { Contract } from "starknet";

const FundDetailsPage = ({ params }: { params: { fundId: string } }) => {

  const wallet = useAtomValue(walletStarknetkitLatestAtom);

  const [fundManagerContract, _setFundManagerContract] = useState<Contract>(new Contract(fundManager, FUND_MANAGER_ADDR, wallet?.account));

  const [fund, setFund] = useState<any>({});

  async function getDetails() {
    let addr = await fundManagerContract.getFund(params.fundId);
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
    <>
      <Bounded className="px-60 text-lg">
        <h2 className="font-bold">{fund.name}</h2>
        <Divider />
        <Fund message={fund.desc}
          state={fund.state}
          currentBalance={fund.currentBalance}
          goal={fund.goal}
          upVotes={fund.upVotes}
          addr={fund.addr}
        >
        </Fund>
      </Bounded>
    </>
  );
};

export default FundDetailsPage;
