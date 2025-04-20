import React,{useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, SignupSchemaType } from '../../validation/schemas/signUpSchema';
import { useToast } from '../../context/toastcontext';
import { useAuth } from '../../context/auth';
import { register } from '../../services/authService';

const Signup = () => {
    const { showToast } = useToast();
    const { login } = useAuth();
    const {
        control,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<SignupSchemaType>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });
    const handleSignup = () => {
        const name = getValues('name');
        const email = getValues('email');
        const password = getValues('password');
        const registerUser = {
            name,
            email,
            password,
        };
        register(registerUser);
        const loginUser = {
            email,
            password,
        };
        login(loginUser);
        showToast('✨ Signed up successfully!');
    }

    return (
        <View style={styles.form}>
            <Text style={styles.heading}>Join Us ✨</Text>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Name</Text>
                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            placeholder="Enter your name"
                            placeholderTextColor="#f48fb1"
                            value={value}
                            onChangeText={(text: string) => onChange(text as string)}
                            style={styles.input}
                        />
                    )}
                />
                {errors.name?.message && (
                    <Text style={styles.error}>{errors.name.message}</Text>
                )}
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="#f48fb1"
                            value={value}
                            onChangeText={(text: string) => onChange(text as string)}
                            style={styles.input}
                        />
                    )}
                />

                {errors.email?.message && (
                    <Text style={styles.error}>{errors.email.message}</Text>
                )}
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            placeholder="Create a password"
                            secureTextEntry
                            placeholderTextColor="#f48fb1"
                            value={value}
                            onChangeText={(text: string) => onChange(text as string)}
                            style={styles.input}
                        />
                    )}
                />
                {errors.password?.message && (
                    <Text style={styles.error}>{errors.password.message}</Text>
                )}
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit(handleSignup)}
            >
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Signup;

const styles = StyleSheet.create({
    form: {
        gap: 20,
    },
    heading: {
        fontSize: 24,
        color: '#ad1457',
        textAlign: 'center',
        marginBottom: 10,
    },
    inputGroup: {
        gap: 5,
    },
    label: {
        color: '#ec407a',
        fontWeight: '600',
    },
    input: {
        backgroundColor: '#fce4ec44',
        borderRadius: 20,
        borderColor: '#f48fb1',
        borderWidth: 1,
        padding: 12,
    },
    button: {
        backgroundColor: '#e91e63',
        padding: 15,
        borderRadius: 25,
        marginTop: 10,
        shadowColor: '#e91e63',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '600',
    },
    error: {
        color: '#d32f2f',
        fontSize: 12,
        marginTop: 5,
    },
});
