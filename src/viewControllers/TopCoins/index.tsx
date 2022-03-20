import useTopCoins from 'viewModels/useTopCoins';

import View from './view';

const TopCoinsController = (): JSX.Element => {
  const { topCoins, isTopCoinsLoading } = useTopCoins();

  return (
    <View
      topCoins={topCoins?.data ?? undefined}
      lastCheckedAt={topCoins?.timestamp ?? undefined}
      isLoading={isTopCoinsLoading}
    />
  );
};
export default TopCoinsController;
