import { useAuth } from '@/src/providers/AuthProvider';
import { Redirect, Stack } from 'expo-router';

export default function TabLayout() {
  const { session } = useAuth();

  if(session) {
    return <Redirect href={'/'} />
  }

  return (
    <Stack>
      <Stack.Screen name='sign-in' options={{ headerShown: false }}/>
      <Stack.Screen name='sign-up' options={{ headerShown: false }}/>
    </Stack>
  );
}
