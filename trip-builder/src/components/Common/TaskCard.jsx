// src/components/Common/TaskCard.jsx
import React from 'react';
import './TaskCard.css';
import { handlers } from '../../utils/handlers';

const TaskCard = ({
                      id,
                      title,
                      description,
                      tripName,
                      tripId,
                      priority = 'medium',
                      completed = false,
                      isDeleted = false,
                      onDelete,
                      onRestore,
                      onTripNameClick,
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

    const cardClass = `task-card ${isCompleted ? 'task-card--completed' : ''} ${
        isDeleted ? 'task-card--deleted' : ''
    }`;

    return (
        <div className={cardClass}>
            {/* Чекбокс */}
            <div className="task-card-checkbox">
                <input
                    type="checkbox"
                    id={`task-${id}`}
                    className="task-card-checkbox-input"
                    checked={isCompleted}
                    onChange={handleToggleComplete}
                />
                <label
                    htmlFor={`task-${id}`}
                    className="task-card-checkbox-label"
                ></label>
            </div>

            {/* Содержимое */}
            <div className="task-card-content">
                <h3 className="task-card-title">{title}</h3>

                {description && (
                    <p className="task-card-description">{description}</p>
                )}

                {tripName && (
                    <button
                        onClick={() => onTripNameClick && onTripNameClick()}
                        className="task-card-trip"
                        title="Открыть информацию о путешествии"
                    >
                        ✈️ {tripName}
                    </button>
                )}
            </div>

            {/* Приоритет */}
            <div className="task-card-priority">
                <select
                    value={currentPriority}
                    onChange={handlePriorityChange}
                    className={`task-card-priority-select task-card-priority-select--${currentPriority}`}
                    title="Выберите приоритет"
                >
                    {priorityOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.icon} {option.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Действия */}
            <div className="task-card-actions">
                {onDelete && (
                    <button
                        onClick={onDelete}
                        className="task-card-btn task-card-btn--delete"
                        title="Удалить задачу"
                    >
                        🗑️
                    </button>
                )}

                {onRestore && (
                    <button
                        onClick={onRestore}
                        className="task-card-btn task-card-btn--restore"
                        title="Восстановить задачу"
                    >
                        ↩️
                    </button>
                )}
            </div>
        </div>
    );
};

export default TaskCard;
