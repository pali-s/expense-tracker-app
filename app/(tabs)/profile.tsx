import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '@/context/auth';
import { MaterialIcons } from '@expo/vector-icons';

const profile = () => {
    const { logout } = useAuth();
  return (
    <View>
      <TouchableOpacity
                style={styles.button}
                onPress={logout}
            >
                <MaterialIcons name="logout" size={30} color="#fff" />
            </TouchableOpacity>
    </View>
  )
}

export default profile

const styles = {
    button: {
        backgroundColor: '#e91e63',
        padding: 15,
        borderRadius: 25,
        marginTop: 10,
        shadowColor: '#e91e63',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        elevation: 5,
    },
}
