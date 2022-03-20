import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const TopAssets = lazy(() => import('viewControllers/TopAssets'));
const AssetDetail = lazy(() => import('viewControllers/AssetDetail'));

// eslint-disable-next-line react/display-name
export default (): JSX.Element => (
  <Suspense fallback={<div>Loading</div>}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TopAssets />} />
        <Route path="/asset/:assetId" element={<AssetDetail />} />

        {/* Fallback route */}
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  </Suspense>
);
