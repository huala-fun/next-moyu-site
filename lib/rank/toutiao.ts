export default async function ToutiaoRank() {
  const res = await fetch(
    "https://www.toutiao.com/hot-event/hot-board/?origin=toutiao_pc"
  );
  const json = await res.json();
  const { data: data_ = [], fixed_top_data = [] } = json;
  const data: RankItem[] = [];

  fixed_top_data.forEach((item: any, index: number) => {
    const { Title, Url, HotValue } = item;
    data.push({
      id: `toutiao_gov_${index + 1}`,
      title: Title,
      link: Url,
      heat: `国家新闻`,
    });
  });

  data_.forEach((item: any, index: number) => {
    const { Title, Url, HotValue } = item;
    data.push({
      id: `toutiao_${index + 1}`,
      title: Title,
      link: Url,
      heat: `${(HotValue / 10000).toFixed(2)}  万`,
    });
  });

  return {
    name: "头条热搜",
    data: data,
    source: "toutiao",
    id: 4,
  };
}
