import { WelcomeBar } from "@/components/welcomepage/WelcomeBar";
import { WelcomeItems } from "@/components/welcomepage/WelcomeItems";
import Image from "next/image";

export default function Home() {
    return (
        <main className="flex min-h-screen w-full flex-col items-center">
            <WelcomeBar />
            <section className="w-full max-w-screen-2xl grid grid-cols-1 md:grid-cols-2 p-10">
                <div className="justify-self-center flex flex-col  justify-center items-center md:items-start gap-4 p-4">
                    <h1 className="text-4xl font-bold">Upload your cause</h1>
                    <WelcomeItems
                        text="Give it a name."
                        src="/icons/user.png"
                    />
                    <WelcomeItems
                        text="Give a good purpose."
                        src="/icons/target.png"
                    />
                    <WelcomeItems
                        text="Recollect Stars."
                        src="/icons/star.png"
                    />
                    <WelcomeItems
                        text="Receive donations."
                        src="/icons/starklogo.png"
                    />
                </div>

                <Image
                    src="/images/starcard.png"
                    alt="stark logo"
                    height={771}
                    width={450}
                    className="self-center justify-self-center w-2/3 max-w-80"
                />
            </section>
        </main>
    );
}
