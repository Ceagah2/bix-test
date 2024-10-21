import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Bix Front end test",
  description: "Developed by Carlos Ceagah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
