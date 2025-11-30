// src/services/tripService.js
import { apiClient } from './api';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

export const tripService = {
    // Получить все путешествия
    getAll: () => apiClient.get(API_ENDPOINTS.TRIPS),

    // Получить путешествие по ID
    getById: (id) => apiClient.get(`${API_ENDPOINTS.TRIPS}/${id}`),

    // Создать путешествие
    create: (data) => apiClient.post(API_ENDPOINTS.TRIPS, data),

    // Обновить путешествие
    update: (id, data) => apiClient.put(`${API_ENDPOINTS.TRIPS}/${id}`, data),

    // Удалить путешествие
    delete: (id) => apiClient.delete(`${API_ENDPOINTS.TRIPS}/${id}`),

    // Лайкнуть путешествие
    like: (id) => apiClient.post(`${API_ENDPOINTS.TRIPS}/${id}/like`, {}),

    // Получить избранные
    getFavorites: () => apiClient.get(API_ENDPOINTS.TRIPS_FAVORITES),
};
