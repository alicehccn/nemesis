import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Outpost",
  description: "Alice Huang's Outpost",
  icons: {
    icon: "../logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
