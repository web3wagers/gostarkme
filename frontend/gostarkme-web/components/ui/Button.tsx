"use client";

import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  Icon?: React.ComponentType<any>;
}

export const Button = ({ label, onClick, Icon }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="self-center bg-darkblue text-white py-2 px-6 md:py-3 md:px-10 rounded-md shadow-xl hover:bg-starkorange active:bg-darkblue ease-in-out duration-500 active:duration-0 shadow-gray-400 
                    text-left text-1xl font-light leading-tight"
    >
      {Icon ? <Icon className="text-xl md:text-2xl w-5 md:w-6" /> : label}
    </button>
  );
};
