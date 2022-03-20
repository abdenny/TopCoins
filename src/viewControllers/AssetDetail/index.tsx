import useAssetDetail from 'viewModels/useAssetDetail';

import View from './view';

const AssetDetailController = (): JSX.Element => {
  const { assetDetail } = useAssetDetail();

  return <View />;
};
export default AssetDetailController;
