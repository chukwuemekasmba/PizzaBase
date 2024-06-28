import { Stack, Link } from 'expo-router';
import { Pressable } from 'react-native';

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
            <Link href="/menu/create" asChild>
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
    </Stack>
  );
}
