import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Heart from Ionicons

type Props = {
    color?: string;
    size?: number;
};

const AnimatedHeart: React.FC<Props> = ({ color = '#f06292', size = 12 }) => {
    const scale = useRef(new Animated.Value(0)).current; // Start scale from 0

    useEffect(() => {
        // Trigger animation when heart becomes visible
        Animated.spring(scale, {
            toValue: 1, // Scale up to full size
            friction: 3, // Adjust friction to control the bounce
            tension: 100, // Adjust tension for the bounce speed
            useNativeDriver: true, // Use native driver for better performance
        }).start();
    }, []); // Empty array means this runs only once on component mount (or focus)

    return (
        <Animated.View
            style={{
                transform: [{ scale }], // Apply the bounce scaling
                // marginTop: 4,
            }}
        >
            <Ionicons name="heart" size={size} color={color} />
        </Animated.View>
    );
};

export default AnimatedHeart;
