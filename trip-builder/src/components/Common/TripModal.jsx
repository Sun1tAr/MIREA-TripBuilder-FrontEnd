// src/components/Common/TripModal.jsx

import React from 'react';
import './TripModal.css';

const TripModal = ({
                       trip,
                       onClose,
                       currentUserId,
                       isMyTrip,
                       onEdit,
                       onAddToMyTrips
                   }) => {
    if (!trip) return null;

    // Определяем статус путешествия
    const isOwnTrip = trip.createdBy === currentUserId || trip.userId === currentUserId;

    // Чистим duration - убираем лишние пробелы и "дн."
    const formatDuration = (duration) => {
        if (!duration) return '—';
        // Убираем все вариации "дн." и пробелы, добавляем одно "дн."
        const cleaned = String(duration);
        return cleaned ? `${cleaned}` : '—';
    };

    return (
        <div className="trip-modal-overlay" onClick={onClose}>
            <div className="trip-modal" onClick={(e) => e.stopPropagation()}>
                {/* Заголовок */}
                <div className="trip-modal__header">
                    <div className="trip-modal__title-group">
                        <h1 className="trip-modal__title">{trip.title}</h1>
                        {/* Плашка статуса */}
                        {isOwnTrip ? (
                            <div className="trip-modal__status trip-modal__status--own">
                                🏜️ МОЕ
                            </div>
                        ) : (
                            <div className="trip-modal__status trip-modal__status--public">
                                🌍 ПУБЛИЧНЫЙ
                            </div>
                        )}
                    </div>
                    <button
                        className="trip-modal__close"
                        onClick={onClose}
                        title="Закрыть"
                    >
                        ✕
                    </button>
                </div>

                {/* Изображение */}
                {trip.image && (
                    <div className="trip-modal__image">
                        <img src={trip.image} alt={trip.title} />
                    </div>
                )}

                {/* Основной контент */}
                <div className="trip-modal__body">
                    {/* Информация */}
                    <div className="trip-modal__info">
                        <div className="trip-modal__info-item">
                            <span className="trip-modal__label">Страна</span>
                            <span className="trip-modal__value">{trip.country || '—'}</span>
                        </div>
                        <div className="trip-modal__info-item">
                            <span className="trip-modal__label">Длительность</span>
                            <span className="trip-modal__value">{formatDuration(trip.duration)}</span>
                        </div>
                    </div>

                    {/* Описание */}
                    {trip.description && (
                        <div className="trip-modal__description">
                            <h3 className="trip-modal__subtitle">Описание</h3>
                            <p className="trip-modal__description-text">{trip.description}</p>
                        </div>
                    )}

                    {/* Теги */}
                    {trip.tags && trip.tags.length > 0 && (
                        <div className="trip-modal__tags">
                            <h3 className="trip-modal__subtitle">Интересы</h3>
                            <div className="trip-modal__tags-list">
                                {trip.tags.map((tag, idx) => (
                                    <span key={idx} className="trip-modal__tag">
                    {tag}
                  </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Маршрутные точки */}
                    {trip.waypoints && trip.waypoints.length > 0 && (
                        <div className="trip-modal__waypoints">
                            <h3 className="trip-modal__subtitle">Маршрут</h3>
                            <div className="trip-modal__waypoints-list">
                                {trip.waypoints.map((waypoint, idx) => (
                                    <div key={idx} className="trip-modal__waypoint">
                                        <div className="trip-modal__waypoint-number">
                                            {idx + 1}
                                        </div>
                                        <div className="trip-modal__waypoint-content">
                                            <h4 className="trip-modal__waypoint-city">
                                                {waypoint.city}
                                            </h4>
                                            {waypoint.description && (
                                                <p className="trip-modal__waypoint-description">
                                                    {waypoint.description}
                                                </p>
                                            )}
                                            {(waypoint.startDate || waypoint.endDate) && (
                                                <div className="trip-modal__waypoint-dates">
                                                    {waypoint.startDate && (
                                                        <span className="trip-modal__waypoint-date">
                              📅 {waypoint.startDate}
                            </span>
                                                    )}
                                                    {waypoint.endDate && (
                                                        <span className="trip-modal__waypoint-date">
                              → {waypoint.endDate}
                            </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Подвал с кнопками */}
                <div className="trip-modal__footer">
                    {isOwnTrip ? (
                        <button
                            className="trip-modal__btn trip-modal__btn--edit"
                            onClick={() => {
                                onEdit?.();
                                onClose();
                            }}
                        >
                            ✏️ Редактировать
                        </button>
                    ) : (
                        <button
                            className="trip-modal__btn trip-modal__btn--add"
                            onClick={() => {
                                onAddToMyTrips?.();
                                onClose();
                            }}
                        >
                            ➕ Добавить
                        </button>
                    )}

                    <button
                        className="trip-modal__btn-close"
                        onClick={onClose}
                    >
                        Закрыть
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TripModal;
