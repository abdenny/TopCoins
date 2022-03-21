import type { CryptoAsset, CryptoAssets, TopAssetsModelInterface } from 'types';
import { topCryptoAssets, oneCryptoAsset } from 'api';
import useFetch from 'hooks/useFetch';
import { useSelectParam } from 'hooks/useSearchParamHelpers';

const useTopCoins = (): TopAssetsModelInterface => {
  const coinDetailParam = useSelectParam('coinDetail');

  // TODO: Set up error handling in model
  const {
    state: {
      data: topCoinsData,
      // error: topCoinsError,
      loading: topCoinsLoading,
    },
  } = useFetch<CryptoAssets>(topCryptoAssets());

  const {
    state: {
      data: coinDetailData,
      // error: coinDetailError,
      loading: coinDetailLoading,
    },
    reset: resetCoinDetail,
    // When there is no coinDetailParam, we don't want to fetch the detail data.
  } = useFetch<CryptoAsset>(oneCryptoAsset(coinDetailParam), { isDisabled: !coinDetailParam });

  const calculateUsdValue = (assetAmount: string): string => {
    const usdValue = (
      parseFloat(assetAmount) * parseFloat(coinDetailData?.data.priceUsd ?? '')
    ).toFixed(2);
    return usdValue;
  };

  return {
    topCoins: topCoinsData,
    isTopCoinsLoading: topCoinsLoading,
    coinDetail: coinDetailData,
    isCoinDetailLoading: coinDetailLoading,
    resetCoinDetail,
    calculateUsdValue,
  };
};

export default useTopCoins;
