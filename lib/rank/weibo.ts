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
      heat: item.icon_desc,
    });
  });

  realtime.forEach((item: any) => {
    const { word_scheme, rank, word, raw_hot } = item;
    data.push({
      id: `weibo_${rank + 1}`,
      title: word,
      link: `https://s.weibo.com/weibo?q${word_scheme}`,
      heat: `${(raw_hot / 10000).toFixed(2)}  万`,
    });
  });

  return {
    name: "微博热搜",
    data: data,
    source: "weibo",
    id: 2,
  };
}
