import { useRouter } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/auth";
import { useLayoutEffect } from "react";

export let AutenticatedClient: boolean;
export async function sessionClient() {
  const session = await getServerSession(authOptions);
  if (session) {
    AutenticatedClient = true;
  } else AutenticatedClient = false;

  return AutenticatedClient;
}
