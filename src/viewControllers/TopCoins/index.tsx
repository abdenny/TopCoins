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
    calculateUsdValue,
  } = useTopCoins();

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

  // Start Conversion Form Logic
  const [conversionText, setConversionText] = useState('');
  const [convertedValue, setConvertedValue] = useState('');

  const handleConversionText = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setConversionText(e.target.value);
  };

  const submitConversion = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const calc = calculateUsdValue(conversionText);
    setConvertedValue(calc);
    setConversionText('');
  };

  // Start Modal Logic
  const coinDetailParam = useSelectParam('coinDetail');
  const removeParam = useRemoveParam('coinDetail');

  const [isViewingDetailModal, setIsViewingDetailModal] = useState(false);

  useEffect(() => {
    setIsViewingDetailModal(!!coinDetailParam);
  }, [coinDetailParam]);

  // Removing the param from the url will close the modal because of the useEffect above.
  // Reset VM data so when another values is selected, the modal will not flash old data as it fetches the new coin.
  // Reset conversion form data so previous values are not persisted when the modal is closed.
  const closeDetailModal = (): void => {
    removeParam();
    resetCoinDetail();
    setConversionText('');
    setConvertedValue('');
  };

  return (
    <View
      topCoins={filterText ? filteredTopCoins : topCoins?.data}
      lastCheckedAt={topCoins?.timestamp}
      isTopCoinsLoading={isTopCoinsLoading}
      coinDetail={coinDetail?.data}
      isCoinDetailLoading={isCoinDetailLoading}
      handleFilterText={handleFilterText}
      isViewingDetailModal={isViewingDetailModal}
      closeDetailModal={closeDetailModal}
      handleConversionText={handleConversionText}
      canSubmitConversion={conversionText.length > 0}
      submitConversion={submitConversion}
      convertedValue={convertedValue}
    />
  );
};
export default TopCoinsController;
