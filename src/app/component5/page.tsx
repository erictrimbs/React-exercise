"use client";

import Header from '../components/Header';
import DragAndDropUpload from './DragAndDropUpload';
import MostRecentObject from './MostRecentObject';


const Component1 = () => {
  return (
    <div>
      <Header />
      <h1>Component 5: File Upload</h1>
      <DragAndDropUpload />
      <MostRecentObject />
    </div>
  );
};

export default Component1;
