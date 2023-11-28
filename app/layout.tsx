import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Background from "@/components/background";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import StyledComponentsRegistry from "@/components/AntdRegistry";
import { cn } from "@/lib/utils";
import CustomConfigProvider from "@/components/config-provider";
import SliderTool from "@/components/slider-tool";
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
    <html lang="en">
      <body className={cn(inter.className)}>
        <StyledComponentsRegistry>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <CustomConfigProvider>
              <main className="py-8 px-[5vw]">{children}</main>
            </CustomConfigProvider>
            <SliderTool />
            <Background />
            <Analytics />
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
