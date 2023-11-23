import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

export function RankSkeleton() {
  return (
    <Card>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <Skeleton className="w-8 h-8" style={{ borderRadius: "50%" }} />
            <Skeleton className="w-20 h-4" />
          </div>
          <Skeleton className="w-4 h-4" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pr-2 pt-2">
        <ScrollArea className="h-[300px] pr-4">
          <ul className="flex flex-col gap-2">
            {Array.from({ length: 20 }).map((item, index) => (
              <Skeleton key={index} className="w-full h-4" />
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
