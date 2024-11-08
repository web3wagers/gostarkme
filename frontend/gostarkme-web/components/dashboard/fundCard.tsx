"use client";

import { StardustAnimation } from "@/animations/StardustAnimation";
import useComponentSize from "@/hooks/useComponentSize.hook";
import { clickedFundState } from "@/state/nFunds";
import { useSetAtom } from "jotai";
import Link from "next/link";

interface FundCardProps {
  fund: {
    type: string;
    title: string;
    description: string;
    fund_id: string
  };
  index: number;
}

const FundCards = ({ fund, index }: FundCardProps) => {
  const [ref, width, height] = useComponentSize();

  const setClickedFund = useSetAtom(clickedFundState);

  function handleNav() {
    setClickedFund({id: Number(fund.fund_id), name: fund.title});
  }

  return (
    <div className="relative" ref={ref}>
      <Link onClick={handleNav} href={"/app/fund"}>
        <div
          key={index}
          className="min-w-[30rem] max-w-36 bg-gray-950 shadow-[0px_4px_4px_0px_#00000040] text-white rounded-[10px] py-[32px] md:py-[48px] md:px-[48px] lg:py-[64px] lg:px-[72px] gap-8 md:gap-10 lg:gap-14 flex flex-col items-start justify-between"
        >
          <div className="flex flex-col items-start justify-between gap-4 md:gap-6">
            <p className=" text-sm md:text-base lg:text-lg text-white font-light leading-[22px] md:leading-[25px] lg:leading-[27.6px]">
              {fund.type} {fund.type === "Project" ? <span>&#x1f680;</span> : <span>&#x1FAC0;</span>}
            </p>
            <h1 className="text-lg md:text-lg lg:text-[30px] font-bold">
              {fund.title}
            </h1>
          </div>
          <div>
            {fund.description !== " " ? (
              <p className="text-lg md:text-lg lg:text-[25px] text-white">{fund.description}</p>
            ) :
              (
                <p className="text-lg md:text-lg lg:text-[25px] text-white">No description provided</p>
              )}
          </div>
          <StardustAnimation height={height} width={width} />
        </div>
      </Link>
    </div>
  );
};

export default FundCards;
