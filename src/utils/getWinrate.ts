export const getWinrate = (wins: number, losses: number) => {
  if (wins + losses === 0) {
    return 0;
  }
  return (wins / (wins + losses)) * 100;
};
