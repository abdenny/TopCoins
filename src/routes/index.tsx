import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Loading from 'components/Loading';

const TopCoins = lazy(() => import('viewControllers/TopCoins'));
const PageNotFound = lazy(() => import('viewControllers/PageNotFound'));

const AppRoutes = (): JSX.Element => (
  <Suspense
    fallback={
      <div className="flex h-screen items-center justify-center">
        <Loading />
      </div>
    }
  >
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TopCoins />} />

        {/* Fallback route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  </Suspense>
);

export default AppRoutes;
