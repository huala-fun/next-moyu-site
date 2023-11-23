interface RankItem {
  id: any;
  title: any;
  link: any;
  heat: any;
}

interface Rank {
  id: number;
  name: string;
  data: RankItem[];
  source: string;
  refresh: boolean;
}
