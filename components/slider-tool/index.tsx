"use client";
import { Calendar as CalendarIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { useState } from "react";
import { Calendar } from "../ui/calendar";
import { zhCN } from "date-fns/locale";
import useHasMounted from "@/hook/use-has-mounted";
import { Button } from "../ui/button";

export default function SliderTool() {
  const hasMounted = useHasMounted();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { theme, setTheme } = useTheme();

  return (
    hasMounted && (
      <div className="fixed right-1 top-1/2 flex  flex-col gap-2 ">
        <Button size="icon" variant="outline">
          {theme === "dark" ? (
            <SunIcon onClick={() => setTheme("light")} />
          ) : (
            <MoonIcon onClick={() => setTheme("dark")} />
          )}
        </Button>
        <HoverCard >
          <HoverCardTrigger>
            <Button size="icon" variant="outline" className="hidden md:flex">
              <CalendarIcon />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="p-0">
            <div>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="border-none"
                locale={zhCN}
              />
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    )
  );
}
