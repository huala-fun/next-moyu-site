interface RankItem {
  id: string;
  title: string;
  link: string;
  heat: string;
  heatType?: "img" | "text";
}

interface Rank {
  id: number;
  name: string;
  data: RankItem[];
  source: string;
}
