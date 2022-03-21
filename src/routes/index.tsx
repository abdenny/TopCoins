import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Loading from 'components/Loading';

const TopCoins = lazy(() => import('viewControllers/TopCoins'));
const PageNotFound = lazy(() => import('viewControllers/PageNotFound'));

// eslint-disable-next-line react/display-name
export default (): JSX.Element => (
  <Suspense fallback={<Loading />}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TopCoins />} />

        {/* Fallback route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  </Suspense>
);
