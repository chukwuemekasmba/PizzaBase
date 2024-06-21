import { createContext, useContext, PropsWithChildren } from "react";
import { CartItem, Product } from "../types";

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
}

export const CartContext = createContext<CartType>({ 
  items: [],
  addItem: () => {}
});

const CartProvider = ({ children }: any ) => {
  return (
    <CartContext.Provider value={{ items: [], onAddItem: () => {}}} >
      { children }
    </CartContext.Provider>
  )
}

export default CartProvider;

export const useCart = () => useContext(CartContext);