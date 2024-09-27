import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import { LinkButton } from "../ui/LinkButton";

export const Navbar = () => {
    const ROOT = process.env.NEXT_PUBLIC_APP_ROOT;

    return (
        <nav className="sticky bg-white top-0 w-full z-20 border-b-[1px] border-darkblue">
            <div className="max-w-screen-2xl mx-auto w-full p-4 flex flex-col md:flex-row items-center md:justify-between">
                <div className="flex flex-col md:flex-row items-center md:space-x-8">
                    <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 mb-4 md:mb-0">
                        <Image
                            src={ROOT + "icons/starklogo.png"}
                            alt="Go Stark Me logo"
                            width={24}
                            height={24}
                            className="md:w-[30px] md:h-[30px]"
                        />
                        <span className="text-lg md:text-xl font-semibold">Go Stark Me</span>
                    </div>
                    <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
                        <Link href="" className="text-gray-700 hover:text-gray-900">
                            My Profile
                        </Link>
                        <Link href="" className="text-gray-700 hover:text-gray-900">
                            My funds
                        </Link>
                    </div>
                </div>
                <LinkButton
                    label="Connect wallet"
                    href="/"
                />
            </div>
        </nav>
    );
};

export default Navbar;