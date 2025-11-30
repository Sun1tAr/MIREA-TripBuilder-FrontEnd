// src/context/AuthContext.jsx
import React, { createContext, useCallback, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        id: 1,
        firstName: 'Иван',
        lastName: 'Иванов',
        email: 'ivan@example.com',
        phone: '+7 (999) 123-45-67',
        avatar: '👤',
        isAuthenticated: true,
    });

    const [loading, setLoading] = useState(false);

    const login = useCallback(async (email, password) => {
        setLoading(true);
        try {
            // Симуляция API запроса
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setUser((prev) => ({ ...prev, isAuthenticated: true }));
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        setUser((prev) => ({ ...prev, isAuthenticated: false }));
    }, []);

    const updateProfile = useCallback((updates) => {
        setUser((prev) => ({ ...prev, ...updates }));
    }, []);

    const value = {
        user,
        loading,
        login,
        logout,
        updateProfile,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
