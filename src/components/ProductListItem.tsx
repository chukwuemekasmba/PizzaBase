import React from 'react'
import { Image, StyleSheet } from 'react-native'

import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';

import { Colors } from "@/src/constants/Colors";

const ProductListItem = ({ product }: any) => {

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.productContainer}>
        <Image src={ product.image } style={styles.productImage} />
        <ThemedText style={styles.title}>{ product.name }</ThemedText>
        <ThemedText style={styles.price}>${ product.price }</ThemedText>
      </ThemedView>
    </ThemedView>
  )
}

export default ProductListItem


const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems: "flex-start",
    backgroundColor: "gray",
    paddingTop: 50,
  },

  productContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    padding: 20,
    borderRadius: 12
  },

  productImage : {
    aspectRatio: 1,
    width: "100%",
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
