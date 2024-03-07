import Logout from "@/components/Logout";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/auth";
import { SendHorizonal } from "lucide-react";
import UpdateCustomersList from "@/components/UpdateCustomersList";
import DataTable from "@/components/Dashboard/DataTable";
import Link from "next/link";
import { UseSelector, useSelector } from "react-redux";
import { customerSelector } from "@/lib/features/customersClient";
import { redirect } from "next/navigation";
import prisma from "../lib/db";

const customersClientRecieve = async (clientEmail: string) => {
  const clientCustomers = await prisma.user.findMany({
    where: {
      email: clientEmail,
    },
    select: {
      customers: true,
    },
  });
  return clientCustomers;
};

const clientApiKey = async (clientEmail: string) => {
  const apiKeyApp = await prisma.user.findUnique({
    where: {
      email: clientEmail,
    },

    select: {
      appApiKey: true,
    },
  });
  return apiKeyApp?.appApiKey as string;
};

const dashboard = async () => {
  const session = await getServerSession(authOptions);
  const clientEmail = session?.user?.email as string;
  if (!session) {
    return redirect("/");
  }

  const clientApiKeyValue = await clientApiKey(clientEmail);
  const data = await customersClientRecieve(clientEmail);
  const customers = data[0].customers as [];
  return (
    <div className="mx-auto max-w-7xl py-10">
      <div className="flex items-center justify-between gap-y-2">
        <h1 className="text-[20px] font-bold text-blue-950">
          Welcome {session?.user?.email}
        </h1>
        <Link
          href={"/customerReqEmail"}
          className="bg-blue-950 text-white flex rounded-[6px] items-center px-[65px] py-[11px]"
        >
          {" "}
          Get Invoices{" "}
          <SendHorizonal className="ml-[10px] h-[20px] w-[20px] " />
        </Link>
        <Logout />
      </div>
      <div className="sm:mt-[11rem] md:mt-[3rem]">
        <h4 className="text-blue-950/65 text-center font-black text-[23px] "></h4>
        <div className="sm:mt-[3rem] ml-[160px]">
          <div className="">
            <h4 className="text-[19px] text-sky-950 font-bold">
              1.Auth your Lemonsqueezy Account.
            </h4>
            <p className="text-[16px] text-sky-950">
              You can connect your Lemonsqueezy account{" "}
              <Link
                href={"/process"}
                className="text-slate-700 font-bold underline "
              >
                here
              </Link>
            </p>
          </div>
          <div className="mt-[20px]">
            <h4 className="text-[19px] text-sky-950 font-bold">
              2. Get an email from your customer
            </h4>
            <p className="text-[16px] text-sky-950">
              {` Write a customer's email. And find all invoices for him. You can
              do it`}
              <Link
                href={"/customerReqEmail"}
                className="text-slate-700 ml-[3px] font-bold underline "
              >
                here
              </Link>
            </p>
          </div>
          <div className="mt-[20px]">
            <h4 className="text-[19px] text-sky-950 font-bold">
              3. Send a Link{" "}
            </h4>
            <p className="text-[16px] text-sky-950">
              {`Send a link of a list of customer's invoices. And check result!`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default dashboard;
