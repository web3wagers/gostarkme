"use client";
import React, { useEffect, useState } from "react";
import { connect, disconnect } from "starknetkit";

interface IWalletConnection {
  wallet?: any;
  address?: string;
}

export default function WalletConnector() {
  const [walletConnection, setWalletConnection] = useState<IWalletConnection | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAddress = localStorage.getItem("walletAddress");
      if (storedAddress) {
        setWalletConnection({ address: storedAddress });
      }
    }
  }, []);

  const handleConnect = async (event:any) => {
    event.preventDefault();
    try {
      const result = await connect();
      if (result.wallet) {
        const address = result.wallet.selectedAddress;
        setWalletConnection({
          wallet: result.wallet,
          address: address,
        });
        localStorage.setItem("walletAddress", address || '');
        console.log("Wallet connected:", result, "Address:", address);
      } else {
        console.error("No wallet found in connection result.");
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const handleDisconnect = async (event:any) => {
    event.preventDefault();
    try {
      await disconnect();
      setWalletConnection(null);
      localStorage.removeItem("walletAddress");
      localStorage.removeItem("nftSrc");
      console.log("Wallet disconnected");
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
    }
  };

  return (
    <>
      {walletConnection?.address ? (
        <button
          className="self-center bg-darkblue text-white py-2 px-6 md:py-3 md:px-10 rounded-md text-xs md:text-sm shadow-xl hover:bg-starkorange active:bg-darkblue ease-in-out duration-500 active:duration-0 shadow-gray-400"
          onClick={handleDisconnect}
        >
          {walletConnection.address.slice(0, 6)}...{walletConnection.address.slice(-4)}
        </button>
      ) : (
        <button
          className="self-center bg-darkblue text-white py-2 px-6 md:py-3 md:px-10 rounded-md text-xs md:text-sm shadow-xl hover:bg-starkorange active:bg-darkblue ease-in-out duration-500 active:duration-0 shadow-gray-400"
          onClick={handleConnect}
        >
          Connect wallet
        </button>
      )}
    </>
  );
}