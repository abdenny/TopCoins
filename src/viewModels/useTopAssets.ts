import type { CryptoAssets, TopAssetsModelInterface } from 'types';
import { GET_CRYPTO_ASSETS } from 'api';
import useFetch from 'hooks/useFetch';

const useTopAssets = (): TopAssetsModelInterface => {
  const {
    data: cryptoAssetsData,
    error: cryptoAssetsError,
    loading: cryptoAssetsLoading,
  } = useFetch<CryptoAssets>(GET_CRYPTO_ASSETS);

  return {
    topAssets: cryptoAssetsData || [],
    isTopAssetsLoading: !cryptoAssetsData,
  };
};

export default useTopAssets;
