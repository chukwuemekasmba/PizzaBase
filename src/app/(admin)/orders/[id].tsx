import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ThemedView } from '@/src/components/ThemedView';
import { ThemedText } from '@/src/components/ThemedText';
import { Stack, useLocalSearchParams, Link } from 'expo-router';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';

import orders from '@/assets/data/orders';
import OrderListItem from '@/src/components/OrderListItem';
import OrderItemListItem from '@/src/components/OrderItemListItem';
import { HelloWave } from '@/src/components/HelloWave';

import { OrderStatusList } from '@/src/types';
import { Colors } from '@/src/constants/Colors';

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
      <GestureHandlerRootView  style={{ paddingVertical: 15 }}>
        <FlatList
          data={order?.order_items}
          renderItem={({ item }) => <OrderItemListItem item={item} /> }
          contentContainerStyle={{ gap: 10 }}
          ListFooterComponent={() => (
            <ThemedView>
              <ThemedText style={styles.footerTitle}>Status</ThemedText>
              <ThemedView style={styles.footerList}>
                { OrderStatusList.map((status) => (
                  <Pressable  
                    key={status}
                    onPress={() => console.warn('Update status')}
                    style={{
                      borderColor: Colors.light.tabIconDefault,
                      borderWidth: 1,
                      padding: 5,
                      borderRadius: 10,
                      marginVertical: 10,
                      backgroundColor: 
                        order.status === status ? Colors.light.text : "white",
                    }}
                  >
                    <ThemedText style={{
                      color: order.status === status ? Colors.light.background : Colors.light.text
                    }}> {status} </ThemedText>
                  </Pressable>
                ))}
              </ThemedView>
            </ThemedView>
          )}
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
  },

  footerTitle : {
    fontSize: 24,
    fontWeight: 700
  },

  footerList : {
    flexDirection: 'row',
    gap: 5
  }
})