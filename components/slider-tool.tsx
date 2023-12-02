"use client";
import { useTheme } from "next-themes";
import useHasMounted from "@/hook/use-has-mounted";
import { AiOutlineSetting } from "react-icons/ai";
import { Button } from "./ui/button";
import {
  BiArrowToTop,
  BiSolidSun,
  BiSolidMoon,
  BiHomeAlt,
} from "react-icons/bi";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TooltipString = ({
  children,
  tooltip,
}: {
  children: React.ReactNode;
  tooltip: string;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const SliderTool: React.FC = () => {
  const hasMounted = useHasMounted();
  const { theme, setTheme } = useTheme();
  if (!hasMounted) {
    return null;
  }
  return (
    <div className="fixed right-2 sm:right-5 bottom-12 flex flex-col gap-4">
      <TooltipString tooltip="主页">
        <Link href="/">
          <Button size="icon" className="rounded-full">
            <BiHomeAlt className="w-5 h-5" />
          </Button>
        </Link>
      </TooltipString>
      <TooltipString tooltip="网站设置">
        <Link href="/setting">
          <Button size="icon" className="rounded-full">
            <AiOutlineSetting className="w-5 h-5" />
          </Button>
        </Link>
      </TooltipString>
      <TooltipString tooltip="主题切换">
        <Button size="icon" className="rounded-full">
          {theme === "dark" ? (
            <BiSolidSun className="w-5 h-5" onClick={() => setTheme("light")} />
          ) : (
            <BiSolidMoon className="w-5 h-5" onClick={() => setTheme("dark")} />
          )}
        </Button>
      </TooltipString>
      <TooltipString tooltip="回到顶部">
        <Button
          size="icon"
          className="rounded-full"
          onClick={() =>
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            })
          }>
          <BiArrowToTop className="w-5 h-5" />
        </Button>
      </TooltipString>
    </div>
  );
};

export default SliderTool;
