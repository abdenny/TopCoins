import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const TopCoins = lazy(() => import('viewControllers/TopCoins'));
const CoinDetail = lazy(() => import('viewControllers/CoinDetail'));

// eslint-disable-next-line react/display-name
export default (): JSX.Element => (
  <Suspense fallback={<div>Loading</div>}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TopCoins />} />
        <Route path="/coin/:coinId" element={<CoinDetail />} />

        {/* Fallback route */}
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  </Suspense>
);
