export const meta = {
  name: "快手热榜",
  source: "kuaishou",
  url: "https://www.kuaishou.com/?isHome=1",
};


// Unicode 解码
const decodedString = (encodedString: string) => {
  return encodedString.replace(/\\u([\d\w]{4})/gi, (match, grp) =>
    String.fromCharCode(parseInt(grp, 16))
  );
};

// 数据处理
const getData = (data: string) => {
  if (!data) return [];
  const dataList: any[] = [];
  try {
    const pattern = /window.__APOLLO_STATE__=(.*);\(function\(\)/s;
    const idPattern = /clientCacheKey=([A-Za-z0-9]+)/s;
    const matchResult = data.match(pattern) || "";
    const jsonObject = JSON.parse(matchResult[1])["defaultClient"];
    // 获取所有分类
    const allItems =
      jsonObject['$ROOT_QUERY.visionHotRank({"page":"home"})']["items"];
    // 遍历所有分类
    allItems.forEach((v: any) => {
      // 基础数据
      const image = jsonObject[v.id]["poster"];
      const id = image.match(idPattern)[1];
      // 数据处理
      dataList.push({
        title: jsonObject[v.id]["name"],
        pic: decodedString(image),
        hot: jsonObject[v.id]["hotValue"],
        url: `https://www.kuaishou.com/short-video/${id}`,
        mobileUrl: `https://www.kuaishou.com/short-video/${id}`,
      });
    });
    return dataList;
  } catch (error) {
    console.error("数据处理出错" + error);
    return false;
  }
};

export async function Rank() {
  const res = await fetch("https://www.kuaishou.com/?isHome=1", {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E302 Safari/604.1",
    },
  });
  const html = await res.text();
  getData(html);
  return html;
}
