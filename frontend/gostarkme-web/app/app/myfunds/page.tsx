'use client'

import UserFunds from '@/components/modules/myfunds/UserFunds';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { navItems } from '@/constants';

const MyFundsPage = () => { 

  return (
    <div className="min-h-screen flex flex-col">
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
      <main className="flex flex-grow w-full justify-center bg-white p-8">
        <UserFunds/>
      </main>
      <Footer />
    </div>
  );
};

export default MyFundsPage;