import { getServerSession } from "next-auth";
import { authOptions } from "./utils/auth";
import Link from "next/link";
import { Citrus } from "lucide-react";
import { Check } from "lucide-react";
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
            <h1 className="text-[25px] font-bold text-sky-950 ml-[45px]">
              LemonInvoice
            </h1>
          </div>
          <div className="">
            <Link
              href="/auth"
              className="text-[16px] bg-sky-950 px-[19px] font-extralight py-[8px] rounded-[6px] text-white hover:text-white/80 ml-[45px]"
            >
              Login
            </Link>
          </div>
        </nav>
      </header>
      <section className="my-[6rem]">
        <div className="max-w-full flex flex-col items-center justify-start ">
          <span className="px-[16px] py-[10px] flex rounded-[6px] text-white bg-sky-950">
            powered by Lemon Squezzy
            <Citrus className="ml-[11px]" />
          </span>
          <h1 className="text-center font-black mt-[45px] text-sky-950 text-[45px]">
            Make invoices for your customers
          </h1>
          <p className="text-center font-bold text-[18px] text-sky-950 opacity-[.25] ">
            Create custom quick invoices from Lemon Squeezy in few clicks.
          </p>
          <div className="mt-[27px]">
            <div className="">
              <span className="flex items-center gap-1 text-sky-950 font-bold text-[17px] ">
                <Check />
                Custom version of your bill
              </span>
              <span className="flex items-center gap-1 mt-[6px] text-sky-950 font-bold text-[17px]">
                <Check />
                Most recent invoices from your order
              </span>
              <span className="flex items-center gap-1 mt-[6px] text-sky-950 font-bold text-[17px]">
                <Check />
                Send by email
              </span>
              <span className="flex items-center gap-1 mt-[6px] text-sky-950 font-bold text-[17px]">
                <Check />
                All data is protected
              </span>
            </div>
          </div>
          <Link
            href="/auth"
            className="bg-sky-950 mt-[45px] text-white  rounded-[6px] px-[65px] hover:opacity-[.88] py-[11px] "
          >
            Try it out
          </Link>
        </div>

        <div className="flex items-center flex-col mt-[125px] ">
          <h1 className="text-[20px] font-bold  text-sky-950 ">Demo</h1>
          <p className="text-[18px] text-sky-950 opacity-[.65]">
            Watch quick demo of LemonInvoice
          </p>
          <div className="mt-[65px]">
            <video controls width="1688">
              <source
                src="./demo1.mp4"
                width={620}
                height={625}
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </section>
    </div>
  );
}
