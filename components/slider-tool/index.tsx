"use client";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import useHasMounted from "@/hook/use-has-mounted";
import { SettingOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";

const App: React.FC = () => {
  const hasMounted = useHasMounted();
  const { theme, setTheme } = useTheme();
  if (!hasMounted) {
    return null;
  }

  return (
    <FloatButton.Group type="primary" shape="circle" style={{ right: 24 }}>
      <FloatButton.Group
        style={{ right: 24, bottom: 96 }}
        trigger="hover"
        icon={<SettingOutlined />}>
        <FloatButton
          className="flex items-center justify-center"
          type="primary"
          icon={
            theme === "dark" ? (
              <SunIcon className="w-5 h-5" onClick={() => setTheme("light")} />
            ) : (
              <MoonIcon className="w-5 h-5" onClick={() => setTheme("dark")} />
            )
          }
        />
      </FloatButton.Group>
      <FloatButton.BackTop visibilityHeight={0} />
    </FloatButton.Group>
  );
};

export default App;
