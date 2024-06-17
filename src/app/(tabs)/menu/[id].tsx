import { useLocalSearchParams } from 'expo-router';

import { View, Text } from 'react-native'

import { ThemedView } from '@/src/components/ThemedView';
import { ThemedText } from '../../../components/ThemedText';

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams();

  return (
    <ThemedView>
      <ThemedText>ProductDetailScreen : `${id}`</ThemedText>
    </ThemedView>
  )
}

export default ProductDetailScreen