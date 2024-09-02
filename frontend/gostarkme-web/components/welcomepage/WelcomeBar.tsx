import Image from "next/image";
import { LinkButton } from "../ui/LinkButton";

export const WelcomeBar = () => {
  const ROOT = process.env.NEXT_PUBLIC_APP_ROOT; 
  return (
    <nav className="sticky bg-white top-0 w-full z-20 border-b-[1px] border-darkblue m-2">
      <div className="max-w-screen-2xl mx-auto w-full p-4 flex flex-col md:flex-row items-center justify-between">
        <span className="w-20 md:w-28" />
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <Image
            src={ROOT +"icons/starklogo.png"}
            alt="stark logo"
            width={24}
            height={24}
            className="md:w-30 md:h-30"
          />
          <h1 className="text-lg md:text-xl">Go Stark Me</h1>
        </div>
        <LinkButton
          label="Go to app"
          href="/"
        />
      </div>
    </nav>
  );
};
