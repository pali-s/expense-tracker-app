import React, { createContext, useContext, useEffect, useState } from 'react';
import { getBudgetByUser, createBudget as createBudgetAPI, updateBudgetByUser as updateBudgetAPI } from '@/services/budgetService';

type BudgetType = {
    _id: string;
    amount: number;
    duration: string;
    user: string;
    startDate: Date;
    endDate?: Date;
};

type BudgetContextType = {
    budget: BudgetType | null;
    hasBudget: boolean;
    budgetExpired: boolean;
    fetchBudget: () => Promise<void>;
    createBudget: (data: Omit<BudgetType, '_id' | 'user'>) => Promise<void>;
    updateBudget: (data: Partial<BudgetType>) => Promise<void>;
};

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [budget, setBudget] = useState<BudgetType | null>(null);
    const [budgetExpired, setBudgetExpired] = useState(false);

    const checkBudgetExpiration = (budget: BudgetType | null) => {
        if (!budget || !budget.endDate) return false;
        const now = new Date();
        return new Date(budget.endDate) < now;
    };

    const fetchBudget = async () => {
        try {
            const res = await getBudgetByUser();
            if (res && res.length > 0) {
                const budget = res[0];
                setBudget(budget);
                setBudgetExpired(checkBudgetExpiration(budget));
            } else {
                setBudget(null);
                setBudgetExpired(false);
            }
        } catch (error) {
            console.error('Failed to fetch budget:', error);
            setBudget(null);
            setBudgetExpired(false);
        }
    };


    const createBudget = async (data: Omit<BudgetType, '_id' | 'user'>) => {
        try {
            const res = await createBudgetAPI(data);
            setBudget(res.budget); // assuming your API returns `{ budget: {...} }`
        } catch (error) {
            console.error('Error creating budget:', error);
            throw error;
        }
    };

    const updateBudget = async (data: Partial<BudgetType>) => {
        try {
            const res = await updateBudgetAPI(data);
            setBudget(res.budget); // assuming API response is similar
            // console.log("budget context set:",res.budget);
        } catch (error) {
            console.error('Error updating budget:', error);
            throw error;
        }
    };
    const hasBudget = !!budget;
    useEffect(() => {
        fetchBudget(); // fetch budget when app starts
    }, []);

    return (
        <BudgetContext.Provider value={{ budget, hasBudget, createBudget, updateBudget, fetchBudget, budgetExpired }}>
            {children}
        </BudgetContext.Provider>
    );
};

export const useBudgetContext = () => {
    const context = useContext(BudgetContext);
    if (!context) {
        throw new Error('useBudget must be used within a BudgetProvider');
    }
    return context;
};
