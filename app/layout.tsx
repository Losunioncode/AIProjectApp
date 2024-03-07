import React from "react";
import type { Metadata } from "next";
import { Gabarito } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { sessionClient } from "./lib/sessionClientUser";
import ReduxProvider from "./ProviderRedux/ReduxProvider";

import { Provider } from "react-redux";
import "./globals.css";
import { useEffect } from "react";
const authtenticated = sessionClient();

const inter = Gabarito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReduxProvider>
        <body className={inter.className}>
          <Toaster />
          {children}
        </body>
      </ReduxProvider>
    </html>
  );
}
