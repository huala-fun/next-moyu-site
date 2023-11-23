export default async function HuxiuRank() {
  let formData = new FormData();
  formData.append("platform", "www");
  formData.append("pagesize", "50");
  const res = await fetch(
    "https://api-article.huxiu.com/web/article/articleList",
    {
      method: "post",
      body: formData,
    }
  );
  const json = await res.json();
  const list = json.data.dataList;
 
  const data = list.map((item: any, index: number) => {
    return {
      id: `huxiu_${index + 1}`,
      title: item.title,
      link: item.share_url,
      heat: item.formatDate,
    };
  });

  return {
    name: "虎嗅最新文章",
    data: data,
    source: "huxiu",
    id: 7,
    url:"https://www.huxiu.com/article/"
  };
}
