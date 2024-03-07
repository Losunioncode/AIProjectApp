import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextApiRequest } from "next";
import { authOptions } from "@/app/utils/auth";
import jwt from "jsonwebtoken";
import generateTokenId from "@/app/lib/generateTokenIdCustomer";
import { type CustomerOrders } from "@/app/lib/createOrdersList";
import { type ListOrders, listOrders } from "@lemonsqueezy/lemonsqueezy.js";
import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";

export async function POST(req: Request) {
  const data = await req.json();
  const emailCustomerReq = data.email;
  const session = await getServerSession(authOptions);
  const clientEmailAuth = session?.user?.email as string;

  try {
    const clientApiKey = await prisma.user.findUnique({
      where: {
        email: clientEmailAuth,
      },
      select: {
        appApiKey: true,
      },
    });

    const customerOrderLists: CustomerOrders[] = [];
    const client = lemonSqueezySetup({
      apiKey: clientApiKey?.appApiKey as string,
      onError(error) {
        throw new Error(`${error.message}`);
      },
    });
    const dataAlrExistedCustomersOrders = await prisma.orders.findMany({
      where: {
        orderEmail: emailCustomerReq,
      },
      select: {
        orderNumber: true,
      },
    });

    const dateOptions: Intl.DateTimeFormatOptions = {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    };

    const { statusCode, error, data } = await listOrders();
    const customerListOrders = data?.data.filter(
      (order) => order.attributes.user_email === emailCustomerReq
    );

    const userSessionId = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
      select: {
        id: true,
      },
    });

    const userEmailCustomerCheckExisting = await prisma.customers.findUnique({
      where: {
        email: emailCustomerReq,
      },
      select: {
        email: true,
      },
    });
    if (
      customerListOrders?.length !== 0 &&
      !userEmailCustomerCheckExisting?.email
    ) {
      const createCustomer = await prisma.user.update({
        where: {
          email: clientEmailAuth,
        },
        data: {
          customers: {
            create: [
              {
                email: emailCustomerReq,
              },
            ],
          },
        },
      });
    }

    // const token = crypto.randomBytes(64).toString('hex');
    customerListOrders?.forEach((order) => {
      const dateUpdateList = dataAlrExistedCustomersOrders.find(
        (orderNumber) =>
          orderNumber?.orderNumber === order.attributes.order_number.toString()
      );
      const date = new Date(order.attributes.created_at).toLocaleDateString(
        "US",
        dateOptions
      );
      const customerIdHarshed = jwt.sign(
        { foo: "bar", iat: Math.floor(Date.now() / 1000) - 30 },
        customerListOrders[0].attributes.customer_id.toString()
      );
      if (!dateUpdateList) {
        customerOrderLists.push({
          customerId: customerIdHarshed,
          discountTotal: order.attributes.discount_total_formatted,
          productTitle: order.attributes.first_order_item.product_name,
          productPrice: order.attributes.first_order_item.price.toString(),
          dateOrder: date,
          orderEmail: order.attributes.user_email,
          productQuantity:
            order.attributes.first_order_item.quantity.toString(),
          orderNumber: order.attributes.order_number.toString(),
          subtotal: order.attributes.subtotal_formatted,
          taxRate: order.attributes.tax_rate,
          total: order.attributes.total_formatted,
          userId: userSessionId?.id as string,
        });
      }
    });
    // console.log(customerOrderLists);
    // const createOrdersCustomer = await prisma.orders.createMany({
    //   data: customerOrderLists,
    // });
    if (customerOrderLists?.length > 1) {
      const createOrdersForCustomer = await prisma.customers.update({
        where: {
          email: emailCustomerReq,
        },
        data: {
          orders: {
            createMany: {
              data: customerOrderLists,
            },
          },
        },
      });
    } else if (customerOrderLists?.length === 1) {
      const createOrdersForCustomer = await prisma.customers.update({
        where: {
          email: emailCustomerReq,
        },
        data: {
          orders: {
            create: {
              customerId: customerOrderLists[0]?.customerId,
              discountTotal: customerOrderLists[0]?.discountTotal,
              productTitle: customerOrderLists[0]?.productTitle,
              productPrice: customerOrderLists[0]?.productPrice,
              dateOrder: customerOrderLists[0]?.dateOrder,
              orderEmail: customerOrderLists[0]?.orderEmail,
              productQuantity: customerOrderLists[0]?.productQuantity,
              orderNumber: customerOrderLists[0]?.orderNumber,
              subtotal: customerOrderLists[0]?.subtotal,
              taxRate: customerOrderLists[0]?.taxRate,
              total: customerOrderLists[0]?.total,
              userId: customerOrderLists[0]?.userId,
            },
          },
        },
      });
    }

    //
    let customerOrderKey: string;
    let customerEmail: string;

    // Customer's order was found. But it hasn't been updated.
    // So we're searching for emial, id. To send data with already existed orders

    const customerUserId = await prisma.orders.findFirst({
      where: {
        orderEmail: emailCustomerReq,
      },
      select: {
        customersId: true,
        orderEmail: true,
      },
    });

    customerOrderKey = customerUserId?.customersId as string;
    customerEmail = customerUserId?.orderEmail as string;

    return NextResponse.json(
      {
        customerOrderKey: customerUserId?.customersId,
        customerEmail,
      },
      { status: 201 }
    );
  } catch (err) {
    let errorMessage = "Error has occured :";
    if (err instanceof Error) {
      errorMessage += err.message;
    }
    throw new Error(errorMessage);
  }
}
