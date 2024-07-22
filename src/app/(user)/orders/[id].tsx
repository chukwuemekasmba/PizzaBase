import { ActivityIndicator, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams, Link } from 'expo-router';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';

import { ThemedView } from '@/src/components/ThemedView';
import { ThemedText } from '@/src/components/ThemedText';

import OrderListItem from '@/src/components/OrderListItem';
import OrderItemListItem from '@/src/components/OrderItemListItem';
import { HelloWave } from '@/src/components/HelloWave';

import { useOrderItem } from '@/src/api/orders';
import { Colors } from '@/src/constants/Colors';
import { useUpdateOrderSubscription } from '@/src/api/orders/subscriptions';

const OrderDetail = () => {
  const { id: idString } = useLocalSearchParams()
  const id = parseFloat(
    typeof idString === 'string' ? idString : idString[0]
  );
  const { data: order, isLoading, error }  = useOrderItem(id);
  
  useUpdateOrderSubscription(id)

  if (!order || error ) {
    return (
      <ThemedView style={styles.errorContainer}>
        <ThemedText style={styles.name}> Order Not Found </ThemedText>
        <Link href={'/menu'}>
          <ThemedText style={styles.linkText}>Go Back Home <HelloWave /> </ThemedText>
        </Link>
      </ThemedView>
    )
  }

  if (isLoading) {
    return <ActivityIndicator/>
  }



  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ 
        headerShown: true, 
        headerTitle: `Order #${ order !== undefined && order.id }`,
        headerBackTitle: "Orders",
        headerTintColor: Colors.light.tint
      }} 
        
      />
      <OrderListItem order={order} />
      <GestureHandlerRootView style={{ paddingVertical: 15 }}>
        <FlatList
          data={order?.order_items}
          renderItem={({ item }) => <OrderItemListItem item={item} /> }
          contentContainerStyle={{ gap: 10 }}
        />
      </GestureHandlerRootView>
    </ThemedView>
  )
};

export default OrderDetail;

const styles = StyleSheet.create({
  errorContainer : {
    flex: 1,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems:"center",
    backgroundColor: 'white',
    gap: 20,

  },

  container: {
    flex: 1,
    padding: 20
  },

  name: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.text
  },

  linkText : {
    color: Colors.light.tint,
    textDecorationLine: "underline"
  },
})