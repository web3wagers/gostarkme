import React from "react";

interface DescriptionStepProps {
  fundingDescription: string;
  setFundingDescription: (description: string) => void;
}

const DescriptionStep: React.FC<DescriptionStepProps> = ({
  fundingDescription,
  setFundingDescription,
}) => (
  <div className="w-11/12 md:w-3/3 lg:w-1/1 font-sans text-2xl font-normal leading-normal text-left">
    <strong>Note:</strong> You can always edit your funding description later ;)
    <textarea
      placeholder="Set your goal in STRKs"
      value={fundingDescription}
      onChange={(e) => setFundingDescription(e.target.value)}
      className="mt-3 p-4 border border-black rounded w-full h-60 resize-none font-sans font-light leading-snug text-left placeholder:text-base placeholder:font-light"
      required
    />
  </div>
);

export default DescriptionStep;
