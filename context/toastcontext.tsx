import React, {createContext, useContext, useState, ReactNode} from 'react';
import Toast from '../components/Toast';

type ToastContextType = {
    showToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextType|undefined>(undefined);

export const useToast = () => {
    const context= useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}

export const ToastProvider = ({children}: {children: ReactNode}) => {
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const showToast = (message: string) => {
        setToastMessage(message);
        setToastVisible(true);
        setTimeout(() => {
            setToastVisible(false);
        }, 2000); // Toast will be visible for 2 seconds
    };

    return (
        <ToastContext.Provider value={{showToast}}>
            {children}
            <Toast visible={toastVisible} message={toastMessage} onHide={() => setToastVisible(false)} />
        </ToastContext.Provider>
    );
}