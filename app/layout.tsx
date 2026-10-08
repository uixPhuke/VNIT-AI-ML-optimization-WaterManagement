import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Application of AI, ML & Optimization in Water Management",
  description: "Two-day workshop on the application of AI, ML and optimization in water management at VNIT Nagpur."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
