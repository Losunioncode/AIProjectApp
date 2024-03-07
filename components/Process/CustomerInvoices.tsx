import React, { useLayoutEffect } from "react";
import { Input } from "../ui/input";
import { useRouter } from "next/router";
import { authOptions } from "@/app/utils/auth";

import { Toaster } from "@/components/ui/toaster";

import { sessionClient } from "@/app/lib/sessionClientUser";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RotateCw } from "lucide-react";
import { setTitle } from "@/lib/features/project-prop/projectSlice";
import { SendHorizonal } from "lucide-react";
import { XCircle } from "lucide-react";
type StackProps = {
  handleCustomerBillChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  SubmitCusomterInvoicesLemonSquezzy: () => void;
  customerBillEmailValue: string;
  showLoadedReq: boolean;
  showCustomerErrorList: string;
};

const CustomerInvoices = ({
  handleCustomerBillChange,
  SubmitCusomterInvoicesLemonSquezzy,
  showLoadedReq,
  customerBillEmailValue,
  showCustomerErrorList,
}: StackProps) => {
  // sessionClient();

  return (
    <div className="flex max-w-xl items-center mt-[25px] mx-auto flex-col ">
      <Toaster />
      {showCustomerErrorList && (
        <Alert variant="destructive" className="py-0  border-sky-950">
          <XCircle
            color="rgb(8 47 73 / var(--tw-text-opacity))"
            className="h-6 w-6 text-sky-950"
          />
          <div className="ml-[11px]">
            <AlertTitle className="text-sky-950 pt-[8px] text-[16px] font-bold ">
              Error
            </AlertTitle>
            <AlertDescription className="pb-[6px] text-sky-950">
              {showCustomerErrorList}
            </AlertDescription>
          </div>
        </Alert>
      )}
      <div className="">
        <h1 className="text-[20px] text-blue-950 mt-[45px] font-bold text-center ">
          Get invoices
        </h1>
        <p className="text-[16px] text-blue-950 mt-[6px] opacity-[.65] text-center ">
          Write an email to get your cutomer invoice.
        </p>
      </div>
      <div className="mt-[45px] w-full rounded-[3px]">
        <Input
          onChange={handleCustomerBillChange}
          className=""
          value={customerBillEmailValue}
          type="email"
          placeholder="lemonsquezzy1@invoices.com"
        />
      </div>

      <p className="text-[16px] text-blue-950 mt-[16px] italic opacity-[.60] text-center ">
        Customer will receive a link to the email with the list of invoices.
        Please make sure you write an email correctly.
      </p>

      <button
        onClick={SubmitCusomterInvoicesLemonSquezzy}
        className="bg-blue-950 mt-[45px] flex text-white items-center rounded-[6px] px-[65px] py-[11px]"
      >
        Get Invoice
        {showLoadedReq ? (
          <RotateCw className=" ml-[10px] h-[20px] w-[20px] animate-spin " />
        ) : (
          <SendHorizonal className="ml-[10px] h-[20px] w-[20px] " />
        )}
      </button>
    </div>
  );
};

export default CustomerInvoices;
