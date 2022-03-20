export interface Rate {
  data: {
    id: string;
    symbol: string;
    currencySymbol: string;
    type: string;
    rateUsd: string;
  };
  timestamp: number;
}
