import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Image, StyleSheet, Pressable } from 'react-native'
import { useState } from "react";

import Button from "@/components/Button";
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { HelloWave } from '@/components/HelloWave';
import { defaultPizzaImage } from '@/components/ProductListItem';

import products from '@/assets/data/products';
import { PizzaSize } from '@/src/types';
import { Colors } from '@/src/constants/Colors';
import { useCart } from '@/src/providers/CartProvider';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const { addItem } = useCart();
  const product = products.find((p) => p.id.toString() === id);
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');

  const router = useRouter();

  const addToCart = () => {
    if (!product) {
      return;
    }

    addItem(product, selectedSize);
    router.push('/cart');
  };

  if (!product) {
    return (
      <ThemedView>
        <ThemedText> Product Not Found </ThemedText>
        <Link href={'/menu'}>
          <ThemedText>Go Back Home <HelloWave /> </ThemedText>
        </Link>
      </ThemedView>
    )
  }

  return (
    <ThemedView style={ styles.container }>
      <Stack.Screen options={{ title: product?.name, headerShown: true, headerBackTitleVisible: false }} />
        <ThemedView>
          <Image source={{ uri: product.image || defaultPizzaImage }} style={styles.productImage} />
        </ThemedView>
        <ThemedView style={styles.cart}>
          <ThemedText style={ styles.name }> { product.name } </ThemedText>
          <ThemedText style={ styles.price }> Price: ${ product.price } </ThemedText>
        </ThemedView>
    </ThemedView>
  )
}

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems:"center",
    backgroundColor: 'white',
    gap: 20,
    padding: 10,
    width: "100%"
  },

  productImage: {
    width: "100%",
    aspectRatio: 1,
    objectFit: "contain"
  },

  name: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.text
  },

  price: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.icon
  },

  cart : {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    gap: 10
  }
  
})