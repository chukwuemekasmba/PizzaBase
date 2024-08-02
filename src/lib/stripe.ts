import { Alert } from 'react-native';
import { supabase } from './supabase';
import { useStripe } from '@stripe/stripe-react-native';


const API_URL = process.env.EXPO_PUBLIC_SUPABASE_URL

export const fetchPaymentSheetParams = async () => {
  const response = await fetch(`${API_URL}/v1/payment-sheet`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  const { paymentIntent, ephemeralKey, customer } = await response.json();

  return {
    paymentIntent,
    ephemeralKey,
    customer,
  };
};
//   console.log('Initialising payment sheet, for: ', amount);

//   const { paymentIntent, publishableKey, customer, ephemeralKey } =
//     await fetchPaymentSheetParams(amount);

//   console.log(paymentIntent, publishableKey, customer, ephemeralKey)

//   if (!paymentIntent || !publishableKey) return;

//   const result = await initPaymentSheet({
//     merchantDisplayName: 'PizzaBase',
//     paymentIntentClientSecret: paymentIntent,
//     customerId: customer,
//     customerEphemeralKeySecret: ephemeralKey,
//     defaultBillingDetails: {
//       name: 'Jane Doe',
//     },
//   });
//   console.log(result);
// };

// export const openPaymentSheet = async () => {
//   const { error } = await presentPaymentSheet();

//   if (error) {
//     Alert.alert(error.message);
//     return false;
//   }
//   return true;
// };