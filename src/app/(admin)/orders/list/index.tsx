import { ActivityIndicator, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';

import ParallaxScrollView from '@/src/components/ParallaxScrollView';
import OrderListItem from '@/src/components/OrderListItem';
import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';

import { Colors } from '@/src/constants/Colors';
import { useAdminOrderList } from '@/src/api/orders';
import { useInsertOrderSubscription } from '@/src/api/orders/subscriptions';

export default function Orders() {
  const { 
    data: orders, 
    isLoading, 
    error } = useAdminOrderList({ archived: false });


  useInsertOrderSubscription();

  if (isLoading) {
    return <ActivityIndicator/>
  }

  if (error) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.name}> Order Not Found </ThemedText>
        <Link href={'/(admin)/orders/list'}>
          <ThemedText style={styles.price}> Back to Orders </ThemedText>
        </Link>
      </ThemedView>
    )
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: Colors.light.text, dark: '#353636' }}
      headerImage={<Ionicons name='pizza' style={{ transform: "translateY(25deg), rotateZ(-25deg)"}} size={370} color={Colors.light.tabIconDefault} />}
      >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Active Orders</ThemedText>
      </ThemedView>
      <ThemedView style={styles.orderList}>
        { orders?.map((order) => (
            <OrderListItem order={order} key={order.id}/>
        ))}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems:"center",
    backgroundColor: 'white',
    gap: 20,
    padding: 10,
    width: "100%"
  },

  name: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.text
  },

  price: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.icon
  },

  headerImage: {
    color: '#808080',
    bottom: 90,
    left: 35,
    position: 'relative',
  },

  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20
  },

  orderList : {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: '100%',
    gap: 10
  }
});