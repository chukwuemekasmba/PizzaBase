import { useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'

import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import Button from '@/src/components/Button';

import { Colors } from '@/constants/Colors';
import { Link } from 'expo-router';

const SignUp = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  return (
    <ThemedView style={styles.container}>
    <TextInput 
      placeholder='email'
      style={styles.input}
    />
    <TextInput 
      placeholder='email' 
      style={styles.input}
    />
    <Button text='Create an Account' />
    <Link href={'/(auth)/sign-in'}>
      <ThemedText style={styles.text}> 
          Sign In
      </ThemedText>
    </Link>

    </ThemedView>
  )
}

export default SignUp

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