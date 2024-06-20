import { createContext } from "react";

const CartContext = createContext({ });

const CartProvider = ({ children }: any ) => {
  return (
    <CartContext.Provider value={{ items: [], onAddItem: () => {}}} >
      { children }
    </CartContext.Provider>
  )
}

export default CartProvider;