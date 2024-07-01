import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/src/components/ParallaxScrollView';
import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';

import { Colors } from '@/src/constants/Colors';
import orders from '@/assets/data/orders';
import OrderListItem from '@/src/components/OrderListItem';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: Colors.light.tint, dark: '#353636' }}
      headerImage={<Ionicons name='pizza-outline' size={400} color={Colors.light.background} />}
      >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Orders</ThemedText>
      </ThemedView>
      <ThemedView style={styles.orderList}>
        { orders.map((order) => (
            <OrderListItem order={order} key={order.id}/>
        ))}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
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