// src/components/Trip/WaypointForm.jsx

import React from 'react';
import './WaypointForm.css';

const WaypointForm = ({ index, waypoint, onChange, onRemove, canRemove }) => {
    const handleChange = (field, value) => {
        onChange(waypoint.id, field, value);
    };

    const handleNumberChangeWithDotLimit = (field, e) => {
        let value = e.target.value;

        // Удаляем все символы, кроме цифр и точки
        value = value.replace(/[^0-9.]/g, '');

        // Убираем лишние точки (оставляем только первую)
        const parts = value.split('.');
        if (parts.length > 2) {
            value = parts[0] + '.' + parts.slice(1).join('');
        }

        // Вставляем точку после 2 цифр, если её нет
        if (value.length > 2 && !value.includes('.')) {
            value = value.slice(0, 2) + '.' + value.slice(2);
        }

        // Ограничение на знаки после точки (максимум 4)
        if (value.includes('.')) {
            const [integerPart, decimalPart = ''] = value.split('.');
            const limitedDecimalPart = decimalPart.slice(0, 6); // лимит 4 знака
            value = integerPart + (limitedDecimalPart ? '.' + limitedDecimalPart : '.');
        }

        handleChange(field, value);
    };

    return (
        <div className="waypoint-form">
            {/* Номер точки */}
            <div className="waypoint-form-number">{index + 1}</div>

            <div className="waypoint-form-content">
                {/* Город/Место */}
                <div className="waypoint-form-group">
                    <input
                        type="text"
                        placeholder="Город/Место"
                        value={waypoint.city}
                        onChange={(e) => handleChange('city', e.target.value)}
                        className="waypoint-form-input"
                    />
                </div>

                {/* Координаты */}
                <div className="waypoint-form-row">
                    <input
                        type="text"
                        placeholder="Широта"
                        value={waypoint.latitude}
                        onChange={(e) => handleNumberChangeWithDotLimit('latitude', e)}
                        className="waypoint-form-input waypoint-form-input--half"
                    />
                    <input
                        type="text"
                        placeholder="Долгота"
                        value={waypoint.longitude}
                        onChange={(e) => handleNumberChangeWithDotLimit('longitude', e)}
                        className="waypoint-form-input waypoint-form-input--half"
                    />
                </div>

                {/* Заметки */}
                <textarea
                    placeholder="Заметки..."
                    value={waypoint.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    className="waypoint-form-textarea"
                />

                {/* Лейбл "Прибытие" + поля */}
                <div className="waypoint-form-group">
                    <label className="waypoint-form-label">Прибытие</label>
                    <div className="waypoint-form-row">
                        <input
                            type="date"
                            value={waypoint.startDate}
                            onChange={(e) => handleChange('startDate', e.target.value)}
                            className="waypoint-form-input waypoint-form-input--half"
                        />
                        <input
                            type="time"
                            value={waypoint.startTime}
                            onChange={(e) => handleChange('startTime', e.target.value)}
                            className="waypoint-form-input waypoint-form-input--half"
                        />
                    </div>
                </div>

                {/* Лейбл "Отбытие" + поля */}
                <div className="waypoint-form-group">
                    <label className="waypoint-form-label">Отбытие</label>
                    <div className="waypoint-form-row">
                        <input
                            type="date"
                            value={waypoint.endDate}
                            onChange={(e) => handleChange('endDate', e.target.value)}
                            className="waypoint-form-input waypoint-form-input--half"
                        />
                        <input
                            type="time"
                            value={waypoint.endTime}
                            onChange={(e) => handleChange('endTime', e.target.value)}
                            className="waypoint-form-input waypoint-form-input--half"
                        />
                    </div>
                </div>

                {/* Preview пребывания */}
                {waypoint.startDate && waypoint.startTime && waypoint.endDate && waypoint.endTime && (() => {
                    const start = new Date(`${waypoint.startDate}T${waypoint.startTime}`);
                    const end = new Date(`${waypoint.endDate}T${waypoint.endTime}`);
                    const diffMs = end - start;
                    if (diffMs < 0) return null;

                    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

                    let durationStr = '';
                    if (diffDays > 0) durationStr += `${diffDays} дн. `;
                    if (diffHours > 0) durationStr += `${diffHours} ч. `;
                    if (diffMinutes > 0) durationStr += `${diffMinutes} мин. `;

                    if (durationStr === '') durationStr = 'меньше минуты';

                    return (
                        <div className="waypoint-form-preview">
                            <span className="waypoint-preview-label">📍 Пребывание:</span>
                            <span className="waypoint-preview-value">{durationStr.trim()}</span>
                        </div>
                    );
                })()}

                {/* Кнопка удаления */}
                {canRemove && (
                    <button
                        onClick={() => onRemove(waypoint.id)}
                        className="waypoint-form-delete-btn"
                    >
                        🗑️ Удалить точку
                    </button>
                )}
            </div>
        </div>
    );
};

export default WaypointForm;
