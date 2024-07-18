import { useState, createContext, useContext, PropsWithChildren } from "react";
import { randomUUID } from 'expo-crypto';
import { router } from "expo-router";

import { useCreateOrder } from "../api/orders";
import { CartItem, Tables } from "../types";

type Product = Tables<'products'>;

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
  totalQuantity: number;
  checkout: () => void;
}

export const CartContext = createContext<CartType>({ 
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  totalQuantity: 0,
  checkout: () => { },
});

const CartProvider = ({ children }: PropsWithChildren ) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { mutate: createOrder } = useCreateOrder()

  const addItem = (product: Product, size: CartItem['size']) => {
    // if already in cart; increment quantity
    const existingItem = items.find(
      (item) => item.product === product && item.size === size
    );

    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return
    }

    const newCartItem: CartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1
    };

    setItems([newCartItem, ...items]);
  };

  // updateQuantity
  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    setItems(
      items
        .map((item) =>
          item.id !== itemId
            ? item
            : { ...item, quantity: item.quantity + amount }
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const total = Number(items.reduce(
    (sum, item) => (sum += item.product.price * item.quantity),
    0
  ).toFixed(2));

  const totalQuantity = Number(items.reduce(
    (sum, item) => (sum += item.quantity), 0 ).toFixed(2));

  const clearCart = () => {
    setItems([]);
  };

  const checkout = () => {
    createOrder({ total }, { onSuccess: (data) => {
      clearCart()
      router.push(`/(user)/orders/${data.id}`)
    }

    })
  }

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, total, totalQuantity, checkout }} >
      { children }
    </CartContext.Provider>
  )
}

export default CartProvider;

export const useCart = () => useContext(CartContext);