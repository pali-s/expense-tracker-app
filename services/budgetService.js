import api from "./api";
import { CREATE_BUDGET, GET_BUDGET_BY_USER, UPDATE_BUDGET_BY_USER } from "./api";

const createBudget = async (budgetData) => {
    try {
        const response = await api.post(CREATE_BUDGET, budgetData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Failed to create budget");
    }
}
const getBudgetByUser = async () => {
    try {
        const response = await api.get(GET_BUDGET_BY_USER);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Failed to fetch budgets");
    }
}
const updateBudgetByUser = async (budgetData) => {
    try{
        const response = await api.put(UPDATE_BUDGET_BY_USER, budgetData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Failed to update budget");
    }
}

export { createBudget, getBudgetByUser,updateBudgetByUser };