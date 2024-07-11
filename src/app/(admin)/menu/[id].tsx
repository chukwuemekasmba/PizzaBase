import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Image, StyleSheet, Pressable } from 'react-native'
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { HelloWave } from '@/components/HelloWave';

import { defaultPizzaImage } from '@/src/constants/Images';

import { PizzaSize } from '@/src/types';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useCart } from '@/providers/CartProvider';
import { useProduct } from '@/src/api/products';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailScreen = () => {
  const router = useRouter();
  const { addItem } = useCart();
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(
    typeof idString === 'string' ? idString : idString[0]
  );

  const { data: product, error, isLoading } = useProduct(id);
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');

  const colorScheme = useColorScheme();

  const addToCart = () => {
    if (!product) {
      return;
    }

    addItem(product, selectedSize);
    router.push('/cart');
  };

  if (!product) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.name}> Product Not Found </ThemedText>
        <Link href={'/menu'}>
          <ThemedText style={styles.price}>Go Back Home <HelloWave /> </ThemedText>
        </Link>
      </ThemedView>
    )
  }

  return (
    <ThemedView style={ styles.container }>
      <Stack.Screen 
        options={{ 
          title: product?.name, 
          headerShown: true, 
          headerBackTitleVisible: false,
          headerRight: () => (
            <Link 
              asChild
              href={`(admin)/menu/update/?id=${id}`}
            >
              <Pressable>
                {({ pressed }) => (
                  <Ionicons 
                    name={ pressed ? 'create' : "create-outline" } 
                    size={25} 
                    color={Colors[colorScheme ?? 'light'].tint}
                    style={{ marginRight: 15, opacity : pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
            ) 
          }} 
        />
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