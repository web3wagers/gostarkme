import { Button } from "@/components/ui/Button";
import { useState } from "react";
import FundingStep from "./FundingStep";
import DescriptionStep from "./DescriptionStep";
import { Contract, wallet, InvokeFunctionResponse, shortString } from "starknet";
import { fundManager } from "@/contracts/abis/fundManager";
import { FUND_MANAGER_ADDR } from "@/constants";
import { useAtom, useAtomValue } from "jotai";
import { walletStarknetkitLatestAtom } from "@/state/connectedWallet";
import { latestTxAtom } from "@/state/latestTx";
import { useRouter } from "next/navigation";

const Stages = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [fundingName, setFundingName] = useState("");
  const [goal, setGoal] = useState("");
  const [fundingDescription, setFundingDescription] = useState("");
  const [errors, setErrors] = useState({ fundingName: "", goal: "", evidenceLink: "", contactHandle: "" });
  const [evidenceLink, setEvidenceLink] = useState("");
  const [contactHandle, setContactHandle] = useState("");
  const [latestTx, setLatesTx] = useAtom(latestTxAtom);
  const wallet = useAtomValue(walletStarknetkitLatestAtom);
  const router = useRouter();

  const handleNextStep = () => {
    // Reset errors
    setErrors({ fundingName: "", goal: "", evidenceLink: "", contactHandle: "" });

    // Validate fields
    let hasErrors = false;
    if (currentStep === 0) {
      if (!fundingName) {
        setErrors((prev) => ({ ...prev, fundingName: "Funding name is required." }));
        hasErrors = true;
      }
      if (!goal) {
        setErrors((prev) => ({ ...prev, goal: "The goal is required." }));
        hasErrors = true;
      }
      if (!evidenceLink) {
        setErrors((prev) => ({ ...prev, evidenceLink: "The evidence link is required." }));
        hasErrors = true;
      }
      if (!contactHandle) {
        setErrors((prev) => ({ ...prev, contactHandle: "The contact handle is required." }));
        hasErrors = true;
      }
    }

    // If there are no errors, proceed to the next step
    if (!hasErrors) {
      setCurrentStep((prev) => (prev === 1 ? 0 : prev + 1));
    }
  };

  const handleSubmit = () => {
    if (!fundingDescription) {
      alert("Please enter a description.");
      return;
    }
    newFund();
  };

  async function newFund() {
    const fundManagerContract = new Contract(fundManager, FUND_MANAGER_ADDR, wallet?.account);
    fundManagerContract.newFund(fundingName, goal, evidenceLink, contactHandle, fundingDescription)
      .then(async (resp: InvokeFunctionResponse) => {
        setLatesTx({ txHash: resp.transaction_hash, type: "newfund" });
        router.push("/app/confirmation");
      })
      .catch((e: any) => { console.log(e) });
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {/* Step Content */}
      {currentStep === 0 ? (
        <FundingStep
          fundingName={fundingName}
          setFundingName={setFundingName}
          goal={goal}
          setGoal={setGoal}
          evidenceLink={evidenceLink}
          setEvidenceLink={setEvidenceLink}
          contactHandle={contactHandle}
          setContactHandle={setContactHandle}
          errors={errors} // Pass errors down
          setErrors={setErrors} // Pass setErrors down,
        />
      ) : (
        <DescriptionStep
          fundingDescription={fundingDescription}
          setFundingDescription={setFundingDescription}
        />
      )}

      {/* Navigation Dots */}
      <div className="flex space-x-2">
        {[0, 1].map((_, index) => (
          <span
            key={index}
            className={`h-3 w-3 rounded-full cursor-pointer ${currentStep === index ? "bg-blueGrey" : "bg-gray-300"
              }`}
            onClick={() => setCurrentStep(index)}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex space-x-4">
        <Button
          label={currentStep === 1 ? "Confirm" : "Continue"}
          onClick={currentStep === 1 ? handleSubmit : handleNextStep}
        />
      </div>
    </div>
  );
};

export default Stages;
