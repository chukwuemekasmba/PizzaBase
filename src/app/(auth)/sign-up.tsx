import { useEffect, useState } from 'react'
import { StyleSheet, TextInput, Alert } from 'react-native'
import { supabase } from '@/src/lib/supabase';

import Button from '@/src/components/Button';
import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';

import { Colors } from '@/constants/Colors';
import { Link } from 'expo-router';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signUpWithEmail = async () => {
    setLoading(true);
    await supabase.auth.signUp({ email, password })
      .catch((error) => {
        if (error) Alert.alert(error)
      })
    setLoading(false);
  };

  return (
    <ThemedView style={styles.container}>
      <TextInput 
        value={email}
        placeholder='johndoe@gmail.com'
        style={styles.input}
        onChangeText={setEmail}
        inputMode='email'
      />
      
      <TextInput 
        value={password}
        placeholder='password' 
        style={styles.input}
        onChangeText={setPassword}
        inputMode='text'
      />

      <Button 
        text={loading ? 'Creating account...' : 'Create account'} 
        onPress={signUpWithEmail}
        disabled={loading}
      />

      <Link href={'/(auth)/sign-in'}>
        <ThemedText style={styles.text}> 
            Sign In
        </ThemedText>
      </Link>

    </ThemedView>
  )
}

export default SignUp;

const styles = StyleSheet.create({
  container : {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: '100%'
  },

  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 15,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    width: "100%"
  },

  text: {
    color: Colors.light.tint,
    fontSize: 16,
    fontWeight: '500',
    width: '100%',
    padding: 20,
  }
})