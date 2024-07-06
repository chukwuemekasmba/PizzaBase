import { StyleSheet, Text, View } from 'react-native'
import { supabase } from '@/src/lib/supabase';

import Button from '@/src/components/Button'

const Profile = () => {
  const handleSignOut = async () => {
    await supabase.auth.signOut()
  };
  
  return (
    <View style={ styles.container }>
      <Text style={styles.text} >Profile</Text>
      <Button text='Sign Out' onPress={handleSignOut}/>
    </View>
  )
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },

  text: {
    paddingBottom: 10,
  }
})