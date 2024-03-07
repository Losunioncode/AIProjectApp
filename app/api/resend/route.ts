import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import EmailTemplate from "@/components/EmailTemplate/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const reqData = await req.json();
    const customerOrderLink = reqData?.data.customerOrderLink;
    const customerEmail = reqData?.data.customerEmail;
    const data = await resend.emails.send({
      from: "LightCustomInvoice <onboarding@resend.dev>",
      to: [customerEmail],
      subject: "Customer Invoice Details",
      react: EmailTemplate({ CustomerData: customerOrderLink }),
    });

    return NextResponse.json(data);
  } catch (err) {
    let errorMessage = "The error has occured: ";
    if (err instanceof Error) {
      errorMessage += err.message;
    }

    throw new Error(errorMessage);
  }
}
