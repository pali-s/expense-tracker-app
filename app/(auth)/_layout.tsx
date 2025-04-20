import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Login from './login';
import Signup from './signup';
import { Stack } from 'expo-router';

export default function AuthLayout() {
    const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
    return (
        // <Stack screenOptions={{ headerShown: false }} />
        <View style={styles.container}>
            <View style={styles.tabs}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'login' && styles.activeTab]}
                    onPress={() => setActiveTab('login')}
                >
                    <Text style={[styles.tabText, activeTab === 'login' && styles.activeTabText]}>
                        Login
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'signup' && styles.activeTab]}
                    onPress={() => setActiveTab('signup')}
                >
                    <Text style={[styles.tabText, activeTab === 'signup' && styles.activeTabText]}>
                        Sign Up
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.formContainer}>
                {activeTab === 'login' ? <Login /> : <Signup />}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffdde1',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    tabs: {
        flexDirection: 'row',
        backgroundColor: '#fce4ec',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    tab: {
        flex: 1,
        padding: 15,
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: '#fff',
        borderBottomWidth: 3,
        borderColor: '#f06292',
    },
    tabText: {
        color: '#e91e63',
        fontWeight: '600',
    },
    activeTabText: {
        color: '#ad1457',
    },
    formContainer: {
        backgroundColor: '#fff',
        width: '100%',
        maxWidth: 380,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        padding: 30,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
});