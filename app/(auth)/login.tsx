import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginSchemaType } from '../../validation/schemas/loginSchema';
import { useToast } from '../../context/toastcontext';
import { useAuth } from '../../context/auth';

const Login = () => {
    const { login } = useAuth();
    const { showToast } = useToast();

    const {
        control,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const handleLogin = async() => {
        const email = getValues('email');
        const password = getValues('password');
        const loginUser = {
            email,
            password,
        };
        const result = await login(loginUser);
        if (result?.success) {
            showToast('💖 Logged in!');
        } else {
            showToast('💔 Invalid credentials');
            return;
        }
    };

    return (
        <View style={styles.form}>
            <Text style={styles.heading}>Welcome Back 💖</Text>

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
                            placeholder="Password"
                            placeholderTextColor="#f48fb1"
                            secureTextEntry
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
                onPress={handleSubmit(handleLogin)}
            >
                <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
        </View >
    );
};

export default Login;

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
