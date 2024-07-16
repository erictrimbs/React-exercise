import React from 'react';
import { useCartState } from '../context/CartContext';

const CartComponent = () => {
  const { cart } = useCartState();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>{item.name} - ${item.price}</li>
          ))}
        </ul>
      )}
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
    </div>
  );
};

export default CartComponent;
