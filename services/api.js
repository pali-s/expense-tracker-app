import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "http://192.168.1.94:5000/api";

export const REGISTER = "/auth/register";
export const LOGIN = "/auth/login";
export const GET_PROFILE = "/auth/profile";

export const ADD_EXPENSE = "/expense";
export const GET_EXPENSE_BY_USER = "/expense/expenseByID";
export const GET_TOTAL_EXPENSE = "/expense/totalExpense";
export const DELETE_EXPENSE = "/expense/:id";

export const CREATE_BUDGET = "/budget";
export const GET_BUDGET_BY_USER = "/budget/budgetByID";
export const UPDATE_BUDGET_BY_USER = "/budget/updateBudget";

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