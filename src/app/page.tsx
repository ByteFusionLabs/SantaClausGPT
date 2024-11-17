"use client";
import santaLogo from "/public/santa-logo-removebg-preview.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div className="bg-white dark:bg-zinc-950 h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col gap-24">
        <div className="bg-amber-400 rounded-full">
          <Image src={santaLogo} width={500} height={500} alt="santa logo" />
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
