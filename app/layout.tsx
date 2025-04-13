import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans } from "next/font/google";

import { ThemeProvider } from "next-themes";

import { cn } from "@/lib/utils";

const fontSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "lunch_connect",
  description:
    "A healthcare patient management System designed to streamline patient registration, appointment scheduling, and medical records management for healthcare providers.",
  icons: {
    icon: "/assets/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      <body
       className={cn("min-h-screen antialiased", fontSans.variable)} >
      

          {children}

      </body>
    </html>
  );
}
