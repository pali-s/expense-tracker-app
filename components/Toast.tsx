// app/components/Toast.tsx
import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

interface ToastProps {
    visible: boolean;
    message: string;
    onHide: () => void;
}

const Toast: React.FC<ToastProps> = ({ visible, message, onHide }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();

            const timeout = setTimeout(() => {
                Animated.parallel([
                    Animated.timing(fadeAnim, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(slideAnim, {
                        toValue: 30,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ]).start(onHide);
            }, 2000);

            return () => clearTimeout(timeout);
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <Animated.View
            style={[
                styles.toast,
                {
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }],
                },
            ]}
        >
            <Text style={styles.text}>{message}</Text>
        </Animated.View>
    );
};

export default Toast;

const styles = StyleSheet.create({
    toast: {
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center',
        backgroundColor: '#e91e63',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        maxWidth: screenWidth - 40,
        zIndex: 1000,
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
    },
    text: {
        color: '#fff',
        fontWeight: '600',
        textAlign: 'center',
    },
});
