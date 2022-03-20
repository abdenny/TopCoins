import type { CryptoAssets, CryptoAsset, Rate } from 'types';

export interface TopAssetsModelInterface {
  topCoins?: CryptoAssets;
  isTopCoinsLoading: boolean;
  coinDetail?: CryptoAsset;
  isCoinDetailLoading: boolean;
  resetCoinDetail: () => void;
  rateDetail?: Rate;
  isRateDetailLoading: boolean;
  resetRateDetail: () => void;
}
