"use client";

import Link from "next/link";

interface LinkButtonProps<T> {
    label: string;
    href: string;
    Icon?: React.ComponentType<any>;
}

export const LinkButton = ({ label, href, Icon }: LinkButtonProps<void>) => {
    return (
        <Link
            href={href}
            className="self-center bg-darkblue text-white py-2 px-6 md:py-3 md:px-10 rounded-md text-xs md:text-sm shadow-xl hover:bg-starkorange active:bg-darkblue ease-in-out duration-500 active:duration-0 shadow-gray-400"
        >
            {Icon ? <Icon className="text-xl md:text-2xl w-5 md:w-6" /> : label}
        </Link>
    );
};
