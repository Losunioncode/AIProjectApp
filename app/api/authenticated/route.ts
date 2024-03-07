import { sessionClient } from "@/app/lib/sessionClientUser";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await sessionClient();
  return NextResponse.json({ auth: session });
}
