export default async function BiliBiliRank() {
  const res = await fetch(
    "https://api.bilibili.com/x/web-interface/wbi/search/square?limit=50",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const json = await res.json();
  const list = json.data.trending.list;
  const data = list.map((item: any, index: number) => {
    return {
      id: `bilibili_${index + 1}`,
      title: item.keyword,
      link: `https://search.bilibili.com/all?keyword=${item.keyword}`,
      heat: "",
    };
  });

  return {
    name: "BiliBili热搜",
    data: data,
    source: "bilibili",
    id: 1,
  };
}
