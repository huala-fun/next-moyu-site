export const handleUpdateRankById = (id: number, setHotRankData: any) => {
  setHotRankData((prev: any) => {
    const newState = [...prev];
    newState[id].refresh = true;
    return newState;
  });
  fetch("/api/hot-rank?id=" + id)
    .then((res) => res.json())
    .then(({ code = 0, data = [] }) => {
      if (code == 1) {
        setHotRankData((prev: any) => {
          const newState = [...prev];
          newState[id] = data;
          return newState;
        });
      }
    })
    .finally(() => {
      setHotRankData((prev: any) => {
        const newState = [...prev];
        newState[id].refresh = false;
        return newState;
      });
    });
};
