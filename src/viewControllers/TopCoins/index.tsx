import { useState } from 'react';
import useTopCoins from 'viewModels/useTopCoins';
import useDebounce from 'hooks/useDebounce';

import View from './view';

const TopCoinsController = (): JSX.Element => {
  const { topCoins, isTopCoinsLoading } = useTopCoins();

  const [enteredText, setEnteredText] = useState('');

  const debouncedEnteredText = useDebounce(enteredText, 200);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEnteredText(e.target.value);
  };

  const filteredTopCoins = topCoins?.data.filter(
    (coin) =>
      coin.name.toLowerCase().includes(debouncedEnteredText.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(debouncedEnteredText.toLowerCase())
  );

  return (
    <View
      topCoins={enteredText ? filteredTopCoins : topCoins?.data ?? undefined}
      lastCheckedAt={topCoins?.timestamp ?? undefined}
      isLoading={isTopCoinsLoading}
      handleTextChange={handleTextChange}
    />
  );
};
export default TopCoinsController;
