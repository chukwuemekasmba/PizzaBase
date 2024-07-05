import { useEffect, useState } from "react";
import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';

import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";

import ProductListItem from "@/src/components/ProductListItem";
import { ThemedView } from "@/src/components/ThemedView";
import { ThemedText } from "@/src/components/ThemedText";
import { HelloWave } from "@/src/components/HelloWave";
import { Link } from "expo-router";
import { useProductList } from "@/src/api/products";

export default function HomeScreen() {
  const { data: products, error, isLoading } = useProductList();

  if (isLoading) {
    return <ActivityIndicator/>
  }

  if (error) {
    <ThemedView>
      <ThemedText style={{ color: "red" }}>Failed to fetch components</ThemedText>
      <Link href={'/'}>Go back home <HelloWave /> </Link>
    </ThemedView>
  }

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