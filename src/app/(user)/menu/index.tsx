import { useEffect, useState } from "react";
import { StyleSheet, FlatList } from 'react-native';

import products from '@/assets/data/products';
import { supabase } from "@/src/lib/supabase";

import ProductListItem from "@/src/components/ProductListItem";

export default function HomeScreen() {
  const [productsList, setProductsList] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');

      // setProductsList(data);
    };

    fetchProducts();
  }, []);

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