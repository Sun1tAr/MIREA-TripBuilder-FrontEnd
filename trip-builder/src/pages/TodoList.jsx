// src/pages/TodoList.jsx
import React, { useState } from 'react';
import './TodoList.css';
import TaskCard from '../components/Common/TaskCard';
import { handlers } from '../utils/handlers';

const TodoList = () => {
    const [tasks, setTasks] = useState({
        before: [
            {
                id: 1,
                title: 'Оформить паспорт',
                description: 'Проверить срок действия',
                tripName: 'Европа',
                priority: 'high',
            },
            {
                id: 2,
                title: 'Забронировать отель',
                description: 'На даты 15-20 августа',
                tripName: 'Франция',
                priority: 'high',
            },
        ],
        during: [
            {
                id: 3,
                title: 'Посетить Эйфелеву башню',
                description: 'Подняться на вершину',
                tripName: 'Франция',
                priority: 'medium',
            },
            {
                id: 4,
                title: 'Попробовать местную кухню',
                description: 'Макароны, сыр, вино',
                tripName: 'Франция',
                priority: 'low',
            },
        ],
        after: [
            {
                id: 5,
                title: 'Обработать фотографии',
                description: 'Загрузить на облако',
                tripName: 'Франция',
                priority: 'low',
            },
        ],
    });

    const [deletedTasks, setDeletedTasks] = useState([]);
    const [newTaskColumn, setNewTaskColumn] = useState('before');
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const handleAddTask = () => {
        if (newTaskTitle.trim()) {
            const newTask = {
                id:
                    Math.max(...Object.values(tasks).flat().map((t) => t.id), 0) + 1,
                title: newTaskTitle,
                description: '',
                tripName: '',
                priority: 'medium',
            };
            setTasks((prev) => ({
                ...prev,
                [newTaskColumn]: [...prev[newTaskColumn], newTask],
            }));
            setNewTaskTitle('');
            handlers.onAddTask(newTaskColumn);
        }
    };

    const handleDeleteTask = (id, column) => {
        const task = tasks[column].find((t) => t.id === id);
        setTasks((prev) => ({
            ...prev,
            [column]: prev[column].filter((t) => t.id !== id),
        }));
        setDeletedTasks((prev) => [...prev, { ...task, column }]);
    };

    const handleRestoreTask = (id) => {
        const deletedTask = deletedTasks.find((t) => t.id === id);
        if (deletedTask) {
            const { column, ...taskData } = deletedTask;
            setTasks((prev) => ({
                ...prev,
                [column]: [...prev[column], taskData],
            }));
            setDeletedTasks((prev) => prev.filter((t) => t.id !== id));
        }
    };

    const handleClearTrash = () => {
        if (deletedTasks.length > 0) {
            const confirmDelete = window.confirm(
                `Вы уверены? Это удалит ${deletedTasks.length} задач(и) навсегда.`
            );
            if (confirmDelete) {
                setDeletedTasks([]);
                handlers.onClearTrash();
            }
        }
    };

    const columns = [
        { id: 'before', title: 'Перед путешествием', icon: '📋' },
        { id: 'during', title: 'Во время путешествия', icon: '✈️' },
        { id: 'after', title: 'После путешествия', icon: '📸' },
    ];

    return (
        <div className="todo-list">
            {/* Заголовок */}
            <div className="todo-header">
                <h1 className="todo-title">✅ Список дел</h1>
                <p className="todo-subtitle">
                    Планируйте и отслеживайте задачи для ваших путешествий
                </p>
            </div>

            {/* Добавление новой задачи */}
            <div className="todo-add-task">
                <select
                    value={newTaskColumn}
                    onChange={(e) => setNewTaskColumn(e.target.value)}
                    className="todo-column-select"
                >
                    {columns.map((col) => (
                        <option key={col.id} value={col.id}>
                            {col.icon} {col.title}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                    placeholder="Добавьте новую задачу..."
                    className="todo-input"
                />
                <button onClick={handleAddTask} className="todo-add-btn">
                    ➕ Добавить
                </button>
            </div>

            {/* Три колонки */}
            <div className="todo-columns">
                {columns.map((column) => (
                    <div key={column.id} className="todo-column">
                        <div className="todo-column-header">
                            <h2 className="todo-column-title">
                                {column.icon} {column.title}
                            </h2>
                            <span className="todo-column-count">{tasks[column.id].length}</span>
                        </div>

                        {tasks[column.id].length > 0 ? (
                            <div className="todo-column-tasks">
                                {tasks[column.id].map((task) => (
                                    <TaskCard
                                        key={task.id}
                                        {...task}
                                        onDelete={() => handleDeleteTask(task.id, column.id)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="todo-column-empty">
                                <p>Нет задач</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Корзина удаленных задач */}
            {deletedTasks.length > 0 && (
                <div className="todo-trash">
                    <div className="todo-trash-header">
                        <h3 className="todo-trash-title">
                            🗑️ Корзина ({deletedTasks.length})
                        </h3>
                        <button
                            onClick={handleClearTrash}
                            className="todo-clear-trash-btn"
                            disabled={deletedTasks.length === 0}
                        >
                            🧹 Очистить
                        </button>
                    </div>
                    <div className="todo-trash-tasks">
                        {deletedTasks.map((task) => (
                            <div key={task.id} className="todo-trash-task">
                                <span className="todo-trash-task-title">{task.title}</span>
                                <button
                                    onClick={() => handleRestoreTask(task.id)}
                                    className="todo-restore-btn"
                                >
                                    ↩️ Восстановить
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TodoList;