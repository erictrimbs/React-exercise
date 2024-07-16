import React, { Suspense } from 'react';
import Header from '../components/Header';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const LazyImageComponent = React.lazy(() => 
  delay(3000).then(() => import('./ImageComponent'))
);

const Component2 = () => {
  return (
    <div>
      <Header />
      <h1>Lazy-loaded component</h1>
      {/* <div style={{ height: '2000px' }}></div> */}
      <Suspense fallback={<div>Loading for 3 seconds... </div>}>
        <LazyImageComponent />
      </Suspense>
      <h1>The image will only load the first time you hit this page, afterwards it may be cached.</h1>
      <div style={{ height: '2000px' }}></div>
    </div>
  );
};

export default Component2;
