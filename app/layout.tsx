import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { Suspense } from "react";

import Navbar from "@/components/navbar/navbar";
import { getme } from "@/service/getme";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

async function NavbarWrapper() {
  const iuser = await getme();

  return <Navbar iuser={iuser ?? null} />;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <Suspense fallback={<Navbar iuser={null} />}>
          <NavbarWrapper />
        </Suspense>

        <Toaster position="top-right" richColors />

        {children}
      </body>
    </html>
  );
}
