import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Background from "@/components/background";
import { ThemeProvider } from "@/components/theme-provider";
import SliderTool from "@/components/slider-tool";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "摸鱼计划",
  description: "摸鱼工具",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <main className="container  p-4 sm:px-12">{children}</main>
          <Background />
          <SliderTool />
        </ThemeProvider>
      </body>
    </html>
  );
}
