"use client";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { customerSelector, addCustomer } from "@/lib/features/customersClient";
import { CustomersArray } from "../api/lemonSquezze/route";

export default function customerDispatch({
  name,
  email,
  userId,
  createdAt,
  status,
}: CustomersArray) {
  const customers = useSelector(customerSelector);
  const dispatch = useDispatch();

  dispatch(
    addCustomer({
      name,
      email,
      userId,
      createdAt,
      status,
    })
  );

  return customers;
}
