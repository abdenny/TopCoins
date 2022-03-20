import type { CryptoAssets, Asset, Rate } from 'types';

export interface TopAssetsModelInterface {
  topCoins?: CryptoAssets;
  isTopCoinsLoading: boolean;
}

export interface CoinDetailModelInterface {
  coinDetail?: Asset;
  isCoinDetailLoading: boolean;
  rateDetail?: Rate;
  isRateDetailLoading: boolean;
}
