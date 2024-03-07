"use client";
import { type CustomerOrders } from "@/app/lib/createOrdersList";
import { useEffect, useState } from "react";
import { type CustomerBillDetails } from "@/components/Process/CustomerBill";
import CustomerBill from "@/components/Process/CustomerBill";
import Link from "next/link";

interface CustomerDetails {
  customerDetails: {
    customerBillIdValue: string;
    customerBillCreatedDate: string;
    customerBillDescription: string;
    customerBillQuantity: string;
    customerBillPrice: string;
    customerBillAmount: string;
    customerBillSubtotal: string;
    customerBillDiscount: string;
  };
}

const page = ({ params }: { params: { id: string } }) => {
  const [customerOrderList, setCustomerOrderList] = useState<CustomerOrders[]>(
    []
  );
  const [showBillDetailsComponents, setShowBillDetailsComponents] =
    useState<boolean>(false);

  const [customerBillId, setCustomerBillId] = useState<string>("");
  const [customerBillDateCreated, setCustomerBillDateCreated] =
    useState<string>("");
  const [customerBillDescription, setCustomerBillDescription] =
    useState<string>("");
  const [customerBillQuantity, setCustomerBillQuantity] = useState<string>("");
  const [customerBillPrice, setCustomerBillPrice] = useState<string>("");
  const [customerBillAmount, setCustomerBillAmount] = useState<string>("");
  const [customerBillSubtotal, setCustomerBillSubtotal] = useState<string>("");
  const [customerBillDiscount, setCustomerBillDiscount] = useState<string>("");
  // const [customerBillQuanit, setCustomerBillId] = useState<string>("");

  useEffect(() => {
    const getOrderListCustomer = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/lemonSquezzyCustomerOrder",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              customerId: params.id,
            }),
          }
        );
        const data = await res.json();

        setCustomerOrderList(data?.data);
      } catch (err) {}
    };
    getOrderListCustomer();
  }, []);

  const closeCustomerBillDetails = () => {
    setShowBillDetailsComponents(false);
  };
  const showCustomerBillDetails = ({ customerDetails }: CustomerDetails) => {
    setCustomerBillId(customerDetails.customerBillIdValue);
    setCustomerBillDateCreated(customerDetails.customerBillCreatedDate);
    setCustomerBillDescription(customerDetails.customerBillDescription);
    setCustomerBillPrice(customerDetails.customerBillPrice);
    setCustomerBillAmount(customerDetails.customerBillAmount);
    setCustomerBillQuantity(customerDetails.customerBillQuantity);
    setCustomerBillSubtotal(customerDetails.customerBillSubtotal);

    setShowBillDetailsComponents(true);
  };

  if (showBillDetailsComponents) {
    return (
      <CustomerBill
        customerBillIdValue={customerBillId}
        customerBillCreatedDate={customerBillDateCreated}
        customerBillDescription={customerBillDescription}
        customerBillQuantity={customerBillQuantity}
        customerBillSubtotal={customerBillSubtotal}
        customerBillAmount={customerBillAmount}
        closeCustomerBillDetails={closeCustomerBillDetails}
        customerBillDiscount={customerBillDiscount}
        customerBillPrice={customerBillPrice}
      />
    );
  }
  return (
    <div className="sm:max-w-[1440px] md:max-w-[1120px] m-auto">
      {!showBillDetailsComponents && (
        <div className="mt-[60px] m-auto md:max-w-[989px]">
          <div className="m-auto md:max-w-[888px] ">
            <h2 className="text-blue-950 font-black text-center text-[40px]">
              Get your invoice here
            </h2>
            <p className="text-[18px] font-bold mt-[45px] text-slate-700 ">
              Most recent Invoices
            </p>

            {customerOrderList.map((order) => (
              <div
                key={order.orderNumber}
                className="flex items-center flex-col justify-center "
              >
                <div className="flex justify-around w-full items-center mt-[20px] px-[19px] rounded-[2.5px] bg-sky-950 align-center gap-[20px] py-[6px]">
                  <p className="text-[18px] text-yellow-100">
                    #{order.orderNumber}
                  </p>
                  <p className="text-[18px] text-yellow-100 font-extralight italic shrink">
                    {" "}
                    {order.orderEmail}
                  </p>
                  <button
                    onClick={() =>
                      showCustomerBillDetails({
                        customerDetails: {
                          customerBillIdValue: order.orderNumber,
                          customerBillCreatedDate: order.dateOrder,
                          customerBillDescription: order.productTitle,
                          customerBillDiscount: order.discountTotal,
                          customerBillPrice: order.productPrice,
                          customerBillQuantity: order.productQuantity,
                          customerBillAmount: order.total,
                          customerBillSubtotal: order.subtotal,
                        },
                      })
                    }
                    className="py-[6px] px-[20px] rounded-[3px] text-blue-950 hover:opacity-[.88] ease-in-out transition duration-200 bg-yellow-100  text-center "
                  >
                    Click here
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
