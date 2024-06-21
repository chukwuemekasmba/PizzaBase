import React, { useContext } from 'react'
import { View, Text, Platform, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import { Colors } from '../constants/Colors';
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';
import { CartContext } from "@/src/providers/CartProvider";

const Cart = () => {
  const { items } = useContext(CartContext);

  return (
    <ThemedView style={styles.cart}>
      <ThemedView style={styles.checkoutContainer}>
        <ThemedText style={styles.checkoutText}>Proceed to Checkout ({ items.length } { items.length > 1 ? "Items" : "Item"}) </ThemedText>
      </ThemedView>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </ThemedView>
  )
}

export default Cart;
const styles = StyleSheet.create({
  cart: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },

  checkoutContainer: {
    backgroundColor: Colors.light.title,
    padding: 15,
    alignItems: 'center',
    borderRadius: 100,
    marginVertical: 10,
    width: "80%",
  },

  checkoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

