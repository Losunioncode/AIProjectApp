"use client";
import CustomerInvoices from "@/components/Process/CustomerInvoices";

import { useToast } from "@/components/ui/use-toast";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const router = useRouter();
  const [customerBillEmail, setCustomerBillEmail] = useState("");
  const { toast } = useToast();
  const [showIsLoadedReq, setShowIsLoadedReq] = useState<boolean>(false);
  const [showCustomerListError, setShowCustomerListError] =
    useState<string>("");

  const handleEmailCustomerChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const customerEmail = e.target.value as string;
    setCustomerBillEmail(customerEmail);
  };

  useEffect(() => {
    const getAuthUser = async () => {
      const res = await fetch("http://localhost:3000/api/authenticated");
      const data = await res.json();

      if (!data.auth) {
        router.push("/");
      }
    };

    getAuthUser();
  }, []);

  const SubmitCustomersInovicesLemonSquezzy = async () => {
    try {
      setShowIsLoadedReq(true);
      const res = await fetch(
        "http://localhost:3000/api/lemonSquezzeCustomers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: customerBillEmail,
          }),
        }
      );
      const data = await res.json();
      const customerOrderId = data.customerOrderKey;
      const customerEmail = data.customerEmail;
      setShowIsLoadedReq(false);
      if (customerOrderId === "" || customerOrderId === undefined) {
        setShowCustomerListError("The customer doesn't exist");

        setCustomerBillEmail("");

        setTimeout(() => {
          setShowCustomerListError("");
        }, 2600);
      }
      if (customerOrderId) {
        const res = await fetch("http://localhost:3000/api/resend", {
          method: "POST",
          headers: {
            "Content-Type": "applciation/json",
          },
          body: JSON.stringify({
            data: {
              customerEmail,
              customerOrderLink: `http://localhost:3000/customerInvoices/${customerOrderId}`,
            },
          }),
        });

        if (res.ok) {
          toast({
            title: `Data was found.`,
            description: `Please check ${customerEmail} to get the data.`,
          });
          setCustomerBillEmail("");
        }
        // return router.push(`/customerInvoices/${customerOrderId}`);
      }
    } catch (err) {}
  };
  return (
    <CustomerInvoices
      handleCustomerBillChange={handleEmailCustomerChange}
      SubmitCusomterInvoicesLemonSquezzy={SubmitCustomersInovicesLemonSquezzy}
      showCustomerErrorList={showCustomerListError}
      customerBillEmailValue={customerBillEmail}
      showLoadedReq={showIsLoadedReq}
    />
  );
};

export default page;
