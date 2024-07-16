import Ionicons from '@expo/vector-icons/Ionicons';
import { ActivityIndicator, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/src/components/ParallaxScrollView';
import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';

import { Colors } from '@/src/constants/Colors';
import OrderListItem from '@/src/components/OrderListItem';

import { useUserOrderList } from '@/src/api/orders';
import { Link } from 'expo-router';

export default function Orders() {
  const { data: orders, isLoading, error } = useUserOrderList();

  if (isLoading) {
    return <ActivityIndicator/>
  }

  if (error) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.name}> Order Not Found </ThemedText>
        <Link href={'/(user)/orders'}>
          <ThemedText style={styles.linkText}> Back to Orders </ThemedText>
        </Link>
      </ThemedView>
    )
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: Colors.light.tint, dark: '#353636' }}
      headerImage={<Ionicons name='pizza-outline' size={400} color={Colors.light.background} />}
      >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Orders</ThemedText>
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
    padding: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems:"center",
    backgroundColor: 'white',
    gap: 20,
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
  
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
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