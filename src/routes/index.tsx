import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const TopAssets = lazy(() => import('viewControllers/TopAssets'));

// eslint-disable-next-line react/display-name
export default (): JSX.Element => (
  <Suspense fallback={<div>Loading</div>}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TopAssets />} />
        <Route path="test" element={<div>Child comp</div>} />

        {/* Fallback route */}
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  </Suspense>
);
