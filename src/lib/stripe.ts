import { Alert } from 'react-native';
import { supabase } from './supabase';
import { useStripe } from '@stripe/stripe-react-native';

export const fetchPaymentSheetParams = async () => {
  const { data, error } = await supabase.functions.invoke(
    "payment-sheet",
  );

  console.log(data, error);

  if (!data || error) {
    Alert.alert(`Error: ${error?.message ?? "no data"}`);
    return {};
  }
  const { paymentIntent, ephemeralKey, customer, stripe_pk } = data;

  return {
    paymentIntent,
    ephemeralKey,
    customer,
    stripe_pk,
  };
};