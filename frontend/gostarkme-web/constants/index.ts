import { RpcProvider, constants } from "starknet"

export const ETHTokenAddress =
  "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"

export const DAITokenAddress =
  "0x00da114221cb83fa859dbdb4c44beeaa0bb37c7537ad5ae66fe5e0efd20e6eb3"

export const ARGENT_DUMMY_CONTRACT_ADDRESS =
  "0x001c515f991f706039696a54f6f33730e9b0e8cc5d04187b13c2c714401acfd4"

export const CHAIN_ID =
  process.env.NEXT_PUBLIC_CHAIN_ID === constants.NetworkName.SN_MAIN
    ? constants.NetworkName.SN_MAIN
    : constants.NetworkName.SN_SEPOLIA

const NODE_URL = "https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/2qi3kpZwfw6DlnjQmzL8vUh5PlqZ0Dpv";

export const provider = new RpcProvider({
  nodeUrl: NODE_URL,
})

export const ARGENT_SESSION_SERVICE_BASE_URL =
  process.env.NEXT_PUBLIC_ARGENT_SESSION_SERVICE_BASE_URL ||
  "https://cloud.argent-api.com/v1"

export const ARGENT_WEBWALLET_URL =
  process.env.NEXT_PUBLIC_ARGENT_WEBWALLET_URL || "https://web.argent.xyz"

export const FUND_MANAGER_ADDR = 
  "0x05c1701879e0322024c174f074cd4a279ed5b536ecaa2447240cec1958f8f8e2"

export const navItems = [
    // { label: 'My Profile', href: '/app/myprofile' },
    // { label: 'My funds', href: '/app/myfunds' }
  ];

 export const upVotesNeeded = 50;