import prisma from "./db";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/auth";
import { type Product, getProduct } from "@lemonsqueezy/lemonsqueezy.js";

import { ListOrders } from "@lemonsqueezy/lemonsqueezy.js";

export type CustomerOrders = {
  customerId: string;
  discountTotal: string;
  productTitle: string;
  dateOrder: string;
  productPrice: string;
  orderEmail: string;
  orderNumber: string;
  productQuantity: string;
  subtotal: string;
  taxRate: string;
  total: string;
  userId: string;
};

function getCustomerOrderProductDescription(productId: string) {
  console.log(productId);
  const getProductDetails = async () => {
    const getProductDetails = await getProduct(productId);

    return getProductDetails;
  };

  getProductDetails();
}
const handleCustomersOrders = async (dataListOrders: ListOrders) => {
  const data1 = dataListOrders?.data;
  const listCustomersData: CustomerOrders[] = [];
  const session = await getServerSession(authOptions);

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const userSessionId = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
    select: {
      id: true,
    },
  });

  data1.forEach((order) => {
    const date = new Date(order.attributes.created_at).toLocaleDateString(
      "US",
      dateOptions
    );
    listCustomersData.push({
      customerId: order.attributes.customer_id.toString(),
      discountTotal: order.attributes.discount_total_formatted,
      productTitle: order.attributes.first_order_item.product_name,
      productPrice: order.attributes.first_order_item.price.toString(),
      productQuantity: order.attributes.first_order_item.quantity.toString(),
      dateOrder: date,
      orderEmail: order.attributes.user_email,
      orderNumber: order.attributes.order_number.toString(),
      subtotal: order.attributes.subtotal_formatted,
      taxRate: order.attributes.tax_rate,
      total: order.attributes.total_formatted,
      userId: userSessionId?.id as string,
    });
  });

  const saveDataToCustomerOrders = await prisma.orders.createMany({
    data: listCustomersData,
  });
  //   console.log(listCustomersData);
};

export default handleCustomersOrders;
