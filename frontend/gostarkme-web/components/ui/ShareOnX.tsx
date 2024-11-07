import React from 'react';


interface ShareXButtonProps {
    txHash: String;
}  

const ShareXButton : React.FC<ShareXButtonProps>  = ({txHash}) => {
  return (
    <button
      className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
      onClick={() => window.open('https://x.com/share', '_blank')}
    >
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 fill-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
      <span className="font-semibold">Share on X</span>
    </button>
  );
};

export default ShareXButton;