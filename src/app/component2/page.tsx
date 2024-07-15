import React, { Suspense } from 'react';

import Header from '../components/Header';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const LazyImageComponent = React.lazy(() => 
  delay(1000).then(() => import('./ImageComponent'))
);

const Component2 = () => {
  return (
    <div>
      <Header />
      <h1>Component 2</h1>
      <h1>Scroll down to load the image</h1>
      {/* <div style={{ height: '2000px' }}></div> */}
      <Suspense fallback={<div>Loading...</div>}>
        <LazyImageComponent />
      </Suspense>
      <div style={{ height: '2000px' }}></div>
    </div>
  );
};

export default Component2;
