import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ThemedView } from '@/src/components/ThemedView';
import { ThemedText } from '@/src/components/ThemedText';
import { Stack, useLocalSearchParams, Link } from 'expo-router';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';

import orders from '@/assets/data/orders';
import OrderListItem from '@/src/components/OrderListItem';
import OrderItemListItem from '@/src/components/OrderItemListItem';

import { OrderStatusList } from '@/src/types';
import { Colors } from '@/src/constants/Colors';
import { useOrderItem } from '@/src/api/orders';

const OrderDetail = () => {
  const { id: idString } = useLocalSearchParams()
  const id = parseFloat(
    typeof idString === 'string' ? idString : idString[0]
  );
  const { data: order, isLoading, error }  = useOrderItem(id);

  if (!order || error ) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.name}> Order Not Found </ThemedText>
        <Link href={'/(admin)/orders/list'}>
          <ThemedText style={styles.linkText}> Back to Orders </ThemedText>
        </Link>
      </ThemedView>
    )
  }
  if (isLoading) {
    return 
  }

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ 
          headerShown: true, 
          headerTitle: `Order #${ order !== undefined && order.id }`,
          headerTintColor: Colors.light.text,
          headerBackTitle: "Orders"
        }} 
      />
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
  errorContainer: {
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
    padding: 20,
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

  footerTitle : {
    fontSize: 24,
    fontWeight: 700
  },

  footerList : {
    flexDirection: 'row',
    gap: 5
  }
})