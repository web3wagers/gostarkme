import Image from "next/image";
import { LinkButton } from "../ui/LinkButton";

export const WelcomeBar = () => {
    return (
        <nav className=" bg-white top-0 w-full z-20 border-b-[1px] border-darkblue">
            <div className="max-w-screen-2xl mx-auto w-full p-4 flex items-center justify-between">
                <span className="w-28" />
                <div className=" flex flex-col items-center gap-4">
                    <Image
                        src="/icons/starklogo.png"
                        alt="stark logo"
                        width={30}
                        height={30}
                    />
                    <h1 className="text-xl">Go Stark Me</h1>
                </div>

                <LinkButton label="Go to app" href="/"/>
            </div>
        </nav>
    );
};
