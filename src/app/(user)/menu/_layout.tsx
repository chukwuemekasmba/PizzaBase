import { Stack, Link } from 'expo-router';
import { Pressable } from 'react-native';
import React from 'react';

import { TabBarIcon } from '@/src/components/TabBarIcon';
import { Colors } from '@/src/constants/Colors';
import { useColorScheme } from '@/src/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack 
      screenOptions={{ 
        headerRight: () => (
          <Link href="/cart" asChild>
            <Pressable>
              {({ pressed }) => (
                <Ionicons 
                  name={ pressed ? 'cart-outline' : "cart" } 
                  size={25} 
                  color={Colors[colorScheme ?? 'light'].tabIconDefault}
                  style={{ marginRight: 15, opacity : pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
          )
        }}
        >
        <Stack.Screen name="index" options={{ headerShown: true, headerTitle: "Menu" }} />
        <Stack.Screen name="[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
