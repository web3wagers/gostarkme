import React from 'react';

interface FundingStepProps {
  fundingName: string;
  setFundingName: (name: string) => void;
  goal: string;
  setGoal: (name: string) => void;
  evidenceLink: string;
  setEvidenceLink: (name: string) => void;
  contactHandle: string;
  setContactHandle: (name: string) => void;
  type: string;
  setType: (name: string) => void;
  errors: { fundingName: string; goal: string ;evidenceLink: string; contactHandle: string; type: string}; 
  setErrors: React.Dispatch<React.SetStateAction<{ fundingName: string; goal: string ;evidenceLink: string; contactHandle: string; type:string }>>;
}

const FundingStep: React.FC<FundingStepProps> = ({
  fundingName,
  setFundingName,
  goal,
  setGoal,
  evidenceLink,
  setEvidenceLink,
  contactHandle,
  setContactHandle,
  type,
  setType,
  errors,
  setErrors,
}) => {
  const handleGoal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // Check if the input is empty or a valid non-negative number
    if (newValue === '' || (Number(newValue) >= 0 && !isNaN(Number(newValue)))) {
      setGoal(newValue);
      setErrors((prev) => ({ ...prev, goal : '' })); 
    } else {
      setErrors((prev) => ({ ...prev, goal: 'The goal must be a non-negative number.' }));
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

  const handleEvidenceLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setEvidenceLink(newValue);
    if (!newValue) {
      setErrors((prev) => ({ ...prev, evidenceLink: 'Evidence link is required.' }));
    } else {
      setErrors((prev) => ({ ...prev, evidenceLink: '' })); 
    }
  };

  const handleContactHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setContactHandle(newValue);
    if (!newValue) {
      setErrors((prev) => ({ ...prev, contactHandle: 'Contact handle is required.' }));
    } else {
      setErrors((prev) => ({ ...prev, contactHandle: '' })); 
    }
  };

  const handleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setType(newValue);
    if (!newValue) {
      setErrors((prev) => ({ ...prev, type: 'Type is required.' }));
    } else {
      setErrors((prev) => ({ ...prev, type: '' })); 
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
        value={goal}
        onChange={handleGoal}
        className={`mt-4 p-2 pl-4 border rounded w-full placeholder:text-base ${errors.goal ? 'border-red-500' : 'border-black'}`}
        required
        min={0} 
      />
      <input
        type="text"
        placeholder="Set a link to the repo or evidence"
        value={evidenceLink}
        onChange={handleEvidenceLink}
        className={`mt-4 p-2 pl-4 border rounded w-full placeholder:text-base ${errors.evidenceLink ? 'border-red-500' : 'border-black'}`}
        required
      />
      <input
        type="text"
        placeholder="Set a contact handle"
        value={contactHandle}
        onChange={handleContactHandle}
        className={`mt-4 p-2 pl-4 border rounded w-full placeholder:text-base ${errors.contactHandle ? 'border-red-500' : 'border-black'}`}
        required
      />
      <select
        className={`mt-4 p-2 pl-4 border rounded w-full text-base ${errors.type ? 'border-red-500' : 'border-black'}`}
        value={type}
        onChange={handleType}
        required
      >
        <option value="" disabled>Select the fund type</option>
        <option value="1">Project</option>
        <option value="2">Charity</option>
      </select>

      {/* Error Messages */}
      {errors.fundingName && (
        <p className="mt-5 text-red-500 text-center mb-4">{errors.fundingName}</p>
      )}
      {errors.goal && (
        <p className="mt-5 text-red-500 text-center mb-4">{errors.goal}</p>
      )}
      {errors.evidenceLink && (
        <p className="mt-5 text-red-500 text-center mb-4">{errors.evidenceLink}</p>
      )}
      {errors.contactHandle && (
        <p className="mt-5 text-red-500 text-center mb-4">{errors.contactHandle}</p>
      )}
      {errors.type && (
        <p className="mt-5 text-red-500 text-center mb-4">{errors.type}</p>
      )}
    </div>
  );
};

export default FundingStep;
