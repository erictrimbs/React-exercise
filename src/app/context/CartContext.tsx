"use client";
import React, { createContext, useContext, useReducer, ReactNode, Dispatch} from 'react';

type Item = {
  name: string;
  price: number;
  availability: number;
};

type CartState = {
  items: Item[];
  cart: Item[];
};

type CartAction = { type: 'ADD_TO_CART'; payload: { item: Item } };

const initialCartState: CartState = {
  items: [
    { name: 'Sample Item', price: 10.0, availability: 5 },
  ],
  cart: [],
};

const CartStateContext = createContext<CartState | undefined>(undefined);
const CartDispatchContext = createContext<Dispatch<CartAction> | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { item } = action.payload;
      return {
        ...state,
        cart: [...state.cart, item],
        items: state.items.map((i: Item) =>
          i.name === item.name ? { ...i, availability: i.availability - 1 } : i
        ),
      };
    }
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export type { Item, CartAction };

export const CartProvider = ({children}: {children: ReactNode}) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
};

export const useCartState = () => {
  const context = useContext(CartStateContext);
  if (context === undefined) {
    throw new Error('useCartState must be used within a CartProvider');
  }
  return context;
};

export const useCartDispatch = () => {
  const context = useContext(CartDispatchContext);
  if (context === undefined) {
    throw new Error('useCartDispatch must be used within a CartProvider');
  }
  return context;
};
