'use client';
import React from "react";
import CreationConfirmation from "./CreationConfirmation";
import DonationConfirmation from "./DonationConfirmation";
import { useAtomValue } from "jotai";
import { latestTxAtom } from "@/state/latestTx";
import Navbar from "@/components/ui/Navbar";
import { navItems } from "@/constants";
import { clickedFundState } from "@/state/nFunds";
import WithdrawConfirmation from "./WithdrawConfirmation";

const Confirmation = () => {
    const tx = useAtomValue(latestTxAtom);
    const actualFund = useAtomValue(clickedFundState);
    const donationMessage = `🙌 Supporting ${actualFund?.name} on Go Stark Me! Donate now: https://web3wagers.github.io/gostarkme/ 💪 @undefined_org_ @Starknet`;
    const newFundMessage = `🚀 Launched a new fund on Go Stark Me: ${actualFund?.name}! Support this cause and make a difference: https://web3wagers.github.io/gostarkme/ 💪🌍 @undefined_org_ @Starknet`;
    const withdrawnMessage = `🎉 Goal reached for ${actualFund?.name} on Go Stark Me! Funds successfully withdrawn—thank you to all who contributed! 🌍💪 https://web3wagers.github.io/gostarkme/ @undefined_org_ @Starknet`;

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
