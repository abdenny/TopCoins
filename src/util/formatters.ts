export const toUsdFormat = (value: string): string => {
  return parseFloat(value)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const percentFormat = (value: string): number => {
  return parseFloat(parseFloat(value).toFixed(4));
};
