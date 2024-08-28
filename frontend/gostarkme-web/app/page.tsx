import { LinkButton } from "@/components/ui/LinkButton";
import { WelcomeBar } from "@/components/welcomepage/WelcomeBar";
import { WelcomeItems } from "@/components/welcomepage/WelcomeItems";
import Image from "next/image";
import dotenv from 'dotenv'; 
export default function Home() {
  dotenv.config();
  const ROOT = process.env.ROOT; 
  return (
    <main className="flex min-h-screen w-full flex-col items-center">
      <WelcomeBar />
      <section className="w-full max-w-screen-2xl grid grid-cols-1 md:grid-cols-2 p-10">
        <div className="justify-self-center flex flex-col  justify-center items-center md:items-start gap-4 p-4">
          <h1 className="text-4xl font-bold">Upload your cause</h1>
          <WelcomeItems text="Give it a name." src={ROOT+"/icons/user.png"} />
          <WelcomeItems text="Give a good purpose." src={ROOT+"/icons/target.png"} />
          <WelcomeItems text="Recollect Stars." src={ROOT+"/icons/star.png"} />
          <WelcomeItems text="Receive donations." src={ROOT+"/icons/starklogo.png"} />
        </div>

        <Image
          src={ROOT +"/images/starcard.png"}
          alt="stark logo"
          height={771}
          width={450}
          className="self-center justify-self-center w-2/3 max-w-80"
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
    </main>
  );
}
