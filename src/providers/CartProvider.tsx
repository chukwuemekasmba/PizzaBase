import { useState, createContext, useContext, PropsWithChildren } from "react";
import { randomUUID } from 'expo-crypto';
import { CartItem, Product } from "../types";

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
}

export const CartContext = createContext<CartType>({ 
  items: [],
  addItem: () => {}
});

const CartProvider = ({ children }: PropsWithChildren ) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, size: CartItem['size']) => {
    const newCartItem: CartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1
    };

    setItems([newCartItem, ...items]);
  };

  return (
    <CartContext.Provider value={{ items, addItem }} >
      { children }
    </CartContext.Provider>
  )
}

export default CartProvider;

export const useCart = () => useContext(CartContext);