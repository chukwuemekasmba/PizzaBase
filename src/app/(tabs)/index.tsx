import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/src/components/HelloWave';

import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';

import { Colors } from "@/src/constants/Colors";
import orders  from "@/assets/data/orders";
import products from '@/assets/data/products';

const product = products[0]

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.productContainer}>
        <Image src={ product.image } style={styles.productImage} />
        <ThemedText style={styles.title}>{ product.name }</ThemedText>
        <ThemedText style={styles.price}>${ product.price }</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  productContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    borderRadius: 12
  },

  productImage : {
    height: 150,
    width: 150,
  },

  title :{ 
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 31,
  },

  price : {
    color: Colors.light.tint,
    fontSize: 16,
  },
  
});
