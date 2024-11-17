"use client";
import santaLogo from "/public/santa-logo-removebg-preview.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useTypewriter from "@/app/hooks/useTypewriter";

export default function Page() {
  const router = useRouter();
  const greeting =
    "Ho ho ho, I'm your Santa! Have a chat with me! Click the button below";
  const displayedGreeting = useTypewriter(greeting);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col gap-24">
        <div className="bg-amber-400 rounded-full ">
          <Image src={santaLogo} width={350} height={350} alt="santa logo" />
        </div>
        <div className={"greeting-container"}>
          <h1 className={"typewriter"}>{displayedGreeting}</h1>
        </div>
        <button
          className="rounded bg-amber-400 hover:bg-amber-300 text-zinc-950 text-2xl p-6 font-semibold"
          onClick={() => router.push("/chat")}
        >
          Chat with Santa
        </button>
      </div>
    </div>
  );
}
