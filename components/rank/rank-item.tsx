import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
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
        "flex flex-col  hover:shadow-sm hover:shadow-slate-400 ",
        className
      )}>
      <CardHeader className="p-4 pt-2 pb-2 ">
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

      <CardContent className="w-full flex-col p-4 pr-2 pt-2 overflow-hidden">
        <ScrollArea className=" h-[350px] pr-4 w-full">
          <div className="w-full flex flex-col gap-2">
            {rank?.data?.map((item, index) => (
              <Link key={item.id} href={item.link} target="_blank">
                <div className="flex items-center gap-1 text-sm prose dark:prose-invert  hover:bg-gray-200 dark:hover:bg-slate-600 hover:rounded-sm px-1 hover:cursor-pointer">
                  <span
                    className={cn(
                      "flex items-center justify-center bg-slate-100 dark:bg-slate-900 rounded-md w-5 h-5 flex-shrink-0 ",
                      index < 3 ? "text-white" : "",
                      index === 0
                        ? "bg-red-500 dark:bg-red-500 text-white"
                        : index === 1
                        ? "bg-orange-500 dark:bg-orange-500"
                        : index === 2
                        ? "bg-yellow-500 dark:bg-yellow-500"
                        : ""
                    )}>
                    {index + 1}
                  </span>
                  <span>{item.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
