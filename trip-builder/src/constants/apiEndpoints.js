// src/constants/apiEndpoints.js
export const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

export const API_ENDPOINTS = {
    // Путешествия
    TRIPS: '/trips',
    TRIPS_FAVORITES: '/trips/favorites',
    TRIP_DETAIL: (id) => `/trips/${id}`,

    // Задачи
    TASKS: '/tasks',
    TASK_DETAIL: (id) => `/tasks/${id}`,

    // Аутентификация
    AUTH_LOGIN: '/auth/login',
    AUTH_REGISTER: '/auth/register',
    AUTH_LOGOUT: '/auth/logout',
    AUTH_ME: '/auth/me',
    AUTH_PROFILE: '/auth/profile',
    AUTH_CHANGE_PASSWORD: '/auth/change-password',
};
