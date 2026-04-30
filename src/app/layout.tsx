import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EasyFrontEnd",
  description: "AI visual frontend/UI designer with DSL-first rendering.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
