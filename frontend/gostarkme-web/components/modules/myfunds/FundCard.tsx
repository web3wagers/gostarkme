import React from 'react';
import { StardustAnimation } from '@/animations/StardustAnimation';

type FundType = 'Project' | 'Fund';

interface FundCardProps {
    type: FundType;
    title: string;
    description: string;
    onClick?: () => void;
}

const FundCard: React.FC<FundCardProps> = ({ type, title, description, onClick }) => {
  const fundEmoji = type === "Project" ? '&#x1F9E0;' : "&#129728;"

  return (
    <div className="bg-[#0A0A1A] text-white p-10 rounded-lg shadow-md relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <StardustAnimation />
      </div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <span className="flex items-center text-1xl">
            <span className='text-1xl'>{type}</span>
            <span dangerouslySetInnerHTML={{ __html: fundEmoji}} className="ml-1" />
          </span>
          {onClick && (
            <button 
              className="bg-[#C92B25] text-white py-0.5 px-8 rounded-md hover:bg-red-700 transition-colors cursor-pointer" 
              onClick={onClick}
            >
              Delete
            </button>
          )}
        </div>
        <h1 className="text-4xl font-bold mb-5">{title}</h1>
        <div className="h-16 overflow-hidden overflow-ellipsis">
          <p className="text-white text-[18px] line-clamp-2">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default FundCard;