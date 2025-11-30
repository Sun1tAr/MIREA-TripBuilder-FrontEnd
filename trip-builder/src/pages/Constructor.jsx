// src/pages/Constructor.jsx
import React, { useState } from 'react';
import './Constructor.css';
import MapPreview from '../components/Trip/MapPreview';
import WaypointForm from '../components/Trip/WaypointForm';
import { handlers } from '../utils/handlers';

const Constructor = () => {
    const [routeData, setRouteData] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        isPublic: false,
        image: '',
    });

    const [waypoints, setWaypoints] = useState([
        {
            id: 1,
            city: '',
            latitude: '',
            longitude: '',
            duration: '',
            notes: '',
        },
    ]);

    const handleRouteChange = (field, value) => {
        setRouteData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleWaypointChange = (id, field, value) => {
        setWaypoints((prev) =>
            prev.map((wp) => (wp.id === id ? { ...wp, [field]: value } : wp))
        );
    };

    const handleAddWaypoint = () => {
        const newId = Math.max(...waypoints.map((wp) => wp.id), 0) + 1;
        setWaypoints((prev) => [
            ...prev,
            {
                id: newId,
                city: '',
                latitude: '',
                longitude: '',
                duration: '',
                notes: '',
            },
        ]);
        handlers.onAddWaypoint(newId);
    };

    const handleRemoveWaypoint = (id) => {
        setWaypoints((prev) => prev.filter((wp) => wp.id !== id));
    };

    const handleCreateRoute = () => {
        handlers.onCreateRoute({
            ...routeData,
            waypoints,
        });
        alert('Маршрут создан! (Заглушка)');
    };

    return (
        <div className="constructor">
            {/* Заголовок */}
            <div className="constructor-header">
                <h1 className="constructor-title">🧭 Конструктор маршрутов</h1>
                <p className="constructor-subtitle">
                    Создайте новый маршрут путешествия и добавьте маршрутные точки
                </p>
            </div>

            {/* Основная сетка */}
            <div className="constructor-grid">
                {/* Левая колонка: Форма */}
                <div className="constructor-left">
                    {/* Основная информация */}
                    <div className="constructor-section">
                        <h2 className="constructor-section-title">📝 Основная информация</h2>

                        {/* Название */}
                        <div className="constructor-form-group">
                            <label className="constructor-label">Название маршрута *</label>
                            <input
                                type="text"
                                placeholder="Например: Путешествие по Алтаю"
                                value={routeData.title}
                                onChange={(e) => handleRouteChange('title', e.target.value)}
                                className="constructor-input"
                            />
                        </div>

                        {/* Описание */}
                        <div className="constructor-form-group">
                            <label className="constructor-label">Описание</label>
                            <textarea
                                placeholder="Расскажите о вашем маршруте..."
                                value={routeData.description}
                                onChange={(e) => handleRouteChange('description', e.target.value)}
                                className="constructor-textarea"
                                rows="4"
                            />
                        </div>

                        {/* Даты */}
                        <div className="constructor-form-row">
                            <div className="constructor-form-group">
                                <label className="constructor-label">Дата начала</label>
                                <input
                                    type="date"
                                    value={routeData.startDate}
                                    onChange={(e) => handleRouteChange('startDate', e.target.value)}
                                    className="constructor-input"
                                />
                            </div>
                            <div className="constructor-form-group">
                                <label className="constructor-label">Дата окончания</label>
                                <input
                                    type="date"
                                    value={routeData.endDate}
                                    onChange={(e) => handleRouteChange('endDate', e.target.value)}
                                    className="constructor-input"
                                />
                            </div>
                        </div>

                        {/* Загрузка фото */}
                        <div className="constructor-form-group">
                            <label className="constructor-label">Фото маршрута</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleRouteChange('image', e.target.files?.[0]?.name || '')}
                                className="constructor-input"
                            />
                        </div>

                        {/* Публичность */}
                        <div className="constructor-form-group">
                            <label className="constructor-checkbox">
                                <input
                                    type="checkbox"
                                    checked={routeData.isPublic}
                                    onChange={(e) => handleRouteChange('isPublic', e.target.checked)}
                                />
                                <span>🌐 Публичный доступ</span>
                            </label>
                        </div>
                    </div>

                    {/* Маршрутные точки */}
                    <div className="constructor-section">
                        <div className="constructor-section-header">
                            <h2 className="constructor-section-title">📍 Маршрутные точки</h2>
                            <button
                                onClick={handleAddWaypoint}
                                className="constructor-btn-add-waypoint"
                            >
                                ➕ Добавить точку
                            </button>
                        </div>

                        {waypoints.map((waypoint, idx) => (
                            <WaypointForm
                                key={waypoint.id}
                                index={idx}
                                waypoint={waypoint}
                                onChange={handleWaypointChange}
                                onRemove={handleRemoveWaypoint}
                                canRemove={waypoints.length > 1}
                            />
                        ))}
                    </div>

                    {/* Кнопки действий */}
                    <div className="constructor-actions">
                        <button onClick={handleCreateRoute} className="constructor-btn-create">
                            ✅ Создать маршрут
                        </button>
                        <button
                            onClick={() => window.history.back()}
                            className="constructor-btn-cancel"
                        >
                            ❌ Отмена
                        </button>
                    </div>
                </div>

                {/* Правая колонка: Предпросмотр карты */}
                <div className="constructor-right">
                    <MapPreview waypoints={waypoints} />
                </div>
            </div>
        </div>
    );
};

export default Constructor;
