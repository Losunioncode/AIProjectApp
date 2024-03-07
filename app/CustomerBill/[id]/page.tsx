import React from "react";
import { Download, LogOut } from "lucide-react";
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
const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="container sm:h-[100vh] md:h-[100vh] min-h-max ">
      <div className="bg-white/60 sm:my-[45px] h-full md:max-w-[825px] mx-auto 2xl:max-w-[1110px] ">
        <div className="flex flex-row-reverse items-baseline justify-around">
          <div className="flex flex-col items-center ">
            <div className="flex gap-[16px] items-center">
              <button className="mt-[45px] bg-blue-950 sm:flex text-yellow-100 items-center hidden rounded-[6px] gap-[11px]  px-[60px] py-[11px]">
                <Download />
                Download
              </button>
              <button className="mt-[45px] bg-blue-950 sm:hidden text-yellow-100 block items-center rounded-[6px] px-[11px] py-[11px]">
                <Download />
                {/* Download */}
              </button>
              <button className="p-[11px] mt-[45px] rounded-[4px] sm:ml-[20px] bg-slate-200">
                <LogOut />
              </button>
            </div>
            <div className="shrink font-light flex flex-col ">
              <label htmlFor="bill" className="text-[16px] font-bold ">
                Bill to{" "}
              </label>
              <textarea
                id="bill"
                className="sm:w-[19rem] focus:outline-none sm:h-[6rem] border-[1px] h-[80px] rounded-[3px] border-blue-950 sm:py-[10px] font-light"
              />
            </div>
          </div>
          <div className="">
            <h4 className="text-[25px] font-bold">Invoice</h4>
            <p className="text-[16px] font-bold  mt-[25px] ">
              {" "}
              Invoice Number:{" "}
            </p>
            <span className="text-[16px]">11</span>
            <p className="text-[16px] font-bold mt-[16px]">Date of issue: </p>
            <span className="text-[16px]">25.01.2024</span>
            <div className="mt-[20px] w-[131px] mr-[26px]">
              <h4 className="text-[16px] font-bold">LightInvoice</h4>
              <p className="text-[16px]">
                9 Butterfield Orchard, Rathfarnham, Dublin, D14 YH63, Ireland
              </p>
              <p>LightInvoice@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="sm:max-w-[698px] overflow-hidden my-[60px] mx-auto">
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
                  Item for It Saas
                </TableCell>
                <TableCell className="text-[16px] px-0 text-blue-950 ">
                  1
                </TableCell>
                <TableCell className="text-[16px] px-0 text-blue-950 ">
                  49$
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-end mt-[65px]">
          <div className="2xl:w-1/4 mr-[120px] md:w-1/3">
            <div className="flex w-[260px] justify-between items-center  ">
              <p className="text-[18px] text-slate-600">Subtotal</p>
              <span className="text-[16px] text-slate-600  ">120</span>
            </div>
            <Separator />

            <div className="flex w-[276px] mt-[11px] justify-between items-center  ">
              <p className="text-[18px] text-slate-600">Discount</p>
              <span className="text-[16px] text-slate-600">120 %</span>
            </div>
            <Separator />

            <div className="flex w-[260px] mt-[11px] justify-between items-center  ">
              <p className="text-[18px] text-slate-600 ">Amount</p>
              <span className="text-[16px] text-slate-600 ">120</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
