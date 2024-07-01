import { StyleSheet, Text, View } from 'react-native';
import { ThemedView } from '@/src/components/ThemedView';
import { ThemedText } from '@/src/components/ThemedText';
import { Stack, useLocalSearchParams, Link } from 'expo-router';

import orders from '@/assets/data/orders';
import OrderListItem from '@/src/components/OrderListItem';
import OrderItemListItem from '@/src/components/OrderItemListItem';
import { HelloWave } from '@/src/components/HelloWave';

import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';

const OrderDetail = () => {
  const { id } = useLocalSearchParams()

  const order = orders.find((item) => item.id.toString() === id)

  if (!order) {
    return (
      <ThemedView>
        <ThemedText> Product Not Found </ThemedText>
        <Link href={'/menu'}>
          <ThemedText>Go Back Home <HelloWave /> </ThemedText>
        </Link>
      </ThemedView>
    )
  }

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ headerShown: true, headerTitle: `Order #${ order !== undefined && order.id }`}} />
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
  container: {
    flex: 1,
    padding: 20
  }
})