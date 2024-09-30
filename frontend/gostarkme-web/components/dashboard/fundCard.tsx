"use client";

import { StardustAnimation } from "@/animations/StardustAnimation";
import useComponentSize from "@/hooks/useComponentSize.hook";
import React from "react";

interface FundCardProps {
  fund: {
    type: string;
    title: string;
    description: string;
  };
  index: number;
}

const FundCards = ({ fund, index }: FundCardProps) => {
  const [ref, width, height] = useComponentSize();
  return (
    <div className="relative" ref={ref}>
      <div
        key={index}
        className="bg-gray-950 shadow-[0px_4px_4px_0px_#00000040] text-white rounded-[10px] py-[32px] px-[24px] md:py-[48px] md:px-[48px] lg:py-[64px] lg:px-[72px] gap-8 md:gap-10 lg:gap-14 flex flex-col items-start justify-between"
      >
        <div className="flex flex-col items-start justify-between gap-4 md:gap-6">
          <p className=" text-sm md:text-base lg:text-lg text-white font-light leading-[22px] md:leading-[25px] lg:leading-[27.6px]">
            {fund.type} {fund.type === "Project" ? <span>&#x1f680;</span> : <span>&#x1FAC0;</span>}
          </p>
          <h1 className="text-xl md:text-2xl lg:text-[40px] font-bold">
            {fund.title}
          </h1>
        </div>
        <div>
          <p className="text-lg md:text-2xl lg:text-4xl text-white">
            {fund.description}
          </p>
        </div>
        <StardustAnimation height={height} width={width} />
      </div>
    </div>
  );
};

export default FundCards;
