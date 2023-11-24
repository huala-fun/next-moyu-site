import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";
import { Button } from "../ui/button";
import { UpdateIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { handleUpdateRankById } from "./util";

export default function RankView({
  rank,
  index,
  setHotRankData,
  className,
}: {
  rank: Rank;
  index: number;
  setHotRankData: any;
  className?: string;
}) {
  return (
    <Card
      key={rank.id}
      className={cn(
        "flex flex-col max-sm:border-none max-sm:rounded-none",
        className
      )}>
      <CardHeader className="p-4 pt-2 pb-2 border-b border-slate-200 dark:border-slate-700">
        <CardTitle className="flex gap-2 items-center">
          <Image src={`/${rank.source}.ico`} alt="" width={20} height={20} />
          {!rank.url ? (
            <span className="dark:text-slate-400"> {rank.name}</span>
          ) : (
            <Link
              target="_blank"
              href={rank.url}
              className="dark:text-slate-400">
              {rank.name}
            </Link>
          )}
          <Button
            variant="link"
            size="icon"
            className="ml-auto"
            onClick={() => handleUpdateRankById(index, setHotRankData)}>
            <UpdateIcon className={rank.refresh ? "animate-spin" : ""} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="max-sm:flex w-full max-sm:flex-1 flex-col p-4 pr-2 pt-2 overflow-hidden">
        <ScrollArea className="max-sm:flex-1 sm:h-[300px] pr-4 w-full">
          <div className="w-full">
            {rank.data.map((item, index) => (
              <Link key={item.id} href={item.link} target="_blank">
                <div className="flex gap-1 justify-between prose dark:prose-invert dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-600 hover:rounded-sm px-1 hover:cursor-pointer">
                  <span className={cn("text-sm")}>
                    <span
                      className={
                        index === 0
                          ? "text-red-500"
                          : index === 1
                          ? "text-orange-500"
                          : index === 2
                          ? "text-yellow-500"
                          : ""
                      }>
                      {index + 1}. &nbsp;
                    </span>
                    {item.title}
                  </span>
                  <span className="flex items-center flex-shrink-0 text-xs text-slate-400">
                    {item.heat}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
