import { Button } from "@/components/ui/Button";
import { useState } from "react";
import FundingStep from "./FundingStep";
import DescriptionStep from "./DescriptionStep";

const Stages = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [fundingName, setFundingName] = useState("");
  const [name, setName] = useState("");
  const [fundingDescription, setFundingDescription] = useState("");

  const handleNextStep = () => {
    if (currentStep === 0 && (!fundingName || !name)) {
      return;
    }
    setCurrentStep((prev) => (prev === 1 ? 0 : prev + 1));
  };

  const handleSubmit = () => {
    if (!fundingDescription) {
      alert("Please enter a description.");
      return;
    }
    console.log("Funding Name:", fundingName);
    console.log("Name:", name);
    console.log("Description:", fundingDescription);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {/* Step Content */}
      {currentStep === 0 ? (
        <FundingStep
          fundingName={fundingName}
          setFundingName={setFundingName}
          name={name}
          setName={setName}
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
            className={`h-3 w-3 rounded-full cursor-pointer ${
              currentStep === index ? "bg-blueGrey" : "bg-gray-300"
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
