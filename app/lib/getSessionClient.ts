import { getServerSession } from "next-auth";
import { authOptions } from "../utils/auth";
export default async function clientSessionId() {
  const session = await getServerSession(authOptions);

  return session;
}
