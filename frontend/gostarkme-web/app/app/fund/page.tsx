'use client';
import Fund from "@/components/modules/Fund/Fund";
import Bounded from "@/components/ui/Bounded";
import Navbar from "@/components/ui/Navbar";
import { navItems } from "@/constants";
import { clickedFundState } from "@/state/nFunds";
import { useAtomValue } from "jotai";

const FundDetailsPage = () => {

  const clickedFund = useAtomValue(clickedFundState);

  return (
    <>
      {clickedFund &&
        <Bounded className="px-60 text-lg">
          <Fund></Fund>
        </Bounded>
      }

      {!clickedFund &&
        <>
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
          <div className="text-center text-gray-500 mt-5">
            Funding not found, please go back to dashboard and search for the funding again.
          </div>
        </>
      }
    </>
  );
};

export default FundDetailsPage;
