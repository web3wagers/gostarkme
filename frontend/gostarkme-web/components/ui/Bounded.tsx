import { ReactNode } from "react";

interface BoundedProps {
  children: ReactNode;
  className?: string;
}

const Bounded = ({ children, className }: BoundedProps) => {
  return (
    <div className="flex flex-col h-screen">
      {/* Here could be the header layout */}
      <header>Header</header>
      <main
        className={`flex-grow container mx-auto p-16 mb-5 bg-gray-50 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-lg ${className}`}
      >
        {children}
      </main>
      <footer>Footer</footer>
      {/* Here could be the footer layout */}
    </div>
  );
};

export default Bounded;
