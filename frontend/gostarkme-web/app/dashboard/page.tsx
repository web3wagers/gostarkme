import FundCards from "@/components/dashboard/fundCard";
import React from "react";

const Dashboard = () => {
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
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 flex items-center">
        Latest Funds
        <span className="ml-2 text-yellow-400">✨</span>
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
