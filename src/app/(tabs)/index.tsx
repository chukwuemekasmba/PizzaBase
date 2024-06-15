import { StyleSheet,  } from 'react-native';
import products from '@/assets/data/products';

import ProductListItem from "@/src/components/ProductListItem";
import { ThemedView } from '@/src/components/ThemedView';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ProductListItem product={products[0]}/>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems: "flex-start",
  }
})