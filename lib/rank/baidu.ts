import * as cheerio from "cheerio";
import { log } from "console";

export default async function BaiduRank() {
  const res = await fetch("https://top.baidu.com/board?tab=realtime");
  const html = await res.text();
  // 使用Cheerio加载HTML
  const $ = cheerio.load(html);
  const list = $(
    "#sanRoot > main > div.container.right-container_2EFJr > div > div:nth-child(2)"
  );
  const data: RankItem[] = [];
  list.children().each(function (index, item) {
    const divs = $(this).children("div");
    // 获取热度
    const heat = $(divs[0]).find("div:nth-child(2)").text();
    const a = $(divs[1]).find("a");
    // 获取链接
    const link = a.attr("href");
    // 获取标题
    const title = a.find("div:nth-child(1)").text();
    data.push({
      id: `baidu_${index + 1}`,
      title,
      link,
      heat: `${(Number(heat) / 10000).toFixed(2)} w`,
    });
  });

  return {
    name: "Baidu热搜",
    data: data,
    source: "baidu",
    id: 5,
  };
}
