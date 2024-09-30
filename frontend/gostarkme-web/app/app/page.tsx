import FundCards from "@/components/dashboard/fundCard";
import Navbar from "@/components/ui/Navbar";
import React from "react";

const Dashboard = () => {
  const navItems = [
    { label: 'My Profile', href: 'app/myprofile/1' },
    { label: 'My funds', href: '/funds' }
  ];

  const funds = [
    {
      type: "Project",
      title: "Adrian's fund",
      description: "I need help with my project",
    },
    {
      type: "Charity",
      title: "Adrian's fund",
      description: "I need help with my project",
    },
    {
      type: "Charity",
      title: "Adrian's fund",
      description: "I need help with my project",
    },
    {
      type: "Project",
      title: "Adrian's fund",
      description: "I need help with my project",
    },

    {
      type: "Charity",
      title: "Adrian's fund",
      description: "I need help with my project",
    },
    {
      type: "Project",
      title: "Adrian's fund",
      description: "I need help with my project",
    },
  ];
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
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
      <h1 className="text-3xl font-bold ml-30 mb-6 flex items-center self-start m-10 ml-28">
        Latest Funds
        <span className="ml-2 text-yellow-400">&#x2728;</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 md:gap-x-[138px] md:gap-y-[84px]">
        {funds.map((fund, index) => (
          <FundCards key={index} fund={fund} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
