'use client';
import FundCards from "@/components/dashboard/fundCard";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import { FUND_MANAGER_ADDR } from "@/constants";
import { fundAbi } from "@/contracts/abis/fund";
import { fundManager } from "@/contracts/abis/fundManager";
import { walletStarknetkitLatestAtom } from "@/state/connectedWallet";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { byteArray, Contract, InvokeFunctionResponse } from "starknet";
import { navItems } from "@/constants";
import hex2ascii from "../utils";

const Dashboard = () => {

  const wallet = useAtomValue(walletStarknetkitLatestAtom);

  const [fundManagerContract, _setFundManagerContract] = useState<Contract>(new Contract(fundManager, FUND_MANAGER_ADDR, wallet?.account));

  const [funds, setFunds] = useState<any>([]);

  const [loading, setLoading] = useState(true);

  async function getFunds() {
    const id = await fundManagerContract.getCurrentId();
    let fundings = [];
    for (let i = 1; i < id; i++) {
      // GET FUND ADDRESS
      let fundaddr = await fundManagerContract.getFund(i);
      fundaddr = "0x" + fundaddr.toString(16);
      const fundContract = new Contract(fundAbi, fundaddr, wallet?.account);
      // GET FUND NAME
      let name = await fundContract.getName();
      name = hex2ascii(name.toString(16));
      // GET FUND DESCRIPTION
      let desc = await fundContract.getReason();
      // GET FUND ID
      let fund_id = await fundContract.getId();
      fundings.push({
        type: "Project",
        title: name,
        description: desc,
        fund_id: fund_id.toString(),
      });
    }
    setFunds(fundings);
    setLoading(false);
  }

  useEffect(() => {
    getFunds();
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <Navbar
        logoSrc={process.env.NEXT_PUBLIC_APP_ROOT + "icons/starklogo.png"}
        logoAlt="Go Stark Me logo"
        title="Go Stark Me"
        navItems={navItems}
        ctaButton={{
          label: "Connect wallet",
          href: "/"
        }}
      />
      <h1 className="text-3xl font-bold ml-30 mb-6 flex items-center self-start m-10 ml-28">
        Latest Funds
        <span className="ml-2 text-yellow-400">&#x2728;</span>
      </h1>

      {loading && <div className="text-center text-gray-500">
        Loading funds ...
      </div>}

      {funds.length !== 0 && !loading &&
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 md:gap-x-[138px] md:gap-y-[84px]">
          {funds.map((fund: { type: string; title: string; description: string; fund_id: string }, index: number) => (
            <FundCards key={index} fund={fund} index={index} />
          ))}
        </div>
      }

      {funds.length === 0 && !loading &&
        <div className="flex justify-center items-center h-64">
          <div className="text-center text-gray-500">
            There is no fundings to display.
          </div>
        </div>
      }

      <Footer></Footer>
    </div>
  );
};

export default Dashboard;
