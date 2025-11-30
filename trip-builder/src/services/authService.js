// src/services/authService.js
import { apiClient } from './api';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

export const authService = {
    // Логин
    login: (email, password) =>
        apiClient.post(API_ENDPOINTS.AUTH_LOGIN, { email, password }),

    // Регистрация
    register: (data) =>
        apiClient.post(API_ENDPOINTS.AUTH_REGISTER, data),

    // Логаут
    logout: () =>
        apiClient.post(API_ENDPOINTS.AUTH_LOGOUT, {}),

    // Получить текущего пользователя
    getCurrentUser: () =>
        apiClient.get(API_ENDPOINTS.AUTH_ME),

    // Обновить профиль
    updateProfile: (data) =>
        apiClient.put(API_ENDPOINTS.AUTH_PROFILE, data),

    // Изменить пароль
    changePassword: (currentPassword, newPassword) =>
        apiClient.post(API_ENDPOINTS.AUTH_CHANGE_PASSWORD, {
            currentPassword,
            newPassword,
        }),
};
