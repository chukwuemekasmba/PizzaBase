import { Tabs } from 'expo-router';
import { Redirect } from 'expo-router';
import { useAuth } from '@/src/providers/AuthProvider';

import { TabBarIcon } from '@/src/components/TabBarIcon';
import { Colors } from '@/src/constants/Colors';
import { useColorScheme } from '@/src/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Redirect href={'/'} />
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].background,
        tabBarInactiveTintColor: "gainsboro",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.light.text
        } 
      }}>
        <Tabs.Screen name="index" options={{ href: null }} /> 
        <Tabs.Screen
          name="menu"
          options={{
            title: 'Menu',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon 
                name={focused ? 'fast-food' : 'fast-food-outline'} 
                color={color} 
              />
            ),
          }}
        />
        <Tabs.Screen
          name="orders"
          options={{
            title: 'Orders',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'bag-handle' : 'bag-handle-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
            ),
          }}
        />
    </Tabs>
  );
}
