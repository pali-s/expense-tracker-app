import { createContext, useContext, useState, useEffect } from 'react';
import { signin } from '../services/authService';
import { saveToken } from '../services/tokenService';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginResult = {
    success: boolean;
    message?: string;
};

type AuthContextType = {
    isAuthenticated: boolean;
    login: (userData: any) => Promise<LoginResult>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('user_token');
            if (token) {
                setIsAuthenticated(true);
            }
        };

        checkToken();
    }, []);

    const login = async (userData: any): Promise<LoginResult> => {
        try {
            const response = await signin(userData);
            // console.log("Login response(auth):", response);
            // If signin returns a success or token or user object, check here
            if (response?.token) {
                await saveToken(response.token);
                setIsAuthenticated(true);
                return { success: true };
            } else {
                // Optionally handle incorrect credentials
                console.log("Login failed: Invalid credentials");
                return { success: false };
            }
        } catch (error) {
            console.log("Login failed:", error);
            return { success: false };
        }
    };


    const logout = async () => {
        await AsyncStorage.removeItem('user_token');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
