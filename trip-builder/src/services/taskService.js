// src/services/taskService.js
import { apiClient } from './api';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

export const taskService = {
    // Получить все задачи
    getAll: () => apiClient.get(API_ENDPOINTS.TASKS),

    // Получить задачи по колонке
    getByColumn: (column) =>
        apiClient.get(`${API_ENDPOINTS.TASKS}?column=${column}`),

    // Создать задачу
    create: (data) => apiClient.post(API_ENDPOINTS.TASKS, data),

    // Обновить задачу
    update: (id, data) => apiClient.put(`${API_ENDPOINTS.TASKS}/${id}`, data),

    // Удалить задачу
    delete: (id) => apiClient.delete(`${API_ENDPOINTS.TASKS}/${id}`),

    // Отметить как выполненную
    complete: (id) =>
        apiClient.put(`${API_ENDPOINTS.TASKS}/${id}`, { completed: true }),
};
