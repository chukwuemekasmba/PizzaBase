import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { Image, StyleSheet, Pressable } from 'react-native'
import { useState } from "react";

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { HelloWave } from '@/components/HelloWave';
import { defaultPizzaImage } from '@/components/ProductListItem';

import { PizzaSize } from '@/src/types';
import products from '@/assets/data/products';
import { Colors } from '@/src/constants/Colors';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const product = products.find((p) => p.id.toString() === id);


  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');

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
        <Image source={{ uri: product.image || defaultPizzaImage }} style={styles.productImage} />
        <ThemedView style={styles.selectContainer}>
          <ThemedText style={styles.selectTitle}> Select Size </ThemedText>
          <ThemedView style={styles.sizes}>
              {sizes.map((size) => (
                <Pressable
                  onPress={() => {
                    setSelectedSize(size);
                  }}
                  style={[
                    styles.size,
                    {
                      backgroundColor: selectedSize === size ? '#981515' : '#f5efdb',
                    },
                  ]}
                  key={size}
                >
                  <ThemedText
                    style={[
                      styles.sizeText,
                      {
                        color: selectedSize === size ? '#f5efdb' : '#702424',
                      },
                    ]}
                  >
                    {size}
                  </ThemedText>
                </Pressable>
              ))}
          </ThemedView>
        </ThemedView>
        <ThemedText style={ styles.price } > Price: { product.price } </ThemedText>
    </ThemedView>
  )
}

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems:"center",
    backgroundColor: 'white',
    padding: 10
  },

  productImage: {
    width: "100%",
    aspectRatio: 1,
    objectFit: "contain"
  },

  selectContainer : {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: "flex-start",
    width: "100%"
  },

  selectTitle : {
    fontSize: 20,
    fontWeight: "600",
  },

  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    width: "100%"
  },

  size: {
    backgroundColor: 'gainsboro',
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  sizeText: {
    fontSize: 20,
    fontWeight: '500',
  },

  price: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.text
  }
})