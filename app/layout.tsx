import type { Metadata } from "next";
import { LayoutProps } from "../.next/types/app/layout";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bix Front end test",
  description: "Developed by Carlos Ceagah",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
