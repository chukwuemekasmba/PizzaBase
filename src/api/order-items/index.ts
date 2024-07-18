import { supabase } from "@/src/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { InsertTables } from "@/src/types";


export const useInsertOrderItems = () => {
  return useMutation({
    async mutationFn(items: InsertTables<'order_items'>[]) {
      const { error, data: newProduct } = await supabase
        .from('order_items')
        .insert(
          items.map((item) => ({
            size: item.size,
            quantity: item.quantity,
            order_id: item.order_id,
            product_id: item.product_id,
          }))
        )
        .select();

      if (error) {
        throw new Error(error.message);
      }
      return newProduct;
    },
  });
};