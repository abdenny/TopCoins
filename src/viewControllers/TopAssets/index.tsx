import useTopAssets from 'viewModels/useTopAssets';

import View from './view';

const TopAssetsController = (): JSX.Element => {
  const { topAssets, isTopAssetsLoading } = useTopAssets();

  return (
    <View
      topAssets={topAssets?.data ?? undefined}
      lastCheckedAt={topAssets?.timestamp ?? undefined}
      isLoading={isTopAssetsLoading}
    />
  );
};
export default TopAssetsController;
