import { Platform, StyleSheet, FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import { Colors } from '../constants/Colors';
import { useCart } from "@/src/providers/CartProvider";

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import CartListItem from '../components/CartListItem';
import Button from '../components/Button';

const Cart = () => {
  const { total, items, totalQuantity, checkout } = useCart();

  return (
    <ThemedView style={styles.cart}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
      <ThemedView style={styles.orderContainer}>
        <ThemedText style={styles.order}>Order Summary:</ThemedText>
        <ThemedText style={styles.quantity}>Quantity: { totalQuantity } { totalQuantity == 1 ? "Item" : "Items"} </ThemedText>
        <ThemedText style={styles.price}>Total: ${ total }</ThemedText>
      </ThemedView>
      <Button onPress={checkout} text='Checkout' />
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
    paddingBottom: 50,
    backgroundColor: Colors.light.background
  },

  orderContainer : {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 5,
    padding: 20,
    width: '100%',
  },

  order: {
    fontSize: 20,
    fontWeight: 700
  },

  quantity: {
    fontSize: 16,
    fontWeight: 400
  },

  price: {
    fontSize: 16,
    fontWeight: 400
  },


});

