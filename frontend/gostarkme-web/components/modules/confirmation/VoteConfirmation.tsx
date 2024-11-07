import ShareXButton from "@/components/ui/ShareOnX";
import React from "react";

interface VoteConfirmationProps {
    txHash: String;
}

const VoteConfirmation: React.FC<VoteConfirmationProps> = ({
    txHash,
}) => (
    <>
        <div className="flex flex-col items-center justify-center gap-4 text-center">
            <p className="text-2xl font-light m-5">Your vote was submitted, take a look at the transaction <a className="text-blue-600" target="_blank" href={"https://sepolia.voyager.online/tx/" + txHash}>here.</a></p>
            <p className="text-2xl font-light m-5">Share your contribution via X to tell everyone how cool you are</p>
            <ShareXButton txHash={txHash} />
        </div>
    </>
);

export default VoteConfirmation;
