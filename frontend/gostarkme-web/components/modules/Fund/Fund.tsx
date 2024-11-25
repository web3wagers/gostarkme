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
import { FundWithdraw } from "./FundWithdraw";

const Fund = () => {
  const wallet = useAtomValue(walletStarknetkitLatestAtom);
  const [fundManagerContract, _setFundManagerContract] = useState<Contract>(
    new Contract(fundManager, FUND_MANAGER_ADDR, wallet?.account)
  );

  const [fund, setFund] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  const clickedFund = useAtomValue(clickedFundState);

  async function getDetails() {
    try {
      let addr = await fundManagerContract.getFund(clickedFund?.id);
      addr = "0x" + addr.toString(16);
      const fundContract = new Contract(fundAbi, addr, wallet?.account);

      // Fetch fund details
      let name = await fundContract.getName();
      let desc = await fundContract.getReason();
      if (desc == " ") {
        desc = "No description provided";
      }
      let state = await fundContract.getState();
      let currentBalance = await fundContract.get_current_goal_state();
      currentBalance = BigInt(currentBalance) / BigInt(10 ** 18);
      let goal = await fundContract.getGoal();
      goal = BigInt(goal) / BigInt(10 ** 18);
      let upVotes = await fundContract.getUpVotes();
      let evidenceLink = await fundContract.get_evidence_link();
      let contactHandle = await fundContract.get_contact_handle();

      console.log(wallet?.account?.address.toLowerCase());
      // Fetch owner
      const owner = (await fundContract.getOwner()).toString();
      setIsOwner(owner.toLowerCase() === wallet?.account?.address.toLowerCase());

      setFund({
        name: name,
        desc: desc,
        state: state,
        currentBalance: currentBalance,
        goal: goal,
        upVotes: upVotes,
        addr: addr,
        evidenceLink: evidenceLink,
        contactHandle: contactHandle,
      });
    } catch (error) {
      console.error("Error fetching fund details:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <>
      {loading && (
        <div className="text-center text-gray-500 mt-12">
          <LoadingSpinner />
          <div className="text-center text-gray-500">Loading funding...</div>
        </div>
      )}
      {!loading && (
        <section>
          <h1 className="font-bold text-2xl">{fund.name}</h1>
          <Divider />
          <h2 className="text-xl">Description</h2>
          <p>{fund.desc}</p>
          <Divider />
          <h2 className="text-xl">Evidence</h2>
          <a href={fund.evidenceLink} className="text-blue-600" target="_blank">
            {fund.evidenceLink}
          </a>
          <Divider />
          <h2 className="text-xl">Contact handle</h2>
          <a href={fund.contactHandle} className="text-blue-600" target="_blank">
            {fund.contactHandle}
          </a>
          {Number(fund.state) === 0 && <p>Fund is currently inactive.</p>}
          {Number(fund.state) === 1 && (
            <FundVote
              upVotes={fund.upVotes}
              upVotesNeeded={upVotesNeeded}
              addr={fund.addr}
              setLoading={setLoading}
              getDetails={getDetails}
            />
          )}
          {Number(fund.state) === 2 && (
            <>
              {!isOwner && (
                <FundDonate
                  currentBalance={fund.currentBalance}
                  goal={fund.goal}
                  addr={fund.addr}
                  icon={starknetlogo}
                />
              )}
            </>
          )}
          {Number(fund.state) === 3 && isOwner && (
            <FundWithdraw
              currentBalance={fund.currentBalance}
              goal={fund.goal}
              addr={fund.addr}
              setLoading={setLoading}
              getDetails={getDetails}
            />
          )}
          {Number(fund.state) === 3 && !isOwner && (
            <p>Funds are ready for withdrawal by the owner.</p>
          )}
          {Number(fund.state) === 4 && <p>Fund was already withdrawn.</p>}
        </section>
      )}
    </>
  );
};

export default Fund;
