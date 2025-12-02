// src/pages/TodoList.jsx
import React, { useState, useEffect } from 'react';
import './TodoList.css';
import TaskCard from '../components/Common/TaskCard';
import TripModal from '../components/Common/TripModal';
import { handlers } from '../utils/handlers';

const TodoList = () => {
    const [myTrips, setMyTrips] = useState([]);
    const [selectedTripForModal, setSelectedTripForModal] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Загружаем путешествия при монтировании компонента
    useEffect(() => {
        const trips = handlers.getMyTrips();
        console.log('[TODOLIST] Loaded trips:', trips);
        setMyTrips(Array.isArray(trips) ? trips : []);
    }, []);

    // Загружаем задачи из localStorage при монтировании
    const [tasks, setTasks] = useState(() => {
        const saved = handlers.getTasksFromStorage();
        console.log('[TODOLIST] Loaded tasks from storage:', saved);
        return saved;
    });

    const [deletedTasks, setDeletedTasks] = useState(() => {
        const trash = handlers.getTrashFromStorage();
        console.log('[TODOLIST] Loaded trash from storage:', trash);
        return trash;
    });

    const [newTaskColumn, setNewTaskColumn] = useState('before');
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskTripId, setNewTaskTripId] = useState(myTrips.length > 0 ? myTrips[0].id.toString() : '');

    // Сохраняем задачи в localStorage при изменении
    useEffect(() => {
        handlers.saveTasksToStorage(tasks);
    }, [tasks]);

    // Сохраняем корзину в localStorage при изменении
    useEffect(() => {
        handlers.saveTrashToStorage(deletedTasks);
    }, [deletedTasks]);

    const handleAddTask = () => {
        if (newTaskTitle.trim() && newTaskTripId) {
            const selectedTrip = myTrips.find(trip => trip.id === parseInt(newTaskTripId));

            if (selectedTrip) {
                const newTask = {
                    id: Math.max(...Object.values(tasks).flat().map((t) => t.id), 0) + 1,
                    title: newTaskTitle,
                    description: '',
                    tripId: selectedTrip.id,
                    tripName: selectedTrip.title,
                    tripCountry: selectedTrip.country,
                    priority: 'medium',
                };

                setTasks((prev) => ({
                    ...prev,
                    [newTaskColumn]: [...prev[newTaskColumn], newTask],
                }));

                setNewTaskTitle('');
                handlers.onAddTask(newTaskColumn);
            }
        } else if (!newTaskTripId) {
            alert('Пожалуйста, выберите путешествие');
        }
    };

    const handleDeleteTask = (id, column) => {
        const task = tasks[column].find((t) => t.id === id);
        setTasks((prev) => ({
            ...prev,
            [column]: prev[column].filter((t) => t.id !== id),
        }));
        handlers.addTaskToTrash(task, column);
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
                handlers.clearTrash();
            }
        }
    };

    // Обработчик клика по названию путешествия
    const handleTripNameClick = (tripId) => {
        const trip = myTrips.find(t => t.id === tripId);
        if (trip) {
            setSelectedTripForModal(trip);
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTripForModal(null);
    };

    const columns = [
        { id: 'before', title: 'Перед путешествием', icon: '📋' },
        { id: 'during', title: 'Во время путешествия', icon: '✈️' },
        { id: 'after', title: 'После путешествия', icon: '📸' },
    ];

    return (
        <div className="todo-list">
            <div className="todo-header">
                <h1 className="todo-title">✈️ Список дел путешествий</h1>
                <p className="todo-subtitle">
                    Планируйте и отслеживайте задачи для ваших путешествий
                </p>
            </div>

            {/* Форма добавления задачи */}
            <div className="todo-add-task">
                {/* Селект путешествия */}
                <select
                    value={newTaskTripId}
                    onChange={(e) => setNewTaskTripId(e.target.value)}
                    className="todo-trip-select"
                >
                    <option value="">-- Выберите путешествие --</option>
                    {myTrips.map((trip) => (
                        <option key={trip.id} value={trip.id}>
                            {trip.title} ({trip.country})
                        </option>
                    ))}
                </select>

                {/* Селект колонки */}
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

                {/* Инпут для названия задачи */}
                <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleAddTask();
                        }
                    }}
                    placeholder="Введите название задачи..."
                    className="todo-input"
                />

                {/* Кнопка добавления */}
                <button onClick={handleAddTask} className="todo-add-btn">
                    + Добавить
                </button>
            </div>

            {/* Три колонки задач */}
            <div className="todo-columns">
                {columns.map((column) => (
                    <div key={column.id} className="todo-column">
                        <div className="todo-column-header">
                            <h2 className="todo-column-title">
                                {column.icon} {column.title}
                            </h2>
                            <span className="todo-column-count">
                                {tasks[column.id].length}
                            </span>
                        </div>

                        <div className="todo-column-tasks">
                            {tasks[column.id].length === 0 ? (
                                <div className="todo-column-empty">
                                    Нет задач
                                </div>
                            ) : (
                                tasks[column.id].map((task) => (
                                    <TaskCard
                                        key={task.id}
                                        id={task.id}
                                        title={task.title}
                                        description={task.description}
                                        tripName={task.tripName}
                                        tripId={task.tripId}
                                        priority={task.priority}
                                        onDelete={() => handleDeleteTask(task.id, column.id)}
                                        onTripNameClick={() => handleTripNameClick(task.tripId)}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Корзина */}
            {deletedTasks.length > 0 && (
                <div className="todo-trash">
                    <div className="todo-trash-header">
                        <h3 className="todo-trash-title">
                            🗑️ Корзина ({deletedTasks.length})
                        </h3>
                        <button
                            onClick={handleClearTrash}
                            className="todo-clear-trash-btn"
                        >
                            Очистить корзину
                        </button>
                    </div>

                    <div className="todo-trash-tasks">
                        {deletedTasks.map((task) => (
                            <div key={task.id} className="todo-trash-task">
                                <span className="todo-trash-task-title">
                                    {task.title}
                                </span>
                                <button
                                    onClick={() => handleRestoreTask(task.id)}
                                    className="todo-restore-btn"
                                >
                                    Восстановить
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Модальное окно путешествия */}
            {isModalOpen && selectedTripForModal && (
                <TripModal
                    trip={selectedTripForModal}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default TodoList;
