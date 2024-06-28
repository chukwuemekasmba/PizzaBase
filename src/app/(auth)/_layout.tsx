import { Stack } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/src/components/TabBarIcon';
import { Colors } from '@/src/constants/Colors';
import { useColorScheme } from '@/src/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen name='sign-in' options={{ headerShown: false }}/>
      <Stack.Screen name='sign-up' options={{ headerShown: false }}/>
    </Stack>
  );
}
