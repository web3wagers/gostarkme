import { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { navItems } from "@/constants";

interface BoundedProps {
  children: ReactNode;
  className?: string;
}

const Bounded = ({ children, className }: BoundedProps) => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar
        logoSrc={process.env.NEXT_PUBLIC_APP_ROOT + "icons/starklogo.png"}
        logoAlt="Go Stark Me logo"
        title="Go Stark Me"
        navItems={navItems}
        ctaButton={{
          label: "Connect wallet",
          href: "/"
        }}
      />
      <main
        className={`flex-grow container mx-auto p-16 mb-5 mt-14 bg-gray-50 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-lg ${className}`}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Bounded;
