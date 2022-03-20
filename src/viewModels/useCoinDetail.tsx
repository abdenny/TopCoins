import type { Asset, Rate, CoinDetailModelInterface } from 'types';

import { useParams } from 'react-router-dom';
import { oneCryptoAsset, oneCryptoRate } from 'api';
import useFetch from 'hooks/useFetch';

const useCoinDetail = (): CoinDetailModelInterface => {
  const { coinId } = useParams();
  if (!coinId) {
    // TODO: Convert to a redirect or error message to handle more gracefully
    throw new Error('A coinId is required to access this page');
  }

  const {
    data: coinDetailData,
    error: coinDetailError,
    loading: coinDetailLoading,
  } = useFetch<Asset>(oneCryptoAsset(coinId));

  const {
    data: RateDetailData,
    error: RateDetailError,
    loading: RateDetailLoading,
  } = useFetch<Rate>(oneCryptoRate(coinId));

  return {
    coinDetail: coinDetailData,
    isCoinDetailLoading: coinDetailLoading,
    rateDetail: RateDetailData,
    isRateDetailLoading: RateDetailLoading,
  };
};

export default useCoinDetail;
