/* eslint-disable react/no-unescaped-entities */
import { WelcomeBar } from "@/components/welcomepage/WelcomeBar";

export default function ProjectsGuidelines() {
    return (
        <main className="flex min-h-screen w-full flex-col items-center">
            <WelcomeBar />

            <section className="w-full">
                <h1 className="text-2xl md:text-3xl font-bold border-b-[1px] border-gray-300 mx-4 md:mx-10 my-5 md:my-10 p-4 md:p-5">
                    Early Stage Projects Guidelines &#129504;
                </h1>

                {/* {DO's} */}
                <div className="ml-4 md:ml-20">
                    <h2 className="text-xl md:text-2xl font-bold mb-2">Do's &#9989;</h2>
                    <ol className="ml-5 list-disc">
                        <li>Give a short but meaningful description of the project.</li>
                        <li>Include a public git repo link for people to see your work.</li>
                        <li>Explain why you need the funds and why your project should be funded.</li>
                        <li>Give a breakdown on how you plan to spend the funds you are going to receive.</li>
                        <li>Add a public contact handle for people to ask questions about your project, this will boost the confidence.</li>
                    </ol>
                </div>

                {/* {DONT's} */}
                <div className="ml-4 md:ml-20 mt-8">
                    <h2 className="text-xl md:text-2xl font-bold mb-2">Dont's &#10060;</h2>
                    <p className="text-sm md:text-base mb-4">
                        The following points are things we are not going to accept and in case of detecting one of this your project will be taken down.
                    </p>
                    <ol className="ml-5 list-disc">
                        <li>No Hateful Content: Hate speech and discrimination are things that we strongly oppose.</li>
                        <li>Tricking Users: Any content that can cause harm to users or have unforeseen repercussions is prohibited.</li>
                        <li>Falsification: It is expressly forbidden to make any attempt to falsify contributions, including through Sybil attacks or other forms of manipulation.</li>
                        <li>Fraud & Impersonation: In order to preserve openness and confidence, projects must authentically depict their affiliation and goals.</li>
                        <li>Advertising Restrictions: It is not permitted to use funds for sales or direct promotional efforts.</li>
                    </ol>
                </div>
            </section>
        </main>
    );
}
