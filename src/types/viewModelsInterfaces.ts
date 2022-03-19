import type { CryptoAssets } from 'types';

export interface TopAssetsModelInterface {
  topAssets: CryptoAssets | [];
  isTopAssetsLoading: boolean;
}
