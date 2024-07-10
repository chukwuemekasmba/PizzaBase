import { supabase } from "@/src/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Product } from "@/src/types";

export const useProductList = () => {
  return useQuery({
     queryKey: ['products'],
     queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*');

      if (error) {
        throw new Error(error.message);
      }

      return data;
     },
  });
}

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

        if (error) {
          throw new Error(error.message);
        }
        return data;
    }
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any) {
      const { error, data: newProduct } = await supabase.from('products').insert({
        name: data.name,
        image: data.image,
        price: data.price,
      })
      .single();

      if (error) {
        throw new Error(error.message);
      }

      return newProduct;
    },

    async onSuccess () {
      await queryClient.invalidateQueries({ queryKey: ['products']});
    }
  })
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({ id, ...update}: Product ) {
      const { data, error } = await supabase
        .from('products')
        .update(update)
        .eq('id', id)
        .select();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries({ queryKey: ['products']});
      await queryClient.invalidateQueries({ queryKey: ['products', id]});
    },
    
    onError(error) {
      console.log(error)
    },
  });
};