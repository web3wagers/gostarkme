"use client";

import React, { useEffect, useState } from 'react';
import FundCard from '@/components/modules/myfunds/FundCard';

interface UserFundsProps {
  userAddress: string;
}

const UserFunds: React.FC<UserFundsProps> = ({ userAddress }) => {
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

  return (
    <div>
        {funds.length === 0 ? (
        <div className="flex justify-center items-center h-64">
            <div className="text-center text-gray-500">
            No funds found for address {userAddress.slice(0, 5)}...{userAddress.slice(-4)}
            </div>
        </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-16">
            {funds.map((fund: any, index: number) => (
            <FundCard 
                key={index} 
                type={fund.type} 
                title={fund.title} 
                description={fund.description} 
                {... fund.onClick && { onClick: () => fund.onClick(fund.id) }}
            />
            ))}
        </div>
        )}
    </div>
  );
};

export default UserFunds;
