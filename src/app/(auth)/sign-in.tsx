import { useState } from 'react'
import { StyleSheet, TextInput, Alert } from 'react-native'
import { supabase } from '@/src/lib/supabase';

import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import Button from '@/src/components/Button';

import { Colors } from '@/constants/Colors';
import { Link } from 'expo-router';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signInWithEmail = async () => {
    setLoading(true);
    await supabase.auth.signInWithPassword({ email, password })
      .catch((error) => {
        if (error) Alert.alert(error)
      })
    setLoading(false);
  };

  return (
    <ThemedView style={styles.container}>
      <TextInput 
        placeholder='janedoe@hotmail.com'
        style={styles.input}
        keyboardType='email-address'
        autoComplete='email'
        onChangeText={setEmail}
      />
      <TextInput 
        placeholder='password' 
        style={styles.input}
        keyboardType='default'
        autoComplete='current-password'
        onChangeText={setPassword}
      />
      <Button 
        text={loading ? 'Signing in' : 'Sign In'} 
        disabled={loading} 
        onPress={signInWithEmail} 
      />
      <ThemedText style={styles.text}> 
        <Link href={'/(auth)/sign-up'}>
          Create an Account
        </Link>
      </ThemedText>
    </ThemedView>
  )
}

export default SignIn;

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
  }
})