export interface Asset {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
}

export interface CryptoAsset {
  data: Asset;
  timestamp: number;
}
export interface CryptoAssets {
  data: Array<Asset>;
  timestamp: number;
}
