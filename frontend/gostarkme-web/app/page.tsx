import { WelcomeBar } from "@/components/welcomepage/WelcomeBar";
import { WelcomeItens } from "@/components/welcomepage/WelcomeItens";
import Image from "next/image";

export default function Home() {
    return (
        <main className="flex min-h-screen w-full flex-col items-center">
            <WelcomeBar />
            <section className="w-full max-w-screen-2xl grid grid-cols-1 md:grid-cols-2 p-10">
                <div className="justify-self-center flex flex-col  justify-center items-center md:items-start gap-4 p-4">
                    <h1 className="text-4xl font-bold">Upload your cause</h1>
                    <WelcomeItens
                        text="Give it a name."
                        src="/icons/user.png"
                    />
                    <WelcomeItens
                        text="Give a good purpose."
                        src="/icons/target.png"
                    />
                    <WelcomeItens
                        text="Recollect Stars."
                        src="/icons/star.png"
                    />
                    <WelcomeItens
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
