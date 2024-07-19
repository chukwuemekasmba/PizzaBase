import { StyleSheet, Text, View, Button } from 'react-native'
import { supabase } from '@/src/lib/supabase';
import { Colors } from '@/src/constants/Colors';

const Profile = () => {
  const handleSignOut = async () => {
    await supabase.auth.signOut()
  };
  
  return (
    <View style={ styles.container }>
      <Text style={styles.text} >Profile</Text>
      <Button 
        title='Sign Out' 
        onPress={handleSignOut} 
        color={'#000'}
      />
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
  },

  button: {
    backgroundColor: Colors.light.tabIconDefault
  }

})