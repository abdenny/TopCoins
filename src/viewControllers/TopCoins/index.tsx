import type { SortObj } from 'types';
import { useState, useEffect } from 'react';
import useTopCoins from 'viewModels/useTopCoins';
import useDebounce from 'hooks/useDebounce';
import { useSelectParam, useRemoveParam } from 'hooks/useSearchParamHelpers';
import { sortByOrder } from 'util/sorters';

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
  const [filteredTopCoins, setFilteredTopCoins] = useState(topCoins?.data);
  const [filterText, setFilterText] = useState('');
  const [currentSort, setCurrentSort] = useState<SortObj>({ key: 'rank', order: 'asc' });

  const debouncedFilterText = useDebounce(filterText, 200);

  const handleFilterText = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // Reset column sort when beginning filter text changes
    if (filterText === '') setCurrentSort({ key: 'rank', order: 'asc' });
    setFilterText(e.target.value);
  };

  useEffect(() => {
    setFilteredTopCoins(
      topCoins?.data.filter(
        (coin) =>
          coin.name.toLowerCase().includes(debouncedFilterText.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(debouncedFilterText.toLowerCase())
      )
    );
  }, [topCoins?.data, debouncedFilterText]);

  const sortTopCoinsByColumn = ({
    key,
    order,
    sortType,
  }: SortObj & { sortType: 'alpha' | 'numeric' }) => {
    if (!filteredTopCoins) return;
    const topCoinsCopy = sortByOrder([...filteredTopCoins], key, order, sortType);
    setCurrentSort({ key, order });
    setFilteredTopCoins(topCoinsCopy);
  };

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
      topCoins={filteredTopCoins}
      lastCheckedAt={topCoins?.timestamp}
      isTopCoinsLoading={isTopCoinsLoading}
      coinDetail={coinDetail?.data}
      isCoinDetailLoading={isCoinDetailLoading}
      handleFilterText={handleFilterText}
      currentSort={currentSort}
      sortTopCoinsByColumn={sortTopCoinsByColumn}
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
