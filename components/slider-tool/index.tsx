"use client";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import useHasMounted from "@/hook/use-has-mounted";
import { FloatButton } from "antd";
import { SettingOutlined } from "@ant-design/icons";

const App: React.FC = () => {
  const hasMounted = useHasMounted();
  const { theme, setTheme } = useTheme();
  if (!hasMounted) {
    return null;
  }

  return (
    <FloatButton.Group
      type="primary"
      shape="circle"
      className="right-3 sm:right-6">
      <FloatButton
        onClick={() => window.open("/setting", "_blank")}
        type="primary"
        icon={<SettingOutlined />}
      />
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
      <FloatButton.BackTop type="primary" visibilityHeight={0} />
    </FloatButton.Group>
  );
};

export default App;
