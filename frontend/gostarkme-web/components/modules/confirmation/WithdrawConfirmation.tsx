import ShareXButton from "@/components/ui/ShareOnX";
import React from "react";

interface WithdrawConfirmationProps {
    txHash: String;
    message: String;
}

const WithdrawConfirmation: React.FC<WithdrawConfirmationProps> = ({
    txHash,
    message,
}) => (
    <>
        <div className="flex flex-col items-center justify-center gap-4 text-center">
            <p className="text-2xl font-light m-5">🎉 Success! Your funds have been withdrawn. Check out the transaction details and celebrate! 💸✨ <a className="text-blue-600" target="_blank" href={"https://sepolia.voyager.online/tx/" + txHash}>here.</a></p>
            <p className="text-2xl font-light m-5">Goal Achieved! Your funds have been withdrawn, and the campaign is a success! Share your contribution on X and let everyone know how awesome you are!</p>
            <ShareXButton message={message} />
        </div>
    </>
);

export default WithdrawConfirmation;
