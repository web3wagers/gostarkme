'use client';
import React from "react";
import CreationConfirmation from "./CreationConfirmation";
import VoteConfirmation from "./VoteConfirmation";
import DonationConfirmation from "./DonationConfirmation";
import { useAtomValue } from "jotai";
import { latestTxAtom } from "@/state/latestTx";
import Navbar from "@/components/ui/Navbar";
import { navItems } from "@/constants";

const Confirmation = () => {
    const tx = useAtomValue(latestTxAtom);
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
                        <CreationConfirmation txHash={tx.txHash} />
                    }

                    {tx?.type === "vote" &&
                        <VoteConfirmation txHash={tx.txHash} />
                    }

                    {tx?.type === "donation" &&
                        <DonationConfirmation txHash={tx.txHash} />
                    }
                </div>
            }
        </>
    )
};

export default Confirmation;
