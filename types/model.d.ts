interface RankItem {
  id: number;
  title: string;
  link: string;
  heat: number;
}

interface Rank {
  id: number;
  name: string;
  data: RankItem[];
}
