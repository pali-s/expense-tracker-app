import api from "./api";
import { ADD_EXPENSE, GET_EXPENSE_BY_USER } from "./api";

const addExpense = async (expenseData) => {
    try {
        const response = await api.post(ADD_EXPENSE, expenseData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Failed to add expense");
    }
}
const getExpensesByUser = async () => {
    try {
        const response = await api.get(GET_EXPENSE_BY_USER);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Failed to fetch expenses");
    }
}

export { addExpense, getExpensesByUser };

