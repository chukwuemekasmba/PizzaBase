import { useEffect } from "react";
import { supabase } from "@/src/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";


export const useInsertOrderSubscription = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const orderSubscription = supabase
    .channel('custom-insert-channel')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'orders' },
      (payload) => {
        console.log('Change received!', payload)
        queryClient.invalidateQueries({ queryKey: ['orders']})
      }
    )
    .subscribe();

    return () => {
      orderSubscription.unsubscribe();
    };
  }, []);
}