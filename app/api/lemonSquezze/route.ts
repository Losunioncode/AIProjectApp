import { NextResponse } from "next/server";
import {
  type ListCustomers,
  listCustomers,
  lemonSqueezySetup,
} from "@lemonsqueezy/lemonsqueezy.js";
import prisma from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";
interface Customer {
  name: string;
  email: string;
  emailClient: string;
  statusPayment: string;
}

export type CustomersArray = {
  name: string;
  email: string;
  userId: string;
  createdAt: string;
  status: string;
};

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  let API_KEY1 = undefined;

  const data = await req.json();
  const API_KEY = data.accountUserApiKey;

  const clientEmailSession = session?.user?.email as string;
  const client = lemonSqueezySetup({
    apiKey: API_KEY,
    onError(error) {
      throw new Error(`${error.message}`);
    },
  });
  try {
    const { statusCode, error, data } = await listCustomers({
      include: ["store"],
    });

    const saveAPIKeyLemonSquezze = await prisma.user.update({
      where: {
        email: clientEmailSession,
      },
      data: {
        appApiKey: API_KEY,
      },
    });
    const data1 = data as ListCustomers;

    // await handleCustomerList(data1, "create");
    // await handleCustomersOrders(dataListOrders);
    return NextResponse.json({ confirm: "SDF" });
  } catch (err) {
    let errorMessage = "Server action failed";
    if (err instanceof Error) {
      errorMessage += err.message;
    }
    throw new Error(errorMessage);
  }
}
