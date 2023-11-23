import * as cheerio from "cheerio";

export default async function HupuBuxinjieRank() {
  const res = await fetch("https://bbs.hupu.com/all-gambia");
  const html = await res.text();
  const $ = cheerio.load(html);
  const list = $(
    "#container > div > div.bbs-index-web-holder > div > div.bbs-index-web-middle > div > div.text-list-model > div > div > div"
  );
  const data: any = [];
  list.each(function (index) {
    const a = $(this).find(".t-info > a");
    console.log();
    const title = a.text();
    const link = a.attr("href");
    const heat = $(this).find(".t-info > span").text();
    data.push({
      id: `hupu_buxingjie_${index + 1}`,
      title,
      link: `https://bbs.hupu.com/${link}`,
      heat,
    });
  });

  return {
    name: "虎扑步行街",
    data,
    source: "hupu",
    id: 6,
  };
}
