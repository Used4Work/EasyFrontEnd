import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EasyFrontEnd",
  description: "可视化前端/UI 编辑器，AI 用于辅助生成和优化。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
