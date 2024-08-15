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
            className="bg-darkblue text-white py-2 px-4 rounded-md  text-lg shadow-lg hover:bg-starkorange active:bg-darkblue  ease-in-out duration-500 active:duration-0"
        >
            {Icon ? <Icon className={`text-2xl w-6 `} /> : label}
        </Link>
    );
};
