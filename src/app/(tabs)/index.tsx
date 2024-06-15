import { StyleSheet, FlatList } from 'react-native';
import products from '@/assets/data/products';

import ProductListItem from "@/src/components/ProductListItem";
import { ThemedView } from '@/src/components/ThemedView';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
        <FlatList
          key={"_"}
          keyExtractor={item => "_" + item.id}
          horizontal={false}
          data={products}
          renderItem={({ item }) => <ProductListItem product={item}/> }
          // numColumns={2}
        />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems: "flex-start",
  }
})