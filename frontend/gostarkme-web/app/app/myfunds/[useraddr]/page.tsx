"use client";

import React, { useEffect, useState } from 'react';
import FundCard from '@/components/modules/myfunds/FundCard';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { Button } from '@/components/ui/Button';

interface MyFundsPageProps {
  params: { useraddr: string };
}

const MyFundsPage: React.FC<MyFundsPageProps> = ({ params }) => {
  const [funds, setFunds] = useState<object[]>([]);
  const { useraddr } = params;

  useEffect(() => {
    // TODO: Implement funds fetching using 'useraddr'
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

  const navItems = [
    { label: 'My Profile', href: `/app/myprofile/${useraddr}` },
    { label: 'My funds', href: `/app/myfunds/${useraddr}` }
  ];

  const onNewFundHandler = () => {
    // TODO: Implement new fund action
    alert(`Creating new fund`);
  }

  const handleDeleteFund = (fundId: number) => {
    // TODO: Implement fund deletion based on a unique id or receive the fund object and delete it
    alert(`Deleting fund with id: ${fundId}`);
  }

  return (
    <div className="min-h-screen flex flex-col">
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
      <main className="flex flex-grow w-full justify-center bg-white p-8">
        <div className="bg-white p-4 md:p-6 w-full">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold mr-2">My Funds &#10024;</h1>
            </div>
            <Button className='!px-12 !py-2.5' label='New' onClick={onNewFundHandler} />
          </div>
          {funds.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-center text-gray-500">
                No funds found for address {useraddr.slice(0, 5)}...{useraddr.slice(-4)}
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
      </main>
      <Footer />
    </div>
  );
};

export default MyFundsPage;