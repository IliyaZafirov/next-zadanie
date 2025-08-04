import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "System",
  viewport:
    "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
