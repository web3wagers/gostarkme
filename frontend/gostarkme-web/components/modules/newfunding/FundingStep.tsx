import React from 'react';

interface FundingStepProps {
  fundingName: string;
  setFundingName: (name: string) => void;
  name: string;
  setName: (name: string) => void;
  errors: { fundingName: string; name: string }; // Expecting errors as props
  setErrors: React.Dispatch<React.SetStateAction<{ fundingName: string; name: string }>>; // Specify the type for setErrors
}

const FundingStep: React.FC<FundingStepProps> = ({
  fundingName,
  setFundingName,
  name,
  setName,
  errors,
  setErrors,
}) => {
  const handleGoal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // Check if the input is empty or a valid non-negative number
    if (newValue === '' || (Number(newValue) >= 0 && !isNaN(Number(newValue)))) {
      setName(newValue);
      setErrors((prev) => ({ ...prev, name: '' })); 
    } else {
      setErrors((prev) => ({ ...prev, name: 'The goal must be a non-negative number.' }));
    }
  };

  const handleFundingNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setFundingName(newValue);

    // Validate funding name to allow only alphabetic characters
    const isValidName = /^[A-Za-z\s]*$/.test(newValue); // Allow letters and spaces only

    if (!newValue) {
      setErrors((prev) => ({ ...prev, fundingName: 'Funding name is required.' }));
    } else if (!isValidName) {
      setErrors((prev) => ({ ...prev, fundingName: 'Funding name cannot contain numbers or symbols.' }));
    } else {
      setErrors((prev) => ({ ...prev, fundingName: '' })); 
    }
  };

  return (
    <div className="text-center w-11/12 md:w-3/3 lg:w-1/1">
      <input
        type="text"
        placeholder="Funding name"
        value={fundingName}
        onChange={handleFundingNameChange}
        className={`mt-2 p-2 pl-4 border rounded w-full placeholder:text-base ${errors.fundingName ? 'border-red-500' : 'border-black'}`}
        required
      />
      <input
        type="number"
        placeholder="Set your goal in STRKs"
        value={name}
        onChange={handleGoal}
        className={`mt-4 p-2 pl-4 border rounded w-full placeholder:text-base ${errors.name ? 'border-red-500' : 'border-black'}`}
        required
        min={0} 
      />

      {/* Error Messages */}
      {errors.fundingName && (
        <p className="mt-5 text-red-500 text-center mb-4">{errors.fundingName}</p>
      )}
      {errors.name && (
        <p className="mt-5 text-red-500 text-center mb-4">{errors.name}</p>
      )}
    </div>
  );
};

export default FundingStep;
