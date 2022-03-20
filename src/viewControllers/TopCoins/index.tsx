import { useState, useEffect } from 'react';
import useTopCoins from 'viewModels/useTopCoins';
import useDebounce from 'hooks/useDebounce';
import { useSelectParam, useRemoveParam } from 'hooks/useSearchParamHelpers';

import View from './view';

const TopCoinsController = (): JSX.Element => {
  const {
    topCoins,
    isTopCoinsLoading,
    coinDetail,
    isCoinDetailLoading,
    resetCoinDetail,
    rateDetail,
    isRateDetailLoading,
    resetRateDetail,
  } = useTopCoins();

  // Start Modal Logic
  const coinDetailParam = useSelectParam('coinDetail');
  const removeParam = useRemoveParam('coinDetail');

  const [isViewingDetailModal, setIsViewingDetailModal] = useState(false);

  useEffect(() => {
    setIsViewingDetailModal(!!coinDetailParam);
  }, [coinDetailParam]);

  // Removing the param from the url will close the modal because of the useEffect above. Reset VM data so when another values is selected, the modal will not flash old data as it fetches the new coin.
  const closeDetailModal = (): void => {
    removeParam();
    resetCoinDetail();
    resetRateDetail();
  };

  // Start Filter Logic
  const [filterText, setFilterText] = useState('');

  const debouncedFilterText = useDebounce(filterText, 200);

  const handleFilterText = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFilterText(e.target.value);
  };

  const filteredTopCoins = topCoins?.data.filter(
    (coin) =>
      coin.name.toLowerCase().includes(debouncedFilterText.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(debouncedFilterText.toLowerCase())
  );
  return (
    <View
      topCoins={filterText ? filteredTopCoins : topCoins?.data}
      lastCheckedAt={topCoins?.timestamp}
      isTopCoinsLoading={isTopCoinsLoading}
      coinDetail={coinDetail?.data}
      isCoinDetailLoading={isCoinDetailLoading}
      rateDetail={rateDetail?.data}
      isRateDetailLoading={isRateDetailLoading}
      handleFilterText={handleFilterText}
      isViewingDetailModal={isViewingDetailModal}
      closeDetailModal={closeDetailModal}
    />
  );
};
export default TopCoinsController;
