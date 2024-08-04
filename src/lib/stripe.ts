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

// export const fetchPaymentSheetParams = async () => {
//   const response = await supabase.functions.invoke(`${API_URL}/v1/payment-sheet`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
  
//   const { paymentIntent, ephemeralKey, customer } = await response.json();

//   return {
//     paymentIntent,
//     ephemeralKey,
//     customer,
//   };
// };
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