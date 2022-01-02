export const getWinrate = (wins: number, losses: number, precision: number) => {
  if (wins + losses === 0) {
    return 0;
  }
  return ((wins / (wins + losses)) * 100).toFixed(precision);
};
