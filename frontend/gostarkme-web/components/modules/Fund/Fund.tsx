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
    let addr = await fundManagerContract.get_fund(clickedFund?.id);
    addr = "0x" + addr.toString(16);
    const fundContract = new Contract(fundAbi, addr, wallet?.account);
    try {
      // Fetch fund details
      let name = await fundContract.get_name();
      let desc = await fundContract.get_reason();
      if (desc == " ") {
        desc = "No description provided";
      }
      let state = await fundContract.get_state();
      let currentBalance = await fundContract.get_current_goal_state();
      currentBalance = BigInt(currentBalance) / BigInt(10 ** 18);
      let goal = await fundContract.get_goal();
      goal = BigInt(goal) / BigInt(10 ** 18);
      let upVotes = await fundContract.get_up_votes();
      let evidenceLink = await fundContract.get_evidence_link();
      let contactHandle = await fundContract.get_contact_handle();
      // Fetch owner
      setIsOwner(await fundContract.is_owner(wallet != undefined ? wallet.account.address : "0x00000000"));
      // USER VOTED?
      let voted = await fundContract.get_voter(wallet != undefined ? wallet?.account.address : "0x0000000000");

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
        voted: voted
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
              name={fund.name}
              upVotes={fund.upVotes}
              upVotesNeeded={upVotesNeeded}
              addr={fund.addr}
              setLoading={setLoading}
              voted={fund.voted}
            />
          )}
          {Number(fund.state) === 2 && (
            <>
                <FundDonate
                  currentBalance={fund.currentBalance}
                  goal={fund.goal}
                  addr={fund.addr}
                  name={fund.name} 
                  icon={starknetlogo}
                />
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
