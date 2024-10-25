"use client";

import React, { useEffect, useState } from 'react';
import FundCard from '@/components/modules/myfunds/FundCard';
import { Button } from '@/components/ui/Button';
import { LinkButton } from '@/components/ui/LinkButton';
import { useAtomValue } from 'jotai';
import { walletStarknetkitLatestAtom } from '@/state/connectedWallet';

const UserFunds = () => {
  const wallet = useAtomValue(walletStarknetkitLatestAtom);

  const [funds, setFunds] = useState<object[]>([]);

  useEffect(() => {
    // TODO: Implement funds fetching using 'userAddress'
    setFunds([
      {
        id: 1,
        type: "Project",
        title: "Batman's fund",
        description: "Example of card without delete button",
      },
      {
        id: 2,
        type: "Project",
        title: "Deadpool's fund",
        description: "I need help with my project to develop an awesome project like Go Stark Me",
        onClick: handleDeleteFund
      },
      {
        id: 3,
        type: "Fund",
        title: "Spider-Man's fund",
        description: "Text to prove that we add elipsis when text exceds card width and we don't break the layout. asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf",
        onClick: handleDeleteFund
      }
    ]);
  }, []);

  const handleDeleteFund = (fundId: number) => {
    // TODO: Implement fund deletion based on a unique id or receive the fund object and delete it
    alert(`Deleting fund with id: ${fundId}`);
  }

  const onNewFundHandler = () => {
    // TODO: Implement new fund action
    alert(`Creating new fund`);
  }

  return (
    <div className="max-w-screen-2xl mx-auto bg-white p-4 w-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold mr-2">My Funds &#10024;</h1>
        </div>
        {wallet !== null ? (
          <LinkButton label="New" href="/app/newfunding" />
        ) : null}
      </div>

      {wallet === null ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center text-gray-500">
            Please connect your wallet to see your funds.
          </div>
        </div>
      ) : null}

      {funds.length === 0 && wallet !== null ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center text-gray-500">
            No funds found for address {wallet?.account?.address.slice(0, 5)}...{wallet?.account?.address.slice(-4)}
          </div>
        </div>
      ) : null}

      {funds.length !== 0 && wallet !== null ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-16">
          {funds.map((fund: any, index: number) => (
            <FundCard
              key={index}
              type={fund.type}
              title={fund.title}
              description={fund.description}
              {...fund.onClick && { onClick: () => fund.onClick(fund.id) }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default UserFunds;
