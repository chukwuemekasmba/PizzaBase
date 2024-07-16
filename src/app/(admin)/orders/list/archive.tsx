import Ionicons from '@expo/vector-icons/Ionicons';
import { ActivityIndicator, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/src/components/ParallaxScrollView';
import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';

import { Colors } from '@/src/constants/Colors';
import OrderListItem from '@/src/components/OrderListItem';

import { useAdminOrderList } from '@/src/api/orders';
import { Link } from 'expo-router';

export default function TabTwoScreen() {
  const { 
    data: orders, 
    isLoading, 
    error } = useAdminOrderList({ archived: true });

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
      headerBackgroundColor={{ light: Colors.light.tabIconDefault, dark: '#353636' }}
      headerImage={<Ionicons name='pizza' style={{ transform: "translateY(25deg), rotateZ(-25deg)"}} size={270} color={Colors.light.text} />}
      >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Archived</ThemedText>
      </ThemedView>
      <ThemedView style={styles.orderList}>
        { orders?.map((order) => (
            <OrderListItem order={order} key={order.id} />
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