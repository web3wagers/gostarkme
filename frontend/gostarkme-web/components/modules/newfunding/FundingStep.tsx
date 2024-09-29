interface FundingStepProps {
  fundingName: string;
  setFundingName: (name: string) => void;
  name: string;
  setName: (name: string) => void;
}

const FundingStep: React.FC<FundingStepProps> = ({
  fundingName,
  setFundingName,
  name,
  setName,
}) => (
  <div className="text-center w-11/12 md:w-3/3 lg:w-1/1">
    <input
      type="text"
      placeholder="Funding name"
      value={fundingName}
      onChange={(e) => setFundingName(e.target.value)}
      className="mt-2 p-2 pl-4 border border-black rounded w-full placeholder:text-base"
      required
    />
    <input
      type="text"
      placeholder="Set your goal in STRKs"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="mt-4 p-2 pl-4 border border-black rounded w-full placeholder:text-base"
      required
    />
  </div>
);

export default FundingStep;
