'use client';
import React, { useEffect } from "react";
import CreationConfirmation from "./CreationConfirmation";
import VoteConfirmation from "./VoteConfirmation";
import DonationConfirmation from "./DonationConfirmation";
import { useAtom, useAtomValue } from "jotai";
import { latestTxAtom } from "@/state/latestTx";
import Navbar from "@/components/ui/Navbar";
import { navItems } from "@/constants";
import { clickedFundState } from "@/state/nFunds";
import { walletStarknetkitLatestAtom } from "@/state/connectedWallet";
import WithdrawConfirmation from "./WithdrawConfirmation";

const Confirmation = () => {
    const tx = useAtomValue(latestTxAtom);
    const actualFund = useAtomValue(clickedFundState);
    const voteMessage = ` 🗳️ Just cast my vote for an amazing cause called ${actualFund?.name} on Go Stark Me! This fund needs more votes to start raising funds—every vote counts! Let’s support projects that make a difference at https://web3wagers.github.io/gostarkme/ @undefined_org_ 🙌💫 #GoStarkMe #Starknet #CommunityPower`;
    const donationMessage = `🙌 Proud to support ${actualFund?.name} on Go Stark Me! Donations make a difference. 💪 Go ahead and donate at https://web3wagers.github.io/gostarkme/ @undefined_org_ #Starknet #GoStarkMe #Web3Wagers`;
    const newFundMessage = `🚀 Just launched a new fund on Go Stark Me called ${actualFund?.name}! I’m raising support for an important cause, and every contribution makes a difference. Join me in making an impact at https://web3wagers.github.io/gostarkme/! 💪🌍 Check it out on @undefined_org_ #GoStarkMe #Starknet #BlockchainForGood`;
    const withdrawnMessage = `🎉 We did it! The goal for ${actualFund?.name} on Go Stark Me has been reached, and funds have been successfully withdrawn! 🙌 Huge thanks to everyone who contributed and made this possible. Let’s keep making an impact! 🌍💪 Check it out at https://web3wagers.github.io/gostarkme/ #GoStarkMe #Starknet #CommunitySuccess`;

    return (
        <>
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
            {tx === undefined &&
                <div className="text-center text-gray-500 mt-5">
                    The place you are trying to reach is not enabled yet.
                </div>
            }

            {tx !== undefined &&
                <div className="flex flex-col items-center justify-center gap-4 text-center mt-32">
                    <h1 className="text-3xl font-extrabold">Success &#128640;</h1>
                    {tx?.type === "newfund" &&
                        <CreationConfirmation message={newFundMessage} txHash={tx.txHash} />
                    }

                    {tx?.type === "vote" &&
                        <VoteConfirmation message={voteMessage} txHash={tx.txHash} />
                    }

                    {tx?.type === "donation" &&
                        <DonationConfirmation message={donationMessage} txHash={tx.txHash} />
                    }

                    {tx?.type === "withdrawn" &&
                        <WithdrawConfirmation message={withdrawnMessage} txHash={tx.txHash} />
                    }
                </div>
            }
        </>
    )
};

export default Confirmation;
