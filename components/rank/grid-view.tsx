"use client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { handleUpdateRankById } from "./util";
import { Button, Card, Tooltip, Skeleton } from "antd";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";

/**
 * grid 布局
 *
 * @param param0
 * @returns
 */
export function GridView({
  rankList,
  setHotRankData,
}: {
  rankList: Rank[];
  setHotRankData: any;
}) {
  return (
    <div className="grid flex-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-5">
      {rankList.map((item, index) => (
        <Card
          key={`card_${index}`}
          className="border border-slate-100 dark:border-none"
          hoverable
          title={
            <div className="flex items-center gap-2">
              <Image
                src={`/${item.source}.ico`}
                alt=""
                width={20}
                height={20}
              />
              {!item.url ? (
                <span className="dark:text-slate-400"> {item.name}</span>
              ) : (
                <Link
                  target="_blank"
                  href={item.url}
                  className="dark:text-slate-400">
                  {item.name}
                </Link>
              )}
            </div>
          }
          bordered={false}
          extra={
            <Tooltip title="刷新内容">
              <Button
                shape="circle"
                icon={item.refresh ? <LoadingOutlined /> : <ReloadOutlined />}
                onClick={() =>
                  handleUpdateRankById(index, setHotRankData)
                }></Button>
            </Tooltip>
          }>
          <Skeleton
            loading={item.isLoadData || item.refresh}
            className="h-[350px]"
            paragraph={{ rows: 10 }}>
            <div className="h-[350px] pr-4 w-full flex flex-col gap-3 overflow-hidden hover:overflow-y-auto">
              {item?.data?.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => window.open(item.link, "_blank")}
                  className="flex items-center gap-1 text-sm prose dark:prose-invert px-1 hover:cursor-pointer">
                  <span
                    className={cn(
                      "flex items-center justify-center bg-slate-100 dark:bg-slate-900 rounded-md w-6 h-6 flex-shrink-0",
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
                  <span className="move-right-animate">{item.title}</span>
                </div>
              ))}
            </div>
          </Skeleton>
        </Card>
      ))}
    </div>
  );
}
