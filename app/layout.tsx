import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Background from "@/components/background";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import SliderTool from "@/components/slider-tool";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "热榜聚合 -  汇聚全网热点",
  description: "忙里偷闲",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <main className="conttainer py-8 px-[5vw]">{children}</main>
          <SliderTool />
          <Background />
          <Analytics />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
