// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { StatusBar } from 'expo-status-bar';
// import { useEffect } from 'react';
// import 'react-native-reanimated';

// import { useColorScheme } from '@/hooks/useColorScheme';



// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   });

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   // return (
//   //   <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//   //     <Stack>
//   //       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//   //       <Stack.Screen name="+not-found" />
//   //     </Stack>
//   //     <StatusBar style="auto" />
//   //   </ThemeProvider>
//   // );
// }
import { View, StyleSheet } from 'react-native';
import { Slot, useRouter, usePathname } from 'expo-router';
import { useEffect,useState } from 'react';
import { AuthProvider, useAuth } from '../context/auth';
import { ToastProvider } from '../context/toastcontext';
import AsyncStorage from '@react-native-async-storage/async-storage';


function LayoutWithAuthLogic() {
  const { isAuthenticated} = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      await AsyncStorage.removeItem('token');
      const token = await AsyncStorage.getItem('user_token');
      // console.log('token:', token);
      if (!token && !isAuthenticated) {
        router.replace('/login' as const);
      } else if (isAuthenticated && pathname === '/login') {
        router.replace('/' as const);
      }
    };
  
    checkAuth();
  }, [isAuthenticated, pathname, router]);

  return(
    <View style={styles.container}>
    <Slot />
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fce4ec', // 👈 Match your tab bar background
  },
});

export default function RootLayout() {
  return (
    <ToastProvider>
      <AuthProvider>
        <LayoutWithAuthLogic />
      </AuthProvider>
    </ToastProvider>
  );
}
