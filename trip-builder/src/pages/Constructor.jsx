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
      description: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
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
        description: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
      },
    ]);
    handlers.onAddWaypoint(newId);
  };

  const handleRemoveWaypoint = (id) => {
    setWaypoints((prev) => prev.filter((wp) => wp.id !== id));
  };

  const validateForm = () => {
    if (!routeData.title.trim()) {
      alert('⚠️ Пожалуйста, введите название маршрута');
      return false;
    }
    if (!routeData.startDate || !routeData.endDate) {
      alert('⚠️ Пожалуйста, заполните даты начала и конца маршрута');
      return false;
    }
    if (routeData.startDate > routeData.endDate) {
      alert('⚠️ Дата начала не может быть позже даты конца');
      return false;
    }
    if (waypoints.length === 0) {
      alert('⚠️ Пожалуйста, добавьте хотя бы одну маршрутную точку');
      return false;
    }

    const validWaypoints = waypoints.filter(wp =>
      wp.city.trim() &&
      wp.startDate &&
      wp.startTime &&
      wp.endDate &&
      wp.endTime &&
      wp.latitude &&
      wp.longitude
    );

    if (validWaypoints.length === 0) {
      alert('⚠️ Пожалуйста, заполните все маршрутные точки полностью\n(город, координаты, дата/время начала и конца)');
      return false;
    }

    return true;
  };

  const calculateDurationDays = () => {
    if (!routeData.startDate || !routeData.endDate) return 0;
    const start = new Date(routeData.startDate);
    const end = new Date(routeData.endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(1, diffDays);
  };

  const handleCreateRoute = () => {
    if (!validateForm()) return;

    const durationDays = calculateDurationDays();

    // Формируем маршрутные точки с datetime полями
    const formattedWaypoints = waypoints
      .filter(wp => wp.city.trim())
      .map(wp => ({
        city: wp.city,
        description: wp.description,
        latitude: parseFloat(wp.latitude) || 0,
        longitude: parseFloat(wp.longitude) || 0,
        startDate: wp.startDate,
        endDate: wp.endDate,
        startTime: wp.startTime,
        endTime: wp.endTime,
        startDateTime: `${wp.startDate}T${wp.startTime}`,
        endDateTime: `${wp.endDate}T${wp.endTime}`,
      }));

    // Новый маршрут
    const newTrip = {
      title: routeData.title,
      description: routeData.description,
      country: 'Мой маршрут',
      duration: `${durationDays} дней`,
      tags: ['Пользовательский', 'Авторский'],
      image: routeData.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=200&fit=crop',
      isPublic: routeData.isPublic,
      isMyTrip: true,
      waypoints: formattedWaypoints,
    };

    // Сохраняем в localStorage как собственный маршрут
    const myTrips = handlers.getMyTrips();
    const maxId = myTrips.reduce((max, t) => Math.max(max, t.id || 0), 1000) + 1;

    const tripToSave = {
      ...newTrip,
      id: maxId,
    };

    // Вызываем обработчик
    handlers.onCreateRoute(tripToSave);

    // Добавляем в мои маршруты через localStorage
    const updatedTrips = [...myTrips, tripToSave];
    window.localStorage.setItem('tripBuilder_myTrips', JSON.stringify(updatedTrips));

    // Показываем успешное сообщение
    alert(`✅ Маршрут "${routeData.title}" успешно создан!${routeData.isPublic ? '\n📍 Маршрут доступен на странице публичных маршрутов' : '\n💾 Маршрут сохранён в "Мои маршруты"'}`);

    // Очищаем форму
    setRouteData({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      isPublic: false,
      image: '',
    });
    setWaypoints([
      {
        id: 1,
        city: '',
        latitude: '',
        longitude: '',
        description: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
      },
    ]);
  };

  return (
    <div className="constructor">
      <div className="constructor-header">
        <h1 className="constructor-title">Конструктор маршрутов</h1>
        <p className="constructor-subtitle">Создавайте свои уникальные маршруты путешествий</p>
      </div>

      <div className="constructor-grid">
        <div className="constructor-left">
          <div className="constructor-section">
            <h2 className="constructor-section-title">Информация о маршруте</h2>

            <div className="constructor-form-group">
              <label className="constructor-label">Название маршрута</label>
              <input
                type="text"
                placeholder="Например: Путешествие по Альпам"
                value={routeData.title}
                onChange={(e) => handleRouteChange('title', e.target.value)}
                className="constructor-input"
              />
            </div>

            <div className="constructor-form-group">
              <label className="constructor-label">Описание</label>
              <textarea
                placeholder="Опишите ваш маршрут"
                value={routeData.description}
                onChange={(e) => handleRouteChange('description', e.target.value)}
                className="constructor-textarea"
                rows="4"
              />
            </div>

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

            {routeData.startDate && routeData.endDate && (
              <div className="constructor-duration-display">
                <span className="constructor-duration-label">📅 Длительность:</span>
                <span className="constructor-duration-value">{calculateDurationDays()} дней</span>
              </div>
            )}

            <div className="constructor-form-group">
              <label className="constructor-label">Изображение маршрута</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleRouteChange('image', e.target.files?.[0]?.name)}
                className="constructor-input"
              />
            </div>

            <div className="constructor-form-group">
              <label className="constructor-checkbox">
                <input
                  type="checkbox"
                  checked={routeData.isPublic}
                  onChange={(e) => handleRouteChange('isPublic', e.target.checked)}
                />
                <span>Сделать маршрут общедоступным</span>
              </label>
            </div>
          </div>

          <div className="constructor-section">
            <div className="constructor-section-header">
              <h2 className="constructor-section-title">Маршрутные точки</h2>
              <button
                onClick={handleAddWaypoint}
                className="constructor-btn-add-waypoint"
              >
                + Добавить точку
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

          <div className="constructor-actions">
            <button
              onClick={handleCreateRoute}
              className="constructor-btn-create"
            >
              ✓ Создать маршрут
            </button>
            <button
              onClick={() => window.history.back()}
              className="constructor-btn-cancel"
            >
              ✕ Отмена
            </button>
          </div>
        </div>

        <div className="constructor-right">
          <MapPreview waypoints={waypoints} />
        </div>
      </div>
    </div>
  );
};

export default Constructor;