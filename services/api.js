import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "http://192.168.1.94:5000/api";

export const REGISTER = "/auth/register";
export const LOGIN = "/auth/login";
export const GET_PROFILE = "/auth/profile";

export const ADD_EXPENSE = "/expense";
export const GET_EXPENSE_BY_USER = "/expense/expenseByID";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("user_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default api;