export default async function ZhihuRank() {
  const res = await fetch(
    "https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total?limit=50&desktop=true",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const json = await res.json();
  const data = json.data.map(({ target, detail_text = "0" }: any) => {
    // https://www.zhihu.com/question/631267312
    const { id, title } = target;
    const heat = Number(detail_text.match(/\d+/));
    const link = `https://www.zhihu.com/question/${id}`;
    return {
      id,
      title,
      link,
      heat: heat ? heat + " 万" : "累计中",
    };
  });
  return {
    name: "知乎热榜",
    data: data,
    source: "zhihu",
    id: 1
  };
}
