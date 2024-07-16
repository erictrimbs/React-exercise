import React from 'react';
import { useCartDispatch, Item, CartAction} from '../context/CartContext';

const ItemComponent = ( {item}: {item: Item} ) => {
  const dispatch = useCartDispatch();

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: { item } } as CartAction);
  };

  return (
    <div>
      <h2>{item.name}</h2>
      <p>Price: ${item.price}</p>
      <p>Availability: {item.availability}</p>
      <button onClick={handleAddToCart} disabled={item.availability === 0}>
        Add to Cart
      </button>
    </div>
  );
};

export default ItemComponent;
