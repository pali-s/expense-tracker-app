import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addExpense } from '../services/expenseService';
import { useExpenseContext } from '@/context/expensecontext';
import {
    Modal,
    View,
    Text,
    TextInput,
    ScrollView,
    Alert,
    TouchableOpacity,
    StyleSheet,
    Switch
} from 'react-native';


type Props = {
    visible: boolean;
    onClose: () => void;
    onSuccess: () => void;
};

const addExpenseForm: React.FC<Props> = ({ visible, onClose, onSuccess }) => {
    const { triggerRefresh } = useExpenseContext();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date()); // Default to today's date
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isExpense, setIsExpense] = useState(false);

    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false); // Hide the picker in all cases
    
        if (event.type === 'set' && selectedDate) {
            if (selectedDate <= new Date()) {
                setDate(selectedDate);
            } else {
                Alert.alert("Invalid Date", "Future dates are not allowed.");
            }
        }
        // No need to handle 'dismissed' explicitly unless you want to do something special
    };
    
    const handleSubmit = async () => {
        if (!title || !description || !category || !amount || !date) {
            Alert.alert('Oops!', 'Please fill in all fields!');
            return;
        }

        const expenseData = {
            title: title,
            description: description,
            category: category,
            amount: parseFloat(amount),
            type: isExpense ? 'expense' : 'income',
            date: date.toISOString().split('T')[0],
        };

        try {
            const res = await addExpense(expenseData);
            console.log('Expense added successfully:', res);
            if (res && res.message === 'Expense created successfully') {
                Alert.alert('💖 Item Saved!', `"${title}" has been added!`);
                onSuccess(); // Call the success function to refresh the list or perform any other action
                onClose(); // Close the modal after successful submission
                triggerRefresh(); // Trigger refresh in the context
                // Optionally clear the form
                setTitle('');
                setDescription('');
                setCategory('');
                setAmount('');
                setDate(new Date());
            }
            else {
                Alert.alert('Oops!', 'Something went wrong. Please try again.');
            }

        }
        catch (error) {
            console.error('Error adding expense:', error);
            Alert.alert('Oops!', 'Something went wrong. Please try again.');
        }
    };

    const handleCancel = () => {
        onClose(); // or use navigation.navigate('Cards') if you have a screen
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.header}>
                    Add Transaction <Text style={styles.icon}>💖</Text>
                </Text>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        placeholder="e.g., Sparkly Sticker"
                        value={title}
                        onChangeText={setTitle}
                        style={styles.input}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        placeholder="Tell us about it..."
                        value={description}
                        onChangeText={setDescription}
                        style={[styles.input, styles.textArea]}
                        multiline
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Category</Text>
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={category}
                            onValueChange={(itemValue) => setCategory(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select a category..." value="" enabled={false} />
                            <Picker.Item label="Food" value="Food" />
                            <Picker.Item label="Transport" value="Transport" />
                            <Picker.Item label="Entertainment" value="Entertainment" />
                            <Picker.Item label="Utilities" value="Utilities" />
                            <Picker.Item label="Others" value="Others" />
                        </Picker>
                    </View>
                </View>

                <View style={styles.inputRow}>
                    <View style={[styles.inputGroup, styles.halfWidth]}>
                        <Text style={styles.label}>Amount</Text>
                        <TextInput
                            placeholder="e.g., 5"
                            value={amount}
                            onChangeText={setAmount}
                            keyboardType="numeric"
                            style={styles.input}
                        />
                    </View>

                    <View style={[styles.inputGroup, styles.halfWidth]}>
                        <Text style={styles.label}>Type</Text>
                        <View style={styles.toggleRow}>
                            <Text style={[styles.typeLabel]}>
                                {isExpense ? 'Expense' : 'Income'}
                            </Text>
                            <Switch
                                value={isExpense}
                                onValueChange={setIsExpense}
                            />
                        </View>
                    </View>
                </View>

                <View style={[styles.inputGroup, styles.halfWidth,{marginBottom:10}]}>
                    <Text style={styles.label}>Date Acquired</Text>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
                        <Text>{date.toISOString().split('T')[0]}</Text>
                    </TouchableOpacity>

                    {showDatePicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            maximumDate={new Date()} // 🚫 No future dates
                            onChange={handleDateChange}
                        />
                    )}
                </View>


                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Save Transaction✨</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleCancel}>
                    <Text style={styles.backLink}>Cancel</Text>
                </TouchableOpacity>
            </ScrollView>
        </Modal>
    );
};

export default addExpenseForm;

const styles = StyleSheet.create({
    toggleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    typeLabel: {
        color: '#ad1457',
        fontSize: 16,
    },
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 30,
        overflow: 'hidden',
        maxHeight: '90%',
    },
    container: {
        backgroundColor: '#ffdde1',
        padding: 20,
        minHeight: '100%',
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: '600',
        color: '#ad1457',
        marginBottom: 30,
        textAlign: 'center',
    },
    icon: {
        fontSize: 24,
    },
    inputGroup: {
        borderColor: '#f48fb1',
        width: '100%',
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#ad1457',
        marginBottom: 5,
        paddingLeft: 5,
    },
    input: {
        backgroundColor: '#fce4ec44',
        borderColor: '#f48fb1',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 18,
        paddingVertical: 12,
        fontSize: 16,
        color: '#ad1457',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    inputRow: {
        flexDirection: 'row',
        gap: 15,
        justifyContent: 'space-between',
    },
    halfWidth: {
        flex: 1,
        marginRight: 8,
    },
    submitButton: {
        backgroundColor: '#e91e63',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#e91e63',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 6,
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 18,
    },
    backLink: {
        marginTop: 20,
        color: '#e91e63',
        fontWeight: '600',
        textDecorationLine: 'underline',
        fontSize: 16,
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#f48fb1',
        borderRadius: 20,
        backgroundColor: '#fce4ec44',
        overflow: 'hidden',
    },

    picker: {
        color: '#ad1457',
        fontSize: 16,
        height: 50,
        width: '100%',
    },

});
