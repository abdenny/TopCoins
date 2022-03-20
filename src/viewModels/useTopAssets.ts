import type { CryptoAssets, TopAssetsModelInterface } from 'types';

import { topCryptoAssets } from 'api';
import useFetch from 'hooks/useFetch';

const useTopAssets = (): TopAssetsModelInterface => {
  const {
    data: cryptoAssetsData,
    error: cryptoAssetsError,
    loading: cryptoAssetsLoading,
  } = useFetch<CryptoAssets>(topCryptoAssets());

  return {
    topAssets: cryptoAssetsData,
    isTopAssetsLoading: !cryptoAssetsData,
  };
};

export default useTopAssets;
