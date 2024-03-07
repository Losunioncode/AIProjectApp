import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import SignInForm from "@/components/SignInForm";
import { Toaster } from "@/components/ui/toaster";

import { getServerSession } from "next-auth";
import { authOptions } from "../utils/auth";

import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect("/dashboard");
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center ">
      <Card>
        <CardHeader>
          <CardTitle>Please sign in</CardTitle>
          <CardDescription>
            To access the private route you have to be authenticated
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col ">
            <SignInForm />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
