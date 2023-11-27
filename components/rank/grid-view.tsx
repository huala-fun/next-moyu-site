import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RankView from "./rank-item";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { RankSkeleton } from "./rank-skeleton";

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
    <div className="grid flex-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-5">
      {rankList.map((item, index) =>
        item.isLoadData ? (
          <RankSkeleton key={index} />
        ) : (
          <RankView
            key={index}
            rank={item}
            index={index}
            setHotRankData={setHotRankData}
          />
        )
      )}
    </div>
  );
}
