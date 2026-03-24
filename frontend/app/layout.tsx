import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import AppShell from "./_components/layout/AppShell";
import Providers from "./Providers";

export const metadata: Metadata = {
  title: "Users [MERN]",
  description:
    "this is MERN stack work with mongooDB, Express, Next and nodejs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Toaster />
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
