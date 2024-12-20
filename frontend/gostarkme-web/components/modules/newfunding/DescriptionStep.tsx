import React from "react";

interface DescriptionStepProps {
  fundingDescription: string;
  setFundingDescription: (description: string) => void;
}

const DescriptionStep: React.FC<DescriptionStepProps> = ({
  fundingDescription,
  setFundingDescription,
}) => (
  <div className="relative w-11/12 md:w-3/3 lg:w-1/1 font-sans text-2xl font-normal leading-normal text-left">
    <strong>Note:</strong> You can always edit your funding description later ;)

    <textarea
      placeholder="Funding description"
      value={fundingDescription}
      onChange={(e) => setFundingDescription(e.target.value)}
      className="mt-3 p-4 border border-black rounded w-full h-60 resize-none font-sans font-light leading-snug text-left placeholder:text-base placeholder:font-light"
      required
    />

    {/* Back Arrow */}
    <a
      href=""
      className="absolute right-[-270px] top-[-205px]" 
    >
    </a>
  </div>
);

export default DescriptionStep;
