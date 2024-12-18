'use client';
import FundCards from "@/components/dashboard/fundCard";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import { FUND_MANAGER_ADDR } from "@/constants";
import { fundAbi } from "@/contracts/abis/fund";
import { fundManager } from "@/contracts/abis/fundManager";
import React, { useEffect, useState } from "react";
import { Contract } from "starknet";
import { navItems } from "@/constants";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const Dashboard = () => {

  const [funds, setFunds] = useState<any>([]);

  const [loading, setLoading] = useState(true);

  async function getFunds() {
    const fundManagerContract = new Contract(fundManager, FUND_MANAGER_ADDR);

    const id = await fundManagerContract.get_current_id();
    let fundings = [];
    for (let i = 1; i < id; i++) {
      // GET FUND ADDRESS
      let fundaddr = await fundManagerContract.get_fund(i);
      fundaddr = "0x" + fundaddr.toString(16);
      const fundContract = new Contract(fundAbi, fundaddr);
      // GET FUND STATE
      let state = await fundContract.get_state();
      if (state == 4 || state == 0) {
        continue;
      }
      // GET FUND NAME
      let name = await fundContract.get_name();
      // GET FUND DESCRIPTION
      let desc = await fundContract.get_reason();
      let desclen = desc.length;
      if (desclen > 50) {
        desc = desc.substring(0, 50) + "...";
      }
      // GET FUND ID
      let fund_id = await fundContract.get_id();
      // GET FUND TYPE
      let fund_type = await fundContract.get_type();
      fundings.push({
        type: Number(BigInt(fund_type)) === 1 ? "Project" : "Charity",
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
      {loading && <div className="text-center text-gray-500 mt-12">
        <LoadingSpinner />
        <div className="text-center text-gray-500">
          Loading funds...
        </div>
      </div>}

      {funds.length !== 0 && !loading &&
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 md:gap-x-[138px] md:gap-y-[84px] mt-10 lg:mt-12">
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
