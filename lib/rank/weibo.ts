export default async function WeiboRank() {
  const res = await fetch("https://weibo.com/ajax/side/hotSearch");
  const json = await res.json();
  const { realtime = [], hotgovs = [] } = json.data;

  const data: RankItem[] = [];

  hotgovs.forEach((item: any) => {
    data.push({
      id: `weibo_gov_${item.rank}`,
      title: item.word,
      link: item.url,
      heat: "国家新闻",
    });
  });

  realtime.forEach((item: any) => {
    const { rank, word, raw_hot } = item;
    data.push({
      id: `weibo_${rank + 1}`,
      title: word,
      link: `https://s.weibo.com/weibo?q=${word}`,
      heat: `${(raw_hot / 10000).toFixed(2)} w`,
    });
  });

  return {
    name: "微博热搜",
    data: data,
    source: "weibo",
    id: 2,
  };
}
