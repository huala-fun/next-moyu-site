"use client";
import { App, ConfigProvider, theme as antdTheme } from "antd";
import * as React from "react";
import { type ThemeProviderProps } from "next-themes/dist/types";
import zhCN from "antd/locale/zh_CN";
import { useTheme } from "next-themes";

export default function CustomConfigProvider({ children }: ThemeProviderProps) {
  const { theme } = useTheme();
  return (
    <ConfigProvider
      theme={{
        algorithm: [
          theme == "dark"
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
          antdTheme.compactAlgorithm,
        ],
      }}
      locale={zhCN}>
      <App>{children}</App>
    </ConfigProvider>
  );
}
