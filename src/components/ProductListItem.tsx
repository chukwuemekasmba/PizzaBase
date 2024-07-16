import React from 'react'
import { Image, Pressable, StyleSheet } from 'react-native'
import { Link, useSegments } from 'expo-router';

import { ThemedText } from '@/src/components/ThemedText';

import { Product } from "../types";
import { Colors } from "@/src/constants/Colors";
import { defaultPizzaImage } from '@/src/constants/Images';
import { Tables } from '../database.types';

type ProductListItemProps = {
  product: Tables<'products'>;
}

const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments();

  return (
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.productContainer}>
        <Image 
          source={{ uri : product.image || defaultPizzaImage }} 
          style={styles.productImage} 
          resizeMode='contain'
        />
        <ThemedText style={styles.title}>{ product.name }</ThemedText>
        <ThemedText style={styles.price}>${ product.price }</ThemedText>
      </Pressable>
    </Link>
  )
}

export default ProductListItem


const styles = StyleSheet.create({
  productContainer: {
    flex: 1,
    maxWidth: "50%",
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    padding: 10,
    borderRadius: 12,
    height: "100%",
    backgroundColor: "white"
  },

  productImage : {
    aspectRatio: 1,
    width: "100%",
  },


  title :{ 
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 21,
    textAlign: "center"
  },

  price : {
    color: Colors.light.text,
    fontSize: 14,
  },
  
});
