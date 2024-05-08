import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex h-[100dvh] w-full items-center justify-center  bg-white">
      <div className="top-0 left-0 -translate-y-1/2 -translate-x-1/2 absolute h-[400px] w-[400px] bg-gradient-to-r from-sky-600 to-violet-700 rounded-full z-10"></div>
      <div className="absolute h-[100dvh] w-full bg-gradient-to-br from-white/30 to-violet-500/50 z-20 backdrop-blur-3xl"></div>
      <div class="relative z-30 max-w-[500px] flex flex-col gap-2 text-center">
        <h1 className="text-4xl font-normal text-slate-900">Welcome! to <span class="font-bold text-violet-700">Mini Car</span> App</h1>
        <p className="text-xl font-normal text-zinc-800 mb-10">Please Login to Mini Car</p>
        <Button className="min-h-14 text-xl hover:bg-violet-700 rounded-[40px]" asChild>
          <Link href="/login">Go to Login</Link>
        </Button>
      </div>
    </div>
  );
}
