import { StyleSheet, Text, View } from 'react-native'
import { Order } from '../types'

type orderListItemProps = {
  order: Order;
}

const OrderListItem = ({ order }: orderListItemProps) => {
  return (
    <View>
      <Text>{ order.id }</Text>
    </View>
  )
}

export default OrderListItem

const styles = StyleSheet.create({})