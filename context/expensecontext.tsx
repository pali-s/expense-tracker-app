import React, { createContext, useContext, useState } from 'react';

type ExpenseContextType = {
    refreshKey: number;
    triggerRefresh: () => void;
};

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [refreshKey, setRefreshKey] = useState(0);

    const triggerRefresh = () => setRefreshKey(prev => prev + 1);

    return (
        <ExpenseContext.Provider value={{ refreshKey, triggerRefresh }}>
            {children}
        </ExpenseContext.Provider>
    );
};

export const useExpenseContext = () => {
    const context = useContext(ExpenseContext);
    if (!context) throw new Error('useExpenseContext must be used within an ExpenseProvider');
    return context;
};
