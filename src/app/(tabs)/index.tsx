import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/src/components/HelloWave';
import ParallaxScrollView from '@/src/components/ParallaxScrollView';
import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Pizza Peperoni</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
