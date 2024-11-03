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

const FundDetailsPage = () => {

  return (
    <>
      <Bounded className="px-60 text-lg">
        <Fund></Fund>
      </Bounded>
    </>
  );
};

export default FundDetailsPage;
