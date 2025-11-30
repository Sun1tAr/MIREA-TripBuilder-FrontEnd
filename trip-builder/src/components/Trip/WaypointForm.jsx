// src/components/Trip/WaypointForm.jsx
import React from 'react';
import './WaypointForm.css';

const WaypointForm = ({ index, waypoint, onChange, onRemove, canRemove }) => {
    const handleChange = (field, value) => {
        onChange(waypoint.id, field, value);
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
                        type="number"
                        placeholder="Широта"
                        value={waypoint.latitude}
                        onChange={(e) => handleChange('latitude', e.target.value)}
                        step="0.0001"
                        className="waypoint-form-input waypoint-form-input--half"
                    />
                    <input
                        type="number"
                        placeholder="Долгота"
                        value={waypoint.longitude}
                        onChange={(e) => handleChange('longitude', e.target.value)}
                        step="0.0001"
                        className="waypoint-form-input waypoint-form-input--half"
                    />
                </div>

                {/* Длительность */}
                <div className="waypoint-form-group">
                    <input
                        type="text"
                        placeholder="Длительность (часы, дни)"
                        value={waypoint.duration}
                        onChange={(e) => handleChange('duration', e.target.value)}
                        className="waypoint-form-input"
                    />
                </div>

                {/* Заметки */}
                <textarea
                    placeholder="Заметки..."
                    value={waypoint.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    className="waypoint-form-textarea"
                />

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
