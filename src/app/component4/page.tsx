"use client";
import React from 'react';
import Header from '../components/Header';
// import HardCodedDataComponent from '../components/HardCodedDataComponent';
import { HardCodedDataComponent, UserInputDataComponent } from './DataComponents';


const Component4: React.FC = () => {

  return (
    <div>
      <Header />
      <h1>Component 4</h1>
      <HardCodedDataComponent />
      <UserInputDataComponent />
    </div>
  );
};

export default Component4;
