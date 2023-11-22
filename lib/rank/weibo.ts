export default async function WeiboRank() {
  const res = await fetch("https://weibo.com/ajax/side/hotSearch");
  const json = await res.json();
  const { realtime = [], hotgovs = [] } = json.data;

  const data = realtime.map(({ target, detail_text = "0" }: any) => {
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
    name: "微博热搜",
    data: data,
    source: "weibo",
    id: 2,
  };
}
