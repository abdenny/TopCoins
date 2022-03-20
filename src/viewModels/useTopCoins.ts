import type { CryptoAsset, Rate, CryptoAssets, TopAssetsModelInterface } from 'types';
import { topCryptoAssets, oneCryptoAsset, oneCryptoRate } from 'api';
import useFetch from 'hooks/useFetch';
import { useSelectParam } from 'hooks/useSearchParamHelpers';

const useTopCoins = (): TopAssetsModelInterface => {
  const coinDetailParam = useSelectParam('coinDetail');

  const {
    state: { data: topCoinsData, error: topCoinsError, loading: topCoinsLoading },
  } = useFetch<CryptoAssets>(topCryptoAssets());

  const {
    state: { data: coinDetailData, error: coinDetailError, loading: coinDetailLoading },
    reset: resetCoinDetail,
    // When there is no coinDetailParam, we don't want to fetch the detail data.
  } = useFetch<CryptoAsset>(oneCryptoAsset(coinDetailParam), { isDisabled: !coinDetailParam });

  const {
    state: { data: RateDetailData, error: RateDetailError, loading: RateDetailLoading },
    reset: resetRateDetail,
    // When there is no coinDetailParam, we don't want to fetch the rate data.
  } = useFetch<Rate>(oneCryptoRate(coinDetailParam), { isDisabled: !coinDetailParam });

  return {
    topCoins: topCoinsData,
    isTopCoinsLoading: topCoinsLoading,
    coinDetail: coinDetailData,
    isCoinDetailLoading: coinDetailLoading,
    resetCoinDetail,
    rateDetail: RateDetailData,
    isRateDetailLoading: RateDetailLoading,
    resetRateDetail,
  };
};

export default useTopCoins;
