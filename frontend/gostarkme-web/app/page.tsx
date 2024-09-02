'use client'
import { LinkButton } from "@/components/ui/LinkButton";
import { WelcomeBar } from "@/components/welcomepage/WelcomeBar";
import { WelcomeItems } from "@/components/welcomepage/WelcomeItems";
import Image from "next/image";
import { StardustAnimation } from "@/animations/StardustAnimation";

export default function Home() {
  const ROOT = process.env.NEXT_PUBLIC_APP_ROOT;
  
  return (
    <main className="flex min-h-screen w-full flex-col items-center">
      <WelcomeBar />
      <section className="w-full max-w-screen-2xl grid grid-cols-1 md:grid-cols-2 p-10">
        <div className="justify-self-center flex flex-col  justify-center items-center md:items-start gap-4 p-4">
          <h1 className="text-4xl font-bold">Upload your cause</h1>
          <WelcomeItems text="Give it a name." src={ROOT + "icons/user.png"} />
          <WelcomeItems text="Give a good purpose." src={ROOT + "icons/target.png"} />
          <WelcomeItems text="Recollect Stars." src={ROOT + "icons/star.png"} />
          <WelcomeItems text="Receive donations." src={ROOT + "icons/starklogo.png"} />
        </div>
        <StardustAnimation />
        <Image
          src={ROOT + "images/starcard.png"}
          alt="stark logo"
          height={771}
          width={450}
          className="self-center justify-self-center w-2/3 max-w-80 rounded-2xl"
        />
      </section>

      <section className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-1.5 p-4 m-10">
        {/* <!-- Card 1 --> */}
        <div className="flex flex-col gap-y-6 p-8 md:p-12 shadow-md bg-gray-100 grow-0 shrink-0 md:basis-1/2">
          <div>
            <h3 className="text-gray-600 font-semibold">We support</h3>
            <h2 className="text-2xl font-bold text-gray-900">
              Early stage Projects
            </h2>
          </div>
          <div className="text-gray-600">
            Projects with a clear idea, direction and good work progress can apply to start receiving funds.
          </div>
          <LinkButton
            label="Learn more"
            href="/guidelines/projects"
          />
        </div>

        {/* <!-- Card 2 --> */}
        <div className="flex flex-col gap-y-6 p-8 md:p-12 shadow-md bg-gray-100 grow-0 shrink-0 md:basis-1/2">
          <div>
            <h3 className="text-gray-600 font-semibold">We support</h3>
            <h2 className="text-2xl font-bold text-gray-900">
              Charity and Helping Purpose
            </h2>
          </div>
          <p className="text-gray-600">
            Charity organizations and people in need with economic problems can apply to receive funds.
          </p>
          <LinkButton
            label="Learn more"
            href="/guidelines/charity"
          />
        </div>
      </section>
      <section className="my-16 px-4 mx-28">
        <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>

        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Stage 1: Application - Represents submitting a proposal */}
          <div className="flex-1 text-center">
            <div className="text-5xl mb-4">&#x1F4DD;</div>
            <h3 className="text-xl font-semibold mb-2">1. Application</h3>
            <p className="text-gray-600 mb-4">Submit your project or cause for voting</p>
            <div className="text-sm text-gray-500">
              Upload your project or cause with lots of details for people to start noticing your cause, be as detailed as possible, this will
              bring you better chances of getting more votes and funds.
            </div>
          </div>

          {/* Stage 2: Verification - Represents the review process */}
          <div className="flex-1 text-center">
            <div className="text-5xl mb-4">&#x1F50D;</div>
            <h3 className="text-xl font-semibold mb-2">2. Verification</h3>
            <p className="text-gray-600 mb-4">The community votes if your cause is worthy of funds</p>
            <div className="text-sm text-gray-500">
              To ensure the project is genuine and worthy of funds, we will verify the project and its purpose, we believe in decentralization
              and transparency and that is why the community is the one who decides which projects are worthy of funds.
            </div>
          </div>

          {/* Stage 3: Funding - Represents successful funding */}
          <div className="flex-1 text-center">
            <div className="text-5xl mb-4">&#x1F4B0;</div>
            <h3 className="text-xl font-semibold mb-2">3. Funding</h3>
            <p className="text-gray-600 mb-4">Approved projects receive funding and support</p>
            <div className="text-sm text-gray-500">
              Successful applicants are notified and can start receiving funds. We also provide ongoing support and resources to help ensure
              project success. Once you reach your goal, you can withdraw your funds, we will deduct 5% of the funds for the platform fee.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
