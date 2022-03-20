import type { CryptoAssets, TopAssetsModelInterface } from 'types';

import { topCryptoAssets } from 'api';
import useFetch from 'hooks/useFetch';

const useTopCoins = (): TopAssetsModelInterface => {
  const {
    data: cryptoAssetsData,
    error: cryptoAssetsError,
    loading: cryptoAssetsLoading,
  } = useFetch<CryptoAssets>(topCryptoAssets());

  return {
    topCoins: cryptoAssetsData,
    isTopCoinsLoading: !cryptoAssetsData,
  };
};

export default useTopCoins;
