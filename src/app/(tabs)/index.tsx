
import products from '@/assets/data/products';

import ProductListItem from "@/src/components/ProductListItem";

export default function HomeScreen() {
  return (
    <ProductListItem product={products[0]}/>
  );
}
