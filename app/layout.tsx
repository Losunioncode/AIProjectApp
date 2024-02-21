import type { Metadata } from "next";
import { Gabarito } from "next/font/google";
import StoreProvider from "./StoreProvider";
import "./globals.css";

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
    <StoreProvider>
      <html lang="en">
        
          <body className={inter.className} >{children}</body>
      </html>
    </StoreProvider>

  );
}
