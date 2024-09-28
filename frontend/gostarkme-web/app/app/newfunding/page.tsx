"use client"; // Mark this component as a Client Component
import Bounded from "@/components/ui/Bounded";
import Divider from "@/components/ui/Divider";
import Stages from "@/components/modules/newfunding/Stages";

const NewFundingPage = ({ params }: { params: { fundId: string } }) => {
  return (
    <>
      <Bounded className="px-60 text-lg">
        <h1 className="font-sans text-4xl font-normal leading-snug text-left">Your new fund!</h1>
        <Divider />
        <Stages />
      </Bounded>
    </>
  );
};

export default NewFundingPage;
