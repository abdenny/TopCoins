import type { CryptoAssets, AssetDetailModelInterface } from 'types';

import { topCryptoAssets } from 'api';
import useFetch from 'hooks/useFetch';

const useAssetDetail = (): AssetDetailModelInterface => {
  return {
    assetDetail: {},
  };
};

export default useAssetDetail;
