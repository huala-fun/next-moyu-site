export default async function QQNewsRank() {
  let data = [];
  try {
    const res = await fetch(
      "https://i.news.qq.com/trpc.qqnews_web.kv_srv.kv_srv_http_proxy/NinjaPageContentSync?pull_urls=news_top_2018"
    );
    const json = await res.json();
    const rankList = json.data;
    data = rankList.map((item: any, index: number) => {
      const { title, url } = item;
      return {
        id: `tengxun_hot_${index + 1}`,
        title: title,
        link: url,
        heat: null,
      };
    });
  } catch (e) {}
  return {
    name: "腾讯热点榜",
    data,
    source: "tengxun",
    id: 11,
    url:"https://news.qq.com/"
  };
}
