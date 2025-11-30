// src/context/UIContext.jsx
import React, { createContext, useCallback, useState } from 'react';

export const UIContext = createContext();

export const UIProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [modals, setModals] = useState({});
    const [sidebar, setSidebar] = useState({ isOpen: false });

    const addNotification = useCallback((message, type = 'info', duration = 3000) => {
        const id = Date.now();
        const notification = { id, message, type };
        setNotifications((prev) => [...prev, notification]);

        setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, duration);
    }, []);

    const openModal = useCallback((modalName) => {
        setModals((prev) => ({ ...prev, [modalName]: true }));
    }, []);

    const closeModal = useCallback((modalName) => {
        setModals((prev) => ({ ...prev, [modalName]: false }));
    }, []);

    const toggleSidebar = useCallback(() => {
        setSidebar((prev) => ({ ...prev, isOpen: !prev.isOpen }));
    }, []);

    const value = {
        notifications,
        addNotification,
        modals,
        openModal,
        closeModal,
        sidebar,
        toggleSidebar,
    };

    return (
        <UIContext.Provider value={value}>{children}</UIContext.Provider>
    );
};
