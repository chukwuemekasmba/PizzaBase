import { StatusBar } from 'expo-status-bar'
import { View, Text, Platform } from 'react-native'
import React, { useContext } from 'react'

import { CartContext } from "@/src/providers/CartProvider";

const Cart = () => {
  const { items } = useContext(CartContext);

  return (
    <View>
      <Text>Proceed to Checkout { items.length } items </Text>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  )
}

export default Cart