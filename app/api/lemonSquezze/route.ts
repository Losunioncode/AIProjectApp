import { NextResponse } from "next/server";
import {
  type ListCustomers,
  listCustomers,
  lemonSqueezySetup,
  type ListSubscriptionInvoices,
  type ListOrders,
  listOrders,
  listSubscriptionInvoices,
  type OrderItem,
  getOrderItem,
  type Product,
  getProduct,
  type SubscriptionInvoice,
  type ListSubscriptions,
  listSubscriptions,
  getSubscriptionInvoice,
  getAuthenticatedUser,
} from "@lemonsqueezy/lemonsqueezy.js";
import handleCustomerList from "@/app/lib/createCustomerList";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/app/lib/db";
import handleCustomersOrders from "@/app/lib/createOrdersList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";
import clientLemonSquezzy from "@/app/lib/clientLemonSquezzy";
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

export async function handler(req: Request, res: NextApiResponse) {
  const session = await getServerSession(authOptions);
  let API_KEY1 = undefined;
  if (req.method === "GET") {
    // const client = await clientLemonSquezzy(API_KEY1);

    // const { data, error, statusCode } = await listCustomers({
    //   include: ["store"],
    // });

    const productId = 197889;
    const { statusCode, error, data } = await listOrders();
    const {
      statusCode: st1,
      error: err1,
      data: data1,
    } = await getProduct(productId);

    console.log(data1);

    return NextResponse.json({ confirm: data });
  } else {
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
}

export { handler as POST, handler as GET };
