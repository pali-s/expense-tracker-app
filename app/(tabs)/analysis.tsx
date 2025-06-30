// screens/BudgetAnalysis.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BudgetAnalysis = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Budget Analysis</Text>
            <Text>Here's a breakdown of your spending from your last budget period 📊</Text>
            {/* Add charts, tables, summaries, etc. here */}
        </View>
    );
};

export default BudgetAnalysis;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});
