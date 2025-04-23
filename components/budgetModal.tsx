import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useBudgetContext } from '@/context/budgetcontext';

type Props = {
    visible: boolean;
    onClose: () => void;
    onSuccess: () => void;
    isEditing?: boolean;
};

const BudgetModal: React.FC<Props> = ({ visible, onClose, onSuccess, isEditing = false }) => {
    const { budget, hasBudget, createBudget, updateBudget } = useBudgetContext();
    const [amount, setAmount] = useState('');
    const [duration, setDuration] = useState('1 week');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    const handleSubmit = async () => {
        if (!amount || !duration) {
            Alert.alert('Missing Fields', 'Please fill in all fields');
            return;
        }

        try {
            if (isEditing==true&&hasBudget) {
                // console.log('Editing budget:', budget?.amount);
                await updateBudget({ amount: parseFloat(amount), duration, startDate });
                Alert.alert('Success', 'Budget updated successfully');
                onSuccess();
                setAmount('');
                setDuration('');
                setStartDate(new Date());
            }
            else{
                await createBudget({ amount: parseFloat(amount), duration, startDate });
            Alert.alert('Success', 'Budget set successfully');
            onSuccess();
                setAmount('');
                setDuration('');
                setStartDate(new Date());
            }
            
        } catch (error) {
            console.error('Error setting budget:', error);
            Alert.alert('Something went wrong. Try again!');
        }
    };

    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (event.type === 'set' && selectedDate) {
            if (selectedDate <= new Date()) {
                setStartDate(selectedDate);
            } else {
                Alert.alert('Invalid Date', 'Future dates are not allowed');
            }
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.header}>{isEditing ? 'Edit Budget' : 'Set Your Budget 💰'}</Text>
                    <Text style={styles.label}>Amount</Text>
                    <TextInput
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType="numeric"
                        placeholder="Enter budget amount"
                        style={styles.input}
                    />
                    <Text style={styles.label}>Start Date</Text>
                    <TouchableOpacity
                        style={styles.dateInput}
                        onPress={() => setShowDatePicker(true)}
                    >
                        <Text>{startDate.toISOString().split('T')[0]}</Text>
                    </TouchableOpacity>

                    {showDatePicker && (
                        <DateTimePicker
                            value={startDate}
                            mode="date"
                            display="default"
                            maximumDate={new Date()}
                            onChange={handleDateChange}
                        />
                    )}
                    <Text style={styles.label}>Duration</Text>
                    <TextInput
                        style={styles.input}
                        value={duration}
                        onChangeText={setDuration}
                        placeholder="e.g. 1 week, 2 months"
                    />
                    <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                        <Text style={styles.buttonText}>{isEditing ? 'Update' : 'Save'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.cancel}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default BudgetModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: '#00000088',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: '#fff',
        width: '90%',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#ad1457',
    },
    input: {
        width: '100%',
        borderColor: '#ad1457',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#ad1457',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    cancel: {
        color: '#ad1457',
        fontSize: 16,
        fontWeight: '600',
        marginTop: 10,
    },
    label: {
        alignSelf: 'flex-start',
        marginTop: 10,
        fontWeight: '600',
        color: '#ad1457',
    },
    dateInput: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderColor: '#f48fb1',
        borderRadius: 10,
        backgroundColor: '#fce4ec44',
        marginTop: 5,
    },
});
