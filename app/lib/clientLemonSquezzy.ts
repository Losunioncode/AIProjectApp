import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";
import prisma from "./db";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/auth";

export default async function clientLemonSquezzy(API_KEY: string | undefined) {
  const session = await getServerSession(authOptions);
  let clientAPIKey;
  if (API_KEY === undefined) {
    clientAPIKey = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
      select: {
        appApiKey: true,
      },
    });

    API_KEY = clientAPIKey?.appApiKey as string;
  }
  const client = lemonSqueezySetup({
    apiKey: API_KEY,
    onError(error) {
      throw new Error(`${error.message}`);
    },
  });
  return client;
}
