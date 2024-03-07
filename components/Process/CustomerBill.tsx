import React, { useRef } from "react";
import { Download, LogOut } from "lucide-react";
import { useState } from "react";
import { X } from "lucide-react";
import JsPDF from "jspdf";

import generatePDF, { Resolution, Margin } from "react-to-pdf";
import {
  Table,
  TableCaption,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

export type CustomerBillDetails = {
  customerBillIdValue: string;
  customerBillCreatedDate: string;
  customerBillDescription: string;
  customerBillQuantity: string;
  customerBillPrice: string;
  closeCustomerBillDetails: () => void;
  customerBillAmount: string;
  customerBillSubtotal: string;
  customerBillDiscount: string;
};

type optionsPDF = {
  method: "open" | "save" | "build" | undefined;
  resolution: number;
  page: {
    margin: number;
    format: string;
    orientation: "portrait";
  };

  canvas: {
    // default is 'image/jpeg' for better size performance
    mimeType: "image/jpeg";
    qualityRatio: number;
  };
  overrides: {
    // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
    pdf: {
      compress: true | false;
    };
    // see https://html2canvas.hertzen.com/configuration for more options
    canvas: {
      useCORS: true | false;
    };
  };
};
const options: optionsPDF = {
  // default is `save`
  method: "open",
  // default is Resolution.MEDIUM = 3, which should be enough, higher values
  // increases the image quality but also the size of the PDF, so be careful
  // using values higher than 10 when having multiple pages generated, it
  // might cause the page to crash or hang.
  resolution: 9,
  page: {
    // margin is in MM, default is Margin.NONE = 0
    margin: Margin.NONE,
    // default is 'A4'
    format: "A4",
    // default is 'portrait'
    orientation: "portrait",
  },
  canvas: {
    // default is 'image/jpeg' for better size performance
    mimeType: "image/jpeg",
    qualityRatio: 8,
  },
  overrides: {
    // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
    pdf: {
      compress: false,
    },
    // see https://html2canvas.hertzen.com/configuration for more options
    canvas: {
      useCORS: false,
    },
  },

  // Customize any value passed to the jsPDF instance and html2canvas
  // function. You probably will not need this and things can break,
  // so use with caution.
};
const CustomerBill = ({
  customerBillIdValue,
  customerBillAmount,
  customerBillCreatedDate,
  customerBillDescription,
  customerBillDiscount,
  customerBillPrice,
  closeCustomerBillDetails,
  customerBillQuantity,
  customerBillSubtotal,
}: CustomerBillDetails) => {
  const dateCreate = customerBillCreatedDate.replace("at", "");
  const [billToEdit, setBillToEdit] = useState<string>("");
  const [showBillToDetails, setShowBillToDetails] = useState<boolean>(false);
  const targetRef = useRef();
  const editedBillDetails = billToEdit.split("\n");
  const handleChangeValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBillToEdit(e.target.value);
  };

  const handleDownloadDoc = async () => {
    await setShowBillToDetails(true);
    generatePDF(dataToPDF, options);
  };
  const dataToPDF = () => document.getElementById("docPDF");

  return (
    <div className=" transition-all ease-in-out duration-300 sm:h-[100vh] md:h-[100vh] min-h-max ">
      {showBillToDetails && (
        <div className="flex items-baseline mx-auto sm:gap-0 my-[10px] justify-around sm:items-center sm:flex-row-reverse sm:my-0 gap-3 sm:max-w-[1065px] ">
          <button
            onClick={closeCustomerBillDetails}
            className="w-[120px] sm:mt-[45px] sm:block h-[45px] rounded-[4px]  sm:ml-[20px] bg-slate-200"
          >
            {/* <LogOut />
             */}
            Close
          </button>
          <button
            onClick={() => setShowBillToDetails(false)}
            className="mt-[45px] bg-blue-950 sm:flex text-yellow-100 rounded-[6px] gap-[11px] px-[60px] py-[11px] "
          >
            Edit
          </button>
        </div>
      )}
      <div
        id="docPDF"
        className="bg-white sm:my-[45px] container 2xl:max-w-[1065px] h-fit xl:max-w-[888px] md:h-screen mx-auto  "
      >
        <div
          className={`flex flex-row-reverse ${!showBillToDetails ? "items-baseline" : "items-start pt-[67px]"} justify-around`}
        >
          <div className="flex flex-col items-center ">
            {!showBillToDetails && (
              <div className="flex gap-[16px] flex-col-reverse xl:flex-row  items-center">
                <button
                  onClick={handleDownloadDoc}
                  className="sm:mt-[45px] bg-blue-950 sm:flex text-yellow-100  flex rounded-[6px] items-center gap-[11px] px-[25px] sm:px-[65px] py-[11px] "
                >
                  <Download />
                  Download
                </button>

                <button
                  onClick={closeCustomerBillDetails}
                  className="w-[120px] sm:mt-[45px] sm:block h-[45px] rounded-[4px] hidden mt-[0px]   sm:ml-[20px] bg-slate-200"
                >
                  {/* <LogOut />
                   */}
                  Close
                </button>
                <button
                  onClick={closeCustomerBillDetails}
                  className=" h-[45px] rounded-[4px] sm:hidden  mt-[45px] sm:ml-[20px] p-[10px] bg-slate-200"
                >
                  {/* <LogOut />
                   */}
                  <X />
                </button>
              </div>
            )}
            <div className="font-light flex mt-[89px] flex-col sm:mt-[145px] ">
              <label
                htmlFor="bill"
                className={`text-[16px] ${showBillToDetails ? "mt-[46px]" : "mt-[0px]"} font-bold `}
              >
                Bill to{" "}
              </label>
              {!showBillToDetails && (
                <textarea
                  onChange={handleChangeValue}
                  id="bill"
                  className="sm:w-[19rem] focus:outline-none sm:h-[6rem]   max-h-[120px] flex-col  border-[1px] rounded-[3px] border-blue-950 sm:py-[10px] font-light"
                />
              )}
              {showBillToDetails && (
                <div className="">
                  {editedBillDetails.map((r) => (
                    <p key={r} className="text-[16px]">
                      {r}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="">
            <h4 className="text-[25px] font-bold">Invoice</h4>
            <p className="text-[16px] font-bold  mt-[25px] ">
              {" "}
              Invoice Number:{""}
            </p>
            <span className="text-[16px]">{customerBillIdValue}</span>
            <p className="text-[16px] font-bold mt-[16px]">Date of issue: </p>
            <span className="text-[16px]">{dateCreate}</span>
            <div className="mt-[20px] w-[131px] mr-[26px]">
              <h4 className="text-[16px] font-bold">LightInvoice</h4>
              <p className="text-[16px]">
                9 Butterfield Orchard, Rathfarnham, Dublin, D14 YH63, Ireland
              </p>
              <p>LightInvoice@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="sm:max-w-[688px] shrink-0	 overflow-hidden 2xl:max-w-[1100] my-[60px] mx-auto">
          <Table className="ml-[20px]  ">
            <TableHeader className="">
              <TableRow className="bg-yellow">
                <TableHead className="px-0">Description</TableHead>
                <TableHead className="px-0">Quantity</TableHead>
                <TableHead className="px-0">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              <TableRow>
                <TableCell className="text-[16px] px-0 text-blue-950 ">
                  {customerBillDescription}
                </TableCell>
                <TableCell className="text-[16px] px-0 text-blue-950 ">
                  {customerBillQuantity}
                </TableCell>
                <TableCell className="text-[16px] px-0 text-blue-950 ">
                  ${customerBillPrice}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="relative flex sm:justify-end justify-center ">
          <div className="2xl:w-1/4 sm:mr-[120px] md:w-1/3">
            <div className="flex w-[260px] justify-between items-center  ">
              <p className="text-[18px] text-slate-600">Subtotal</p>
              <span className="text-[16px] text-slate-600  ">
                {customerBillSubtotal}
              </span>
            </div>
            <Separator className="mt-[11px]" />

            <div className="flex w-[276px] mt-[11px]  justify-between items-center  ">
              <p className="text-[18px] text-slate-600">Discount</p>
              <span className="text-[16px] mr-[20px] text-slate-600">
                {customerBillDiscount === "" ? "0.00" : customerBillDiscount} %
              </span>
            </div>
            <Separator className="mt-[11px]" />

            <div className="flex w-[260px] mt-[11px] justify-between items-center  ">
              <p className="text-[18px] text-slate-600 ">Amount</p>
              <span className="text-[16px] text-slate-600 ">
                {customerBillAmount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerBill;
