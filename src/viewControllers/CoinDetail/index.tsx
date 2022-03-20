import useCoinDetail from 'viewModels/useCoinDetail';

import View from './view';

const CoinDetailController = (): JSX.Element => {
  const { coinDetail, isCoinDetailLoading, rateDetail } = useCoinDetail();
  console.log('coin', coinDetail);
  console.log('rate', rateDetail);

  return <View />;
};
export default CoinDetailController;
