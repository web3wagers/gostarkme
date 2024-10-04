"use client";
import React, { useEffect, useState } from "react";
import { connect, disconnect } from "starknetkit";
import { useLocalStorage } from "usehooks-ts";

interface IWalletConnection {
  wallet?: any;
  address?: string;
}

export default function WalletConnector() {
  const [walletConnection, setWalletConnection] = useState<IWalletConnection | null>(null);
  const [storedAddress, setValue, removeValue] = useLocalStorage<any>('walletAddress', typeof window !== 'undefined' ? localStorage.getItem('walletAddress') : null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const addr = localStorage.getItem("walletAddress");
      if (addr) {
        setWalletConnection({ address: addr });
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
        setValue(address);
        console.log(address);
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
      removeValue();
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
          Log Out
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