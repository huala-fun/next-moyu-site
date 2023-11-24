export const handleUpdateRankById = async (id: number, setHotRankData: any) => {
  try {
    setHotRankData((prev: any) => {
      const newState = [...prev];
      newState[id].refresh = true;
      return newState;
    });
    const res = await fetch("/api/hot-rank?id=" + id);
    const { code = 0, data = [] } = await res.json();
    if (code == 1) {
      setHotRankData((prev: any) => {
        const newState = [...prev];
        newState[id].data = data;
        return newState;
      });
    }
  } finally {
    setHotRankData((prev: any) => {
      const newState = [...prev];
      newState[id].refresh = false;
      return newState;
    });
  }
};
