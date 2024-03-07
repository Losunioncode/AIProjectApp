"use client";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

import { useToast } from "./ui/use-toast";
import { useState } from "react";
import { signIn } from "next-auth/react";

const SignInForm = () => {
  const [email, setEmail] = useState<null | string>(null);
  const { toast } = useToast();
  async function signInWithEmail() {
    const signInResult = await signIn("email", {
      email: email,

      callbackUrl: `${window.location.origin}/process`,
      redirect: false,
    });

    toast({
      title: "The link has been sent ",
      description: "Please check your email , to continue the process",
    });
  }

  return (
    <form action={signInWithEmail}>
      <div className="flex flex-col gap-y-2">
        <Label>Email</Label>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="example@LemonSquzzy.com"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-950 mt-[45px] text-white rounded-[6px] w-full px-[65px] py-[11px] "
      >
        Sign in
      </button>
    </form>
  );
};

export default SignInForm;
