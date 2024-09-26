import { LinkButton } from "@/components/ui/LinkButton";
import ProgressBar from "@/components/ui/ProgressBar";
import Image, { StaticImageData } from "next/image";

interface FundVoteProps {
  icon?: StaticImageData;
}

export const FundVote = ({ icon }: FundVoteProps) => {
  return (
    <div className="flex flex-col">
      <ProgressBar progress={34} />
      <div className="flex justify-center my-2">
        <p className="text-center mx-2">200 / 300 </p>
        <Image src={icon || ""} alt="icon" width={24} height={24} />
      </div>
      <LinkButton label="Vote" href="/" />
    </div>
  );
};
