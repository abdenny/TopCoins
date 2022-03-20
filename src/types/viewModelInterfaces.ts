import type { CryptoAssets, CryptoAsset } from 'types';

export interface TopAssetsModelInterface {
  topCoins?: CryptoAssets;
  isTopCoinsLoading: boolean;
  coinDetail?: CryptoAsset;
  isCoinDetailLoading: boolean;
  resetCoinDetail: () => void;
  calculateUsdValue: (assetAmount: string) => string;
}
