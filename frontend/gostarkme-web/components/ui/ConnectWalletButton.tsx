"use client";
import { ARGENT_WEBWALLET_URL, CHAIN_ID, provider } from "@/constants";
import { walletStarknetkitLatestAtom } from "@/state/connectedWallet";
import { useAtom, useSetAtom } from "jotai";
import { connect, disconnect } from "starknetkit";

export default function WalletConnector() {
  const [wallet, setWallet] = useAtom(walletStarknetkitLatestAtom)

  const handleConnect = async (event:any) => {
    try {
      const { wallet } = await connect({
        provider,
        modalMode: "alwaysAsk",
        webWalletUrl: ARGENT_WEBWALLET_URL,
        argentMobileOptions: {
          dappName: "Starknetkit example dapp",
          url: window.location.hostname,
          chainId: CHAIN_ID,
          icons: [],
        },
      })

      setWallet(wallet)
    } catch (e) {
      console.error(e)
      alert((e as any).message)
    }
  };

  const handleDisconnect = async (event:any) => {
    event.preventDefault();
    try {
      await disconnect();
      setWallet(undefined);
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
    }
  };

  return (
    <>
      {wallet ? (
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