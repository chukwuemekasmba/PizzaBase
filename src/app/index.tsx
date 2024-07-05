import { Link, Redirect } from 'expo-router';
import { supabase } from '../lib/supabase';

import Button from '../components/Button';
import { ThemedView } from '../components/ThemedView';

import { useAuth } from "@/providers/AuthProvider";
import { ActivityIndicator } from 'react-native';

const index = () => {
  const { session, loading } = useAuth();

  if(loading) {
    return <ActivityIndicator/>;
  }

  if(!session) {
    return <Redirect href={'/(auth)'} />
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  };

  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link href={'/(user)'} asChild>
        <Button text="User" />
      </Link>
      <Link href={'/(admin)'} asChild>
        <Button text="Admin" />
      </Link>
      <Link href={'/(auth)'} asChild>
        <Button text="Sign In" />
      </Link>

      <Button text="Sign Out" onPress={handleSignOut}/>

    </ThemedView>
  );
};

export default index;
