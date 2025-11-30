// src/components/Common/TaskCard.jsx
import React from 'react';
import './TaskCard.css';
import { handlers } from '../../utils/handlers';

const TaskCard = ({
                      id,
                      title,
                      description,
                      tripName,
                      priority = 'medium',
                      completed = false,
                      isDeleted = false,
                      onDelete,
                      onRestore,
                  }) => {
    const [currentPriority, setCurrentPriority] = React.useState(priority);
    const [isCompleted, setIsCompleted] = React.useState(completed);

    const priorityOptions = [
        { value: 'high', label: 'Высокий', icon: '🔴' },
        { value: 'medium', label: 'Средний', icon: '🟡' },
        { value: 'low', label: 'Низкий', icon: '🟢' },
    ];

    const handlePriorityChange = (e) => {
        const newPriority = e.target.value;
        setCurrentPriority(newPriority);
        handlers.onChangePriority(id, newPriority);
    };

    const handleToggleComplete = () => {
        const newCompleted = !isCompleted;
        setIsCompleted(newCompleted);
        handlers.onToggleTaskComplete(id, newCompleted);
    };

    const currentPriorityData = priorityOptions.find(
        (p) => p.value === currentPriority
    );

    return (
        <div
            className={`task-card ${isCompleted ? 'task-card--completed' : ''} ${
                isDeleted ? 'task-card--deleted' : ''
            }`}
        >
            {/* Чекбокс завершения */}
            <div className="task-card-checkbox">
                <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={handleToggleComplete}
                    className="task-card-checkbox-input"
                    id={`task-${id}`}
                />
                <label htmlFor={`task-${id}`} className="task-card-checkbox-label" />
            </div>

            {/* Основная информация */}
            <div className="task-card-content">
                <h4 className="task-card-title">{title}</h4>
                {description && (
                    <p className="task-card-description">{description}</p>
                )}
                {tripName && (
                    <div className="task-card-trip">
                        🧭 {tripName}
                    </div>
                )}
            </div>

            {/* Приоритет */}
            <div className="task-card-priority">
                <select
                    value={currentPriority}
                    onChange={handlePriorityChange}
                    className={`task-card-priority-select task-card-priority-select--${currentPriority}`}
                    disabled={isDeleted}
                >
                    {priorityOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.icon} {option.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Кнопки действия */}
            <div className="task-card-actions">
                {isDeleted ? (
                    <button
                        onClick={() => onRestore?.(id)}
                        className="task-card-btn task-card-btn--restore"
                        title="Восстановить"
                    >
                        ↩️
                    </button>
                ) : (
                    <button
                        onClick={() => onDelete?.(id)}
                        className="task-card-btn task-card-btn--delete"
                        title="Удалить"
                    >
                        🗑️
                    </button>
                )}
            </div>
        </div>
    );
};

export default TaskCard;
