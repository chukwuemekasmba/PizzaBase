import { Alert } from 'react-native';
import { supabase } from './supabase';
import {
  initPaymentSheet,
  presentPaymentSheet,
} from '@stripe/stripe-react-native';

const token = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY

const fetchPaymentSheetParams = async (amount: number) => {
  const { data, error } = await supabase.functions.invoke(
    'payment-sheet', {
      body: { amount },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  console.log(data, error);
  
  if (data) {
    console.log(data);
    return data;
  };

  Alert.alert(`Error: ${error?.message ?? 'no data'}`);;
  return {};
};

export const initialisePaymentSheet = async (amount: number) => {
  console.log('Initialising payment sheet, for: ', amount);

  const { paymentIntent, publishableKey, customer, ephemeralKey } =
    await fetchPaymentSheetParams(amount);

  console.log(paymentIntent, publishableKey, customer, ephemeralKey)

  if (!paymentIntent || !publishableKey) return;

  const result = await initPaymentSheet({
    merchantDisplayName: 'PizzaBase',
    paymentIntentClientSecret: paymentIntent,
    customerId: customer,
    customerEphemeralKeySecret: ephemeralKey,
    defaultBillingDetails: {
      name: 'Jane Doe',
    },
  });
  console.log(result);
};

export const openPaymentSheet = async () => {
  const { error } = await presentPaymentSheet();

  if (error) {
    Alert.alert(error.message);
    return false;
  }
  return true;
};