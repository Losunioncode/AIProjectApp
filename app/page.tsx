import { getServerSession } from "next-auth";
import { authOptions } from "./utils/auth";
import Link from "next/link";
import { Citrus } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect("/dashboard");
  }
  return (
    <div className="max-w-[1440px] mx-auto">
      <header className="mx-auto">
        <nav className="flex flex-row mt-[45px] justify-around">
          <div className="">
            <h1 className="text-[25px] font-bold text-blue-950 ml-[45px]">
              LightPurchase
            </h1>
          </div>
          <div className="">
            <Link
              href="/auth"
              className="text-[16px] bg-blue-950 px-[19px] font-extralight py-[8px] rounded-[6px] text-white hover:text-white/80 ml-[45px]"
            >
              Login
            </Link>
          </div>
        </nav>
      </header>
      <section className="my-[10rem]">
        <div className="max-w-full flex flex-col items-center justify-center ">
          <span className="px-[16px] py-[10px] flex rounded-[6px]  text-white bg-blue-950">
            powered by Lemon Squezzy
            <Citrus className="ml-[11px]" />
          </span>
          <h1 className="text-center font-black mt-[45px] text-blue-950 text-[45px]">
            Make invoices for your customers
          </h1>
          <p className="text-center font-bold text-[18px] text-blue-950 opacity-[.25] ">
            Create custom quick invoices from Lemon Squeezy in few clicks.
          </p>
          <Link
            href="/auth"
            className="bg-blue-950 mt-[45px] text-white rounded-[6px] px-[65px] py-[11px] "
          >
            Try it out
          </Link>
        </div>
      </section>
    </div>
  );
}
