// src/context/TasksContext.jsx
import React, { createContext, useCallback, useState } from 'react';

export const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = useState({
        before: [],
        during: [],
        after: [],
    });

    const [deletedTasks, setDeletedTasks] = useState([]);

    const addTask = useCallback((column, taskData) => {
        const newTask = {
            id: Date.now(),
            ...taskData,
            completed: false,
        };
        setTasks((prev) => ({
            ...prev,
            [column]: [...prev[column], newTask],
        }));
        return newTask;
    }, []);

    const deleteTask = useCallback((id, column) => {
        const task = tasks[column]?.find((t) => t.id === id);
        if (task) {
            setTasks((prev) => ({
                ...prev,
                [column]: prev[column].filter((t) => t.id !== id),
            }));
            setDeletedTasks((prev) => [...prev, { ...task, column }]);
        }
    }, [tasks]);

    const restoreTask = useCallback((id) => {
        const deletedTask = deletedTasks.find((t) => t.id === id);
        if (deletedTask) {
            const { column, ...taskData } = deletedTask;
            setTasks((prev) => ({
                ...prev,
                [column]: [...prev[column], taskData],
            }));
            setDeletedTasks((prev) => prev.filter((t) => t.id !== id));
        }
    }, [deletedTasks]);

    const toggleTaskComplete = useCallback((id, column) => {
        setTasks((prev) => ({
            ...prev,
            [column]: prev[column].map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            ),
        }));
    }, []);

    const value = {
        tasks,
        deletedTasks,
        addTask,
        deleteTask,
        restoreTask,
        toggleTaskComplete,
    };

    return (
        <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
    );
};
