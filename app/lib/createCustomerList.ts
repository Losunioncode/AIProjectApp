import { CustomersArray } from "../api/lemonSquezze/route";
import { type ListCustomers } from "@lemonsqueezy/lemonsqueezy.js";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/auth";
import prisma from "./db";

type Operation = "create" | "update";

const handleCustomerList = async (data: ListCustomers, type: Operation) => {
  const clientCustomers = await prisma.customers.findMany({
    select: {
      email: true,
    },
  });

  const session = await getServerSession(authOptions);
  const clientEmail = session?.user?.email as string;
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
  const listOfCustomers: CustomersArray[] = [];

  data?.data.forEach((customer) => {
    const customerExisted = clientCustomers.find(
      (c) => c.email === customer.attributes.email
    );
    const date = new Date(customer.attributes.created_at).toLocaleDateString(
      "US",
      dateOptions
    );
    if (!customerExisted) {
      listOfCustomers.push({
        name: customer.attributes.name,
        email: customer.attributes.email,
        status: customer.attributes.status,
        createdAt: date,
        userId: userSessionId?.id as string,
      });
    }
  });

  if (type === "create") {
    const createCustomer = await prisma.customers.createMany({
      data: listOfCustomers,
    });
  } else {
    if (listOfCustomers.length === 1) {
      const createCustomerList = await prisma.customers.create({
        data: {
          name: listOfCustomers[0].name,
          email: listOfCustomers[0].email,
          status: listOfCustomers[0].status,
          createdAt: listOfCustomers[0].createdAt,
          userId: listOfCustomers[0].userId,
        },
      });
    } else {
      const createCustomerList = await prisma.customers.createMany({
        data: listOfCustomers,
      });
    }
  }
};

export default handleCustomerList;
