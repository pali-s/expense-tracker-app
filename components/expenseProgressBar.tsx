import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

type Props = {
    current: number;
    goal: number;
};

const ExpenseProgressBar: React.FC<Props> = ({ current, goal }) => {
    const progress = useRef(new Animated.Value(0)).current;
    const progressPercent = Math.min((current / goal) * 100, 100);

    useEffect(() => {
        Animated.timing(progress, {
            toValue: progressPercent,
            duration: 800,
            useNativeDriver: false,
        }).start();
    }, [progressPercent]);

    const widthAnim = progress.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
    });

    const backgroundColor = progress.interpolate({
        inputRange: [0, 50, 100],
        outputRange: ['#4caf50', '#ffeb3b', '#f44336'], // green → yellow → red
    });

    return (
        <View style={styles.wrapper}>
            <BlurView intensity={50} tint="light" style={styles.glassBar}>
                <Animated.View
                    style={[styles.fill, { width: widthAnim, backgroundColor }]}
                />
            </BlurView>
            <Text style={styles.text}>
                {current} / {goal}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        width: '100%',
        paddingVertical: 20,
    },
    glassBar: {
        width: '90%',
        height: 25,
        borderRadius: 999,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        shadowColor: '#ad1457',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    fill: {
        height: '100%',
        borderRadius: 999,
    },
    text: {
        marginTop: 10,
        fontSize: 14,
        color: '#555',
        fontWeight: '500',
    },
});

export default ExpenseProgressBar;
