import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import Link from "expo-router";

import { defaultPizzaImage } from "@/src/constants/Images";
import { Colors } from "@/src/constants/Colors";
import { CartItem } from "../types";
import { useCart } from "../providers/CartProvider";

type CartListItemProps = {
  cartItem: CartItem;
}

function CartListItem({ cartItem }: CartListItemProps) {
  const { updateQuantity }  = useCart();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: cartItem.product.image || defaultPizzaImage }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{cartItem.product.name}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.price}>${cartItem.product.price.toFixed(2)}</Text>
          <Text>Size: {cartItem.size}</Text>
        </View>
      </View>
      <View style={styles.quantitySelector}>
        <FontAwesome
          onPress={() => updateQuantity(cartItem.id, -1)}
          name="minus"
          color="gray"
          style={{ padding: 5 }}
        />

        <Text style={styles.quantity}>{cartItem.quantity}</Text>
        <FontAwesome
          onPress={() => updateQuantity(cartItem.id, 1)}
          name="plus"
          color="gray"
          style={{ padding: 5 }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    width: "100%"
  },

  image: {
    width: 75,
    aspectRatio: 1,
    alignSelf: 'center',
    marginRight: 10,
  },

  title: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 5,
  },

  subtitleContainer: {
    flexDirection: 'row',
    gap: 5,
  },

  quantitySelector: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 10,
  },

  quantity: {
    fontWeight: '500',
    fontSize: 18,
  },

  price: {
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
});

export default CartListItem;