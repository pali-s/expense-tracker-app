import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TabBarBackground from '@/components/ui/TabBarBackground';
import AnimatedHeart from '@/components/ui/AnimatedHeart';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ad1457', // deep pink
        tabBarInactiveTintColor: '#e91e63', // lighter pink
        headerShown: false,
        tabBarBackground: TabBarBackground, // Optional: Background effect
        tabBarLabelStyle: {
          fontWeight: '600',
        },
        tabBarStyle: [
          styles.tabBar,
          {
            paddingBottom: insets.bottom + 8,
            paddingTop: 10,
          },
        ],
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center' }}>
              <Ionicons name="home" size={24} color={color} />
              {focused && <AnimatedHeart color="#ad1457" size={12} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="analysis"
        options={{
          title: 'Analysis',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center' }}>
              <Ionicons name="paper-plane" size={24} color={color} />
              {focused && <AnimatedHeart color="#ad1457" size={12} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center' }}>
              <Ionicons name="person" size={24} color={color} />
              {focused && <AnimatedHeart color="#ad1457" size={12} />}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fce4ec',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 70,
    paddingBottom: 10,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 5,
    elevation: 5,
    borderTopWidth: 0,
  },
  tabBarBackground: {
    flex: 1,
    backgroundColor: '#fce4ec',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
