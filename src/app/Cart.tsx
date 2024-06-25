import { Platform, StyleSheet, FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import { Colors } from '../constants/Colors';
import { useCart } from "@/src/providers/CartProvider";

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import CartListItem from '../components/CartListItem';

const Cart = () => {
  const { total, items, totalQuantity } = useCart();

  return (
    <ThemedView style={styles.cart}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
      <ThemedView style={styles.button}>
        <ThemedText style={styles.buttonText}>Checkout ({ totalQuantity } { totalQuantity == 1 ? "Item" : "Items"}) ${ total }</ThemedText>
      </ThemedView>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </ThemedView>
  )
}

export default Cart;
const styles = StyleSheet.create({
  cart: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    padding: 10,
    backgroundColor: Colors.light.background
  },

  button: {
    backgroundColor: Colors.light.tint,
    padding: 15,
    alignItems: 'center',
    borderRadius: 100,
    marginBottom: 20,
    width: "80%",
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

