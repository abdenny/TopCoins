import useTopAssets from 'viewModels/useTopAssets';
const TopAssets = (): JSX.Element => {
  const { topAssets, isTopAssetsLoading } = useTopAssets();

  return <div>TopAssets</div>;
};
export default TopAssets;
