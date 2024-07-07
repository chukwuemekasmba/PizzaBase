import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useProductList } from '@/src/api/products';

import ProductListItem from "@/src/components/ProductListItem";

export default function HomeScreen() {
  const { data: products, error, isLoading } = useProductList();

  return (
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item}/> }
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10, marginBottom: 40 }}
        columnWrapperStyle={{ gap: 10 }}
      />
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems: "flex-start",
  }
})