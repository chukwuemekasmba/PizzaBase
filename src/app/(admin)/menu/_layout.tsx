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
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: true, 
          headerTitle: "Menu",
          headerRight: () => (
            <Link href="/cart" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons 
                    name={ pressed ? 'add-outline' : "add" } 
                    size={30} 
                    color={Colors[colorScheme ?? 'light'].tint}
                    style={{ marginRight: 15, opacity : pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
            ) 
        }}
          />
      <Stack.Screen 
        name="[id]" 
        options={{ 
          headerShown: false,
          headerRight: () => (
            <Link href="/cart" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons 
                    name={ pressed ? 'create' : "create-outline" } 
                    size={25} 
                    color={Colors[colorScheme ?? 'light'].tint}
                    style={{ marginRight: 15, opacity : pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
            ) 
         }}
        />
    </Stack>
  );
}
