import { Image, StyleSheet, Platform, Text, TouchableOpacity, View } from 'react-native';
import { getProfile } from '@/services/authService';
import { useState, useEffect } from 'react';

type UserInfo = {
  name: string;
};

export default function HomeScreen() {

  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
      const res = await getProfile();
      // console.log(`Response`, res);
      const name = res.name;
      if (!name) {
      throw new Error("User name not found in response");
      }
      setUserInfo({name});
      } catch (error) {
        setError(`Error fetching user: ${(error as Error).message}`);
      }
    };

    fetchUserInfo();
  }, []);

  const [position, setPosition] = useState({ top: 100, left: 100 });

  const containerWidth = 300;
  const containerHeight = 450;

  const handlePress = (direction: string) => {
    const step = 50; // Amount to move each time a button is pressed

    setPosition((prevPosition) => {
      let newTop = prevPosition.top;
      let newLeft = prevPosition.left;
      switch (direction) {
        case 'Up':
          newTop = Math.max(prevPosition.top - step, 0); // Prevent going above 0
          break;
        case 'Down':
          newTop = Math.min(prevPosition.top + step, containerHeight - 100); // Prevent going below the container
          break;
        case 'Left':
          newLeft = Math.max(prevPosition.left - step, 0); // Prevent going left of 0
          break;
        case 'Right':
          newLeft = Math.min(prevPosition.left + step, containerWidth - 100); // Prevent going right of the container
          break;
        default:
          return prevPosition;
      }
      // console.log('New Position:', newTop, newLeft);
      return { top: newTop, left: newLeft };
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Hello, {userInfo.name} <Text style={styles.headerIcon}>🎀</Text>
        </Text>
      </View>

      <Text style={styles.text}>Click on the buttons to make me move tehe</Text>
      {/* Boundary Container for Movable Element */}
      <View style={styles.boundaryContainer}>
        <View style={[
          styles.movableElement,
          { top: position.top, left: position.left },
        ]}>
          {position.top === 0 || position.top === 350 || position.left === 0 || position.left === 200 ? (
            <Image
              style={{ width: 200, height: 200 }}
              source={require('@/assets/images/YAY.png')}
            />
          ) : (
            <Image
              style={{ width: 200, height: 200 }}
              source={require('@/assets/images/Smirk.png')}
            />
          )}
        </View>
      </View>

      {/* <Text style={styles.text}>Your platform is {Platform.OS} and the version is {Platform.Version}</Text> */}


      <View style={styles.dPadContainer}>
        {/* Up */}
        <TouchableOpacity style={styles.button} onPress={() => handlePress('Up')}>
          <Text style={styles.arrow}>↑</Text>
        </TouchableOpacity>

        {/* Left, Right */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('Left')}>
            <Text style={styles.arrow}>←</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => handlePress('Right')}>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Down */}
        <TouchableOpacity style={styles.button} onPress={() => handlePress('Down')}>
          <Text style={styles.arrow}>↓</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  boundaryContainer: {
    position: 'absolute',
    top: 100,
    width: 300, // Set the width of the movable area
    height: 500, // Set the height of the movable area
    borderWidth: 1, // Optional, to show the boundary
    borderColor: 'white', // Optional, to show the boundary
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // Space between the boundary container and text
  },
  dPadContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    position: 'absolute',
    bottom: 0,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'pink',
    borderWidth: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 40,
    justifyContent: 'center',
    marginVertical: 10,
  },
  button: {
    width: 60,
    height: 60,
    backgroundColor: 'pink',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    color: 'white',
    fontSize: 24,
  },
  movableElement: {
    position: 'absolute',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'pink',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  headerIcon: {
    fontSize: 26,
    marginLeft: 10,
  },
});
