"use client";
import { UseSelector, UseDispatch, useSelector } from "react-redux";
import { customerSelector } from "@/lib/features/customersClient";
import React from "react";
import {
  Table,
  TableCaption,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "../ui/table";
import Link from "next/link";

interface Customers {
  customers: DataCustomers[];
}
interface DataCustomers {
  id: string;
  email: string;
  status: string;
  createdAt: string;
  name: string;
  userId: string;
}

const DataTable = ({ customers }: Customers) => {
  const customersAll = useSelector(customerSelector);
  console.log(customersAll);
  return (
    <Table className="bg-blue-950/90">
      <TableCaption>All of your current clients</TableCaption>
      <TableHeader>
        <TableRow className="">
          <TableHead className="p-[20px] text-yellow-100 text-[18px] ">
            invoice
          </TableHead>
          <TableHead className="text-yellow-100 text-[18px] ">status</TableHead>
          <TableHead className="text-yellow-100 text-[18px] ">email</TableHead>
          <TableHead className="text-yellow-100 text-[18px] ">
            created at
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {customers.map(({ email, status, createdAt, name }) => (
          <TableRow key={createdAt} className="">
            <TableCell className="p-[40px] text-yellow-100 text-[17px]">
              LLLL324L234
            </TableCell>
            <TableCell className="text-yellow-100 italic text-[17px] ">
              {status}
            </TableCell>
            <TableCell className="text-yellow-100 text-[17px] ">
              {email}
            </TableCell>
            <TableCell className="text-yellow-100 text-[17px] ">
              {createdAt}
            </TableCell>
            <TableCell className="text-blue-950/90 text-[17px] ">
              <Link
                href="/"
                className="text-[17px] bg-yellow-100 p-[10px] hover:bg-yellow-100/85 ease-in-out transition duration-100 rounded-[3px]"
              >
                Write a message
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
