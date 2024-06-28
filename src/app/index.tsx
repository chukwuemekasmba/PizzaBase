import { Link } from 'expo-router';

import Button from '../components/Button';
import { ThemedView } from '../components/ThemedView';

const index = () => {

  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link href={'/(user)'} asChild>
        <Button text="User" />
      </Link>
      <Link href={'/(admin)'} asChild>
        <Button text="Admin" />
      </Link>
      <Link href={'/(auth)'} asChild>
        <Button text="Auth" />
      </Link>

      <Button text="Sign out" />
    </ThemedView>
  );
};

export default index;
