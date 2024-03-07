import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";

export const POST = async (req: Request) => {
  const data = await req.json();
  const requestedCustomerId = data.customerId;

  try {
    const customerListOrders = await prisma.orders.findMany({
      where: {
        customersId: requestedCustomerId,
      },
    });

    return NextResponse.json({ data: customerListOrders }, { status: 201 });
  } catch (err) {
    let errorMessage = "Error has occured";
    if (err instanceof Error) {
      errorMessage += err.message;
    }
    throw new Error(errorMessage);
  }
};
