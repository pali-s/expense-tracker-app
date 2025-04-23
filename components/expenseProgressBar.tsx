import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { useExpenseContext } from '@/context/expensecontext';
import { useBudgetContext } from '@/context/budgetcontext';
import { getTotalExpense } from '@/services/expenseService';

type Props = {
    onEditBudget: () => void;
};

const ExpenseProgressBar: React.FC<Props> = ({ onEditBudget }) => {
    const { refreshKey } = useExpenseContext();
    const{budget}= useBudgetContext();
    const [current, setCurrent] = useState(0);
    const [goal, setGoal] = useState(1);

    useEffect(() => {
        if (budget) {
            setGoal(budget.amount); // 👈 update when context changes
            // console.log('Updated goal from context:', budget.amount);
        }
    }, [budget]);

    useEffect(() => {
        // const fetchBudget = async () => {
        //     try {
        //         const res = await getBudgetByUser();
        //         console.log('Budget response:', res);

        //         if (res && res.length > 0) {
        //             setGoal(res[0].amount);
        //             console.log('Budget:', res[0].amount);
        //         } else {
        //             console.warn('No budget found');
        //         }
        //     } catch (error) {
        //         console.error('Error fetching budget:', error);
        //     }
        // };

        const fetchExpenses = async () => {
            try {
                const res = await getTotalExpense();
                // console.log('Expenses response:', res);
                setCurrent(res.total);
                // console.log('Expenses:', res.total);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };
        fetchExpenses();
        // fetchBudget();
    }, [refreshKey]);


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
            <View style={styles.barContainer}>
                <BlurView intensity={50} tint="light" style={styles.glassBar}>
                    <Animated.View
                        style={[styles.fill, { width: widthAnim, backgroundColor }]}
                    />
                </BlurView>
                <TouchableOpacity onPress={onEditBudget} style={styles.editButton}>
                    <Text style={styles.editText}>Edit Budget</Text>
                </TouchableOpacity>
            </View>
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
    barContainer: {
        width: '90%',
        position: 'relative',
    },

    editButton: {
        position: 'absolute',
        right: 10,
        top: -10,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 5,
        borderColor: '#e91e63',
        borderWidth: 1,
        zIndex: 2,
    },

    editText: {
        fontSize: 12,
        color: '#e91e63',
        fontWeight: '600',
    },

});

export default ExpenseProgressBar;
