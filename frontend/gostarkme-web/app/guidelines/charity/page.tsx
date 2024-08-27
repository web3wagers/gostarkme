/* eslint-disable react/no-unescaped-entities */
import { WelcomeBar } from "@/components/welcomepage/WelcomeBar";
import { WelcomeItems } from "@/components/welcomepage/WelcomeItems";
import Image from "next/image";

export default function CharityGuidelines() {
    return (
        <main className="flex min-h-screen w-full flex-col items-center">
            <WelcomeBar />

            <section className="w-full">
                <h1 className="text-2xl md:text-3xl font-bold border-b-[1px] border-gray-300 mx-4 md:mx-10 my-5 md:my-10 p-4 md:p-5">
                    Charity and Helping Purpose Guidelines &#x1fac0;
                </h1>

                {/* {DO's} */}
                <div className="ml-4 md:ml-20">
                    <h2 className="text-xl md:text-2xl font-bold mb-2">Do's &#9989;</h2>
                    <ol className="ml-5 list-disc">
                        <li>Give your funding a meaningful title.</li>
                        <li>Be as detailed as possible when describing the situation why you are asking for funds.</li>
                        <li>Add a link to a drive / cloud storage where you can share photos and videos that evidence the reason why you need the funds.</li>
                        <li>You can also add updates to the drive to demonstrate you are using the funds for the cause, this will boost the confidence.</li>
                    </ol>
                </div>

                {/* {DONT's} */}
                <div className="ml-4 md:ml-20 mt-8">
                    <h2 className="text-xl md:text-2xl font-bold mb-2">Dont's &#10060;</h2>
                    <p className="text-sm md:text-base mb-4">
                        The following points are things we are not going to accept and in case of detecting one of this your funding will be taken down.
                    </p>
                    <ol className="ml-5 list-disc">
                        <li>Illegal or Non-Ethical Activities: Any project or cause that involves illegal activities, such as the sale of drugs, human trafficking, or any other activity that violates the law.</li>
                        <li>Projects that Promote Hate or Discrimination: Any cause that promotes hatred, violence, discrimination, or racism would not be accepted.</li>
                        <li>Political or Religious Campaigns: Many platforms do not allow fundraising for political campaigns, religious movements or proselytism.</li>
                        <li>High-Risk Businesses: Some considered high-risk, such as gambling, payday loans, or pyramid schemes, may be prohibited.</li>
                        <li>Explicit or Adult Content: Projects involving pornographic or explicit content are generally not accepted.</li>
                        <li>Unauthorized medicines or treatments: Fundraising for unauthorized medical treatments or “miracle” remedies could be rejected.</li>
                        <li>Projects that Violate Intellectual Property: Any project that infringes copyright, trademarks, or patents would not be allowed.</li>
                    </ol>
                </div>
            </section>
        </main>
    );
}
