"use client";
import React from 'react';
import Header from '../components/Header';
import { useCartState } from '../context/CartContext';
import ItemComponent from './ItemComponent';
import CartComponent from './CartComponent';

const Component3 = () => {
  const { items } = useCartState();

  return (
    <div>
      <Header />
      <h1>Component 3</h1>
      {items.map((item, index) => (
        <ItemComponent key={index} item={item} />
      ))}
      <CartComponent />
    </div>
  );
};

export default Component3;
