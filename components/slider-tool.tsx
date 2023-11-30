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
const SliderTool: React.FC = () => {
  const hasMounted = useHasMounted();
  const { theme, setTheme } = useTheme();
  if (!hasMounted) {
    return null;
  }
  return (
    <div className="fixed right-2 sm:right-5 bottom-12 flex flex-col gap-4">
      <Link href="/">
        <Button size="icon" className="rounded-full">
          <BiHomeAlt className="w-5 h-5" />
        </Button>
      </Link>
      <Link href="/setting">
        <Button size="icon" className="rounded-full">
          <AiOutlineSetting className="w-5 h-5" />
        </Button>
      </Link>
      <Button size="icon" className="rounded-full">
        {theme === "dark" ? (
          <BiSolidSun className="w-5 h-5" onClick={() => setTheme("light")} />
        ) : (
          <BiSolidMoon className="w-5 h-5" onClick={() => setTheme("dark")} />
        )}
      </Button>
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
    </div>
  );
};

export default SliderTool;
