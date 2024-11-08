import Image from "next/image";
import Link from 'next/link';
import ConnectWallet from "../ui/ConnectWalletButton";

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  logoSrc: string;
  logoAlt: string;
  title: string;
  navItems: NavItem[];
  ctaButton: {
    label: string;
    href: string;
  };
}

export const Navbar = ({
  logoSrc,
  logoAlt,
  title,
  navItems,
  ctaButton
}: NavbarProps) => {
    return (
        <nav className="sticky bg-white top-0 w-full z-20 border-b-[1px] border-darkblue">
            <div className="max-w-screen-2xl mx-auto w-full p-4 flex flex-col md:flex-row items-center md:justify-between">
                <div className="flex flex-col md:flex-row items-center md:space-x-8">
                    <Link href={"/app"}>
                        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 mb-4 md:mb-0">
                            <Image
                                src={logoSrc}
                                alt={logoAlt}
                                width={24}
                                height={24}
                                className="md:w-[30px] md:h-[30px]"
                            />
                            <span className="text-lg md:text-xl font-semibold">{title}</span>
                        </div>
                    </Link>
                    <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
                        {navItems.map((item) => (
                            <Link key={item.href} href={item.href} className="text-gray-700 hover:text-gray-900">
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <ConnectWallet />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;