'use client'

import ProgressBar from '@/components/ui/ProgressBar';
import Divider from '@/components/ui/Divider';
import Image from 'next/image';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import { useEventListener } from 'usehooks-ts';
import { useState } from 'react';
import { walletStarknetkitLatestAtom } from '@/state/connectedWallet';
import { useAtomValue } from 'jotai';
import { navItems } from '@/constants';


const UserProfilePage = () => {

  const wallet = useAtomValue(walletStarknetkitLatestAtom);

  // Mock data for design purposes
  const totalDonations = 20000;
  const currentLevel = 10;
  const currentPoints = 200;
  const totalPoints = 500;

  // Calculate progress percentage
  const progress = (currentPoints / totalPoints) * 100;

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
      {wallet !== null ? (
        <main className="flex flex-grow w-full items-center justify-center bg-white p-8">
          {/* Profile Section */}
          <section className="w-full max-w-6xl">
            {/* Profile Header */}
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              <span className="font-extrabold">
                {wallet?.account?.address.slice(0, 5)}...{wallet?.account?.address.slice(-4)}
              </span>
              {"'s Profile "} {'\u2728'}
            </h2>

            <Divider />

            {/* Total Donations and Current Level */}
            <p className="text-2xl text-gray-700 mb-3 flex items-center">
              Total donations:
              <span className="font-semibold ml-2">
                {totalDonations.toLocaleString()}
              </span>
              <Image
                src="/icons/starklogo.png"
                alt="STRKs"
                width={28}
                height={28}
                className="ml-2"
              />
            </p>

            <p className="text-2xl text-gray-700 mb-5">
              Current level: <span className="font-semibold">{currentLevel}</span>
            </p>
            <h2 className="text-2xl font-extrabold text-gray-600 mb-3">
              Your progress to next level
            </h2>

            <Divider />

            <ProgressBar progress={progress} />

            <div className="flex justify-center mt-3 text-xl text-gray-700">
              {currentPoints} / {totalPoints}
              <Image
                src="/icons/starklogo.png"
                alt="STRKs"
                width={28}
                height={28}
                className="ml-2"
              />
            </div>
          </section>
        </main>
      ) : (
        <div className="flex justify-center items-center h-64">
          <div className="text-center text-gray-500">
            Please connect your wallet to see your profile.
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default UserProfilePage;
