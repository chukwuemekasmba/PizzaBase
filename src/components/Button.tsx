import { Pressable, StyleSheet, Text, View } from 'react-native';
import { forwardRef } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';


type ButtonProps = {
  text: string;
  mode?: string;
} & React.ComponentPropsWithoutRef<typeof Pressable>;

const Button = forwardRef<View | null, ButtonProps>(
  ({ text, mode, ...pressableProps }, ref) => {
    const colorScheme = useColorScheme();

    return (
      <Pressable ref={ref} {...pressableProps} style={mode == 'outline' ? styles.outline : styles.container}>
        { ({ pressed }) => (
          <Text 
            style={ mode == 'outline' ? styles.outlineText : styles.text}>
            {text} 
          </Text>
    )}
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.tint,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.light.tint,
    padding: 15,
    alignItems: 'center',
    borderRadius: 100,
    marginVertical: 10,
    width: "100%",
  },

  outline : {
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.light.tint,
    padding: 15,
    alignItems: 'center',
    borderRadius: 100,
    marginVertical: 10,
    width: "100%",
  },

  text: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },

  outlineText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.tint,
  }
});

export default Button;