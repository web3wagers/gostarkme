import React, { useState } from 'react';

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
}) => {
  const [errors, setErrors] = useState<string[]>([]);

  const handleGoal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (newValue === '' || !isNaN(Number(newValue))) {
      setName(newValue);
      setErrors([]); 
    } else {
      setErrors(['The goal has to be of number type']);
    }
  };

  return (
    <div className="text-center w-11/12 md:w-3/3 lg:w-1/1">
      {errors.length > 0 && (
        <div className="bg-red-800 text-white p-2 mb-2">
          {errors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </div>
      )}

      <input
        type="text"
        placeholder="Funding name"
        value={fundingName}
        onChange={(e) => setFundingName(e.target.value)}
        className="mt-2 p-2 pl-4 border border-black rounded w-full placeholder:text-base"
        required
      />
      <input
        type="number"
        placeholder="Set your goal in STRKs"
        value={name}
        onChange={handleGoal}
        className="mt-4 p-2 pl-4 border border-black rounded w-full placeholder:text-base"
        required
      />
    </div>
  );
};

export default FundingStep;
