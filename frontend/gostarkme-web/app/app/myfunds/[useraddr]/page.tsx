import React from 'react';
import UserFunds from '@/components/modules/myfunds/UserFunds';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

interface MyFundsPageProps {
  params: { useraddr: string };
}

export function generateStaticParams() {
  return [{ useraddr: '1' }]
}

const MyFundsPage: React.FC<MyFundsPageProps> = ({ params }) => {
  const { useraddr } = params;

  const navItems = [
    { label: 'My Profile', href: `/app/myprofile/${useraddr}` },
    { label: 'My funds', href: `/app/myfunds/${useraddr}` }
  ];

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
        <UserFunds userAddress={useraddr} />
      </main>
      <Footer />
    </div>
  );
};

export default MyFundsPage;