import api from "./api";
import { ADD_EXPENSE, GET_EXPENSE_BY_USER,GET_TOTAL_EXPENSE,DELETE_EXPENSE } from "./api";

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
const getTotalExpense = async () => {
    try {
        const response = await api.get(GET_TOTAL_EXPENSE);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Failed to fetch total expense");
    }
}
const deleteExpense = async (expenseId) => {
    try {
        console.log("Deleting expense with ID:", expenseId);
        const response = await api.delete(DELETE_EXPENSE.replace(':id', expenseId));
        if (response.status === 200) {
            return { message: "Expense deleted successfully" };
        } else {
            throw new Error("Failed to delete expense");
        }
    } catch (error) {
        throw new Error(error.response.data.message || "Failed to delete expense");
    }
}
export { addExpense, getExpensesByUser,getTotalExpense, deleteExpense };

