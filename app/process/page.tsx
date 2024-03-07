"use client";
import { useEffect, useState } from "react";
import Stack from "@/components/Process/Stack";
import CustomerInvoices from "@/components/Process/CustomerInvoices";
import { addCustomer, customerSelector } from "@/lib/features/customersClient";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";

interface textArea {
  textarea: string;
}
interface customer {
  name: string;
  email: string;
  status: string;
  createdAt: string;
  userId: string;
}

export default function Page() {
  const [moveToDescribeComponent, setMoveToDescibeComponent] =
    useState<boolean>(false);
  const [textRes, setTextRes] = useState<string>("");
  const [textArea, setTextArea] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [accountUserApiKey, setAccountUserApiKey] = useState("");
  const customers = useAppSelector(customerSelector);
  const dispatch = useAppDispatch();
  const router = useRouter();
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const value1 = e.target.value as string
  //     setTextArea(value1)
  // }

  const handleProjectTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.value as string;
    setAccountUserApiKey(key);
  };

  console.log(customers);

  const SubmitProjectAPILemonSquezzy = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${window.location.origin}/api/lemonSquezze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountUserApiKey,
        }),
      });

      if (res.ok) {
        setMoveToDescibeComponent(true);
        setLoading(false);
        return router.push("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="max-w-xl mx-auto">
      <div className="mt-[65px]">
        <Stack
          handleProjectTitleChange={handleProjectTitleChange}
          accountUserApiKey={accountUserApiKey}
          SubmitProjectAPILemonSquezzy={SubmitProjectAPILemonSquezzy}
        />
      </div>
    </section>
  );
}
