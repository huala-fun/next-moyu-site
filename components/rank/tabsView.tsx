import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RankView from "./rank-item";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { RankSkeleton } from "./rank-skeleton";

/**
 * 标签方式切换热榜
 * @param param0
 * @returns
 */
export function TabsView({
  rankList,
  setHotRankData,
}: {
  rankList: Rank[];
  setHotRankData: any;
}) {
  return rankList.length == 0 ? (
    <RankSkeleton />
  ) : (
    <Tabs
      defaultValue={rankList[0].name}
      className="h-full  flex-col flex  sm:hidden">
      <div className="m-0 flex-1 overflow-hidden">
        {rankList.map((item, index) => (
          <TabsContent key={index} value={item.name} className="h-full m-0">
            <RankView
              className="h-full"
              rank={item}
              index={index}
              setHotRankData={setHotRankData}
            />
          </TabsContent>
        ))}
      </div>
      <ScrollArea>
        <TabsList className="flex items-center h-12">
          {rankList.map((item, index) => (
            <TabsTrigger key={index} value={item.name}>
              {item.name}
            </TabsTrigger>
          ))}
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Tabs>
  );
}
