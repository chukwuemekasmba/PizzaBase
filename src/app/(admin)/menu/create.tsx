import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from "expo-file-system"
import { randomUUID } from 'expo-crypto';
import { decode } from 'base64-arraybuffer';

import Button from '@/components/Button';

import { Colors } from '@/src/constants/Colors';
import { defaultPizzaImage } from '@/src/constants/Images';
import { useCreateProduct } from '@/src/api/products';
import { supabase } from '@/src/lib/supabase';

const CreateScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState('');

  const router = useRouter();

  const { mutate: createProduct } = useCreateProduct();

  const resetFields = () => {
    setName('');
    setPrice('');
    setImage('');
  }

  const validateInput = () => {
    setErrors('');
    if (!name) {
      setErrors('Name is required');
      return false;
    }
    if (!price) {
      setErrors('Price is required');
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setErrors('Price should be a number');
      return false;
    }
    return true;
  };

  const uploadImage = async () => {
    if (!image?.startsWith('file://')) {
      return;
    }
  
    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: 'base64',
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = 'image/png';
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(filePath, decode(base64), { contentType });
  
    if (data) {
      return data.path;
    }
  };

  const onCreate = async () => {
    if (!validateInput()) {
      return;
    }

    const imagePath = await uploadImage();

    console.warn('Creating Pizza Item:', name);
    
    createProduct({ name, price: parseFloat(price), image: imagePath }, {
      onSuccess: () => {
        resetFields();
        router.back();
      }
    });

  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerTitle: 'Create Product' }} />
      <Image
        source={{ uri: image || defaultPizzaImage }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text onPress={pickImage} style={styles.textButton}>
        Select Image
      </Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Margarita..."
        style={styles.input}
      />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="9.99"
        style={styles.input}
        keyboardType="numeric"
      />
      <Text style={styles.error}>{errors}</Text>
      <Button onPress={ onCreate} text={ "Create"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },

  image: {
    width: '50%',
    aspectRatio: 1,
    alignSelf: 'center',
  },

  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
  },

  label: {
    color: 'gray',
  },

  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },

  error: {
    color: 'red',
    textAlign: 'center',
  },
});

export default CreateScreen;