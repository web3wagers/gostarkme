"use client";

import FundDonate from "./FundDonate";
import starknetlogo from "@/public/icons/starklogo.png";
import { FundVote } from "./FundVote";
import { useEffect, useState } from "react";
import { FUND_MANAGER_ADDR, upVotesNeeded } from "@/constants";
import Divider from "@/components/ui/Divider";
import { fundAbi } from "@/contracts/abis/fund";
import { fundManager } from "@/contracts/abis/fundManager";
import { walletStarknetkitLatestAtom } from "@/state/connectedWallet";
import { useAtomValue } from "jotai";
import { Contract } from "starknet";
import { clickedFundState } from "@/state/nFunds";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const Fund = () => {

  const wallet = useAtomValue(walletStarknetkitLatestAtom);

  const [fundManagerContract, _setFundManagerContract] = useState<Contract>(new Contract(fundManager, FUND_MANAGER_ADDR, wallet?.account));

  const [fund, setFund] = useState<any>({});

  const [loading, setLoading] = useState(true);

  const clickedFund = useAtomValue(clickedFundState);

  async function getDetails() {
    let addr = await fundManagerContract.getFund(clickedFund);
    addr = "0x" + addr.toString(16);
    const fundContract = new Contract(fundAbi, addr, wallet?.account);

    // GET FUND NAME
    let name = await fundContract.getName();
    // GET FUND DESCRIPTION

    let desc = await fundContract.getReason();
    if (desc == " ") {
      desc = "No description provided";
    }
    let state = await fundContract.getState();

    let currentBalance = await fundContract.get_current_goal_state();

    let goal = await fundContract.getGoal();

    let upVotes = await fundContract.getUpVotes();

    let evidenceLink = await fundContract.get_evidence_link();

    if (evidenceLink.indexOf('https') <= 0) {
      evidenceLink = "https://" + evidenceLink;
    }

    let contactHandle = await fundContract.get_contact_handle();

    if (contactHandle.indexOf('https') <= 0) {
      contactHandle = "https://" + contactHandle;
    }

    setFund({
      name: name,
      desc: desc,
      state: state,
      currentBalance: currentBalance,
      goal: goal,
      upVotes: upVotes,
      addr: addr,
      evidenceLink: evidenceLink,
      contactHandle: contactHandle
    });
    setLoading(false);
  }

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <>
      {loading &&
        <div className="text-center text-gray-500 mt-12">
          <LoadingSpinner />
          <div className="text-center text-gray-500">
            Loading funding...
          </div>
        </div>
      }
      {!loading &&
        <section>
          <h1 className="font-bold text-2xl">{fund.name}</h1>
          <Divider />
          <h2 className="text-xl">Description</h2>
          <p>{fund.desc}</p>
          <Divider />
          <h2 className="text-xl">Evidence</h2>
          <a href={fund.evidenceLink} target="_blank">{fund.evidenceLink}</a>
          <Divider />
          <h2 className="text-xl">Contact handle</h2>
          <a href={fund.contactHandle} target="_blank">{fund.contactHandle}</a>
          {Number(fund.state) === 0 && <p>Fund is currently innactive.</p>}
          {Number(fund.state) === 1 && <FundVote upVotes={fund.upVotes} upVotesNeeded={upVotesNeeded} addr={fund.addr} setLoading={setLoading} getDetails={getDetails} />}
          {Number(fund.state) === 2 && <FundDonate icon={starknetlogo} />}
          {Number(fund.state) === 3 && <p>Fund is currently closed.</p>}
          {Number(fund.state) === 4 && <p>Fund was already withdrawed.</p>}
        </section>
      }
    </>
  );
};

export default Fund;
