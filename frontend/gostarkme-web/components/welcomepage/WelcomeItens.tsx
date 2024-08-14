import Image from "next/image";

interface WelcomeItensProps {
    text: string;
    src: string;
}

export const WelcomeItens = ({ text, src }: WelcomeItensProps) => {
    return (
        <div className="flex  items-center gap-2 ml-2">
            <Image src={src} alt="icon" width={30} height={30} />
            <p className="text-2xl">{text}</p>
        </div>
    );
};
