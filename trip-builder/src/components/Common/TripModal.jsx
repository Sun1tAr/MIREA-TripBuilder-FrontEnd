// src/components/Common/TripModal.jsx
import React from 'react';
import './TripModal.css';

const TripModal = ({ trip, onClose }) => {
    if (!trip) return null;

    return (
        <div className="trip-modal-overlay" onClick={onClose}>
            <div className="trip-modal" onClick={(e) => e.stopPropagation()}>
                <div className="trip-modal__header">
                    <h2 className="trip-modal__title">{trip.title}</h2>
                    <button
                        onClick={onClose}
                        className="trip-modal__close"
                        title="Закрыть"
                    >
                        ✕
                    </button>
                </div>

                {trip.image && (
                    <div className="trip-modal__image">
                        <img src={trip.image} alt={trip.title} />
                    </div>
                )}

                <div className="trip-modal__body">
                    <div className="trip-modal__info">
                        <div className="trip-modal__info-item">
                            <span className="trip-modal__label">🌍 Страна:</span>
                            <span className="trip-modal__value">{trip.country}</span>
                        </div>
                        <div className="trip-modal__info-item">
                            <span className="trip-modal__label">⏱️ Длительность:</span>
                            <span className="trip-modal__value">{trip.duration}</span>
                        </div>
                    </div>

                    <div className="trip-modal__description">
                        <h3 className="trip-modal__subtitle">Описание</h3>
                        <p>{trip.description}</p>
                    </div>

                    {trip.tags && trip.tags.length > 0 && (
                        <div className="trip-modal__tags">
                            <h3 className="trip-modal__subtitle">Теги</h3>
                            <div className="trip-modal__tags-list">
                                {trip.tags.map((tag, index) => (
                                    <span key={index} className="trip-modal__tag">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {trip.waypoints && trip.waypoints.length > 0 && (
                        <div className="trip-modal__waypoints">
                            <h3 className="trip-modal__subtitle">
                                Маршрутные точки ({trip.waypoints.length})
                            </h3>
                            <div className="trip-modal__waypoints-list">
                                {trip.waypoints.map((waypoint, index) => (
                                    <div key={index} className="trip-modal__waypoint">
                                        <div className="trip-modal__waypoint-number">
                                            {index + 1}
                                        </div>
                                        <div className="trip-modal__waypoint-content">
                                            <h4 className="trip-modal__waypoint-city">
                                                {waypoint.city}
                                            </h4>
                                            <p className="trip-modal__waypoint-description">
                                                {waypoint.description}
                                            </p>
                                            <div className="trip-modal__waypoint-dates">
                                                <span className="trip-modal__waypoint-date">
                                                    📅 {waypoint.startDate} - {waypoint.endDate}
                                                </span>
                                                <span className="trip-modal__waypoint-time">
                                                    🕐 {waypoint.startTime} - {waypoint.endTime}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="trip-modal__footer">
                    <button onClick={onClose} className="trip-modal__btn-close">
                        Закрыть
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TripModal;
