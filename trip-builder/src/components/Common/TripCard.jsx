// src/components/Common/TripCard.jsx

import React from 'react';
import './TripCard.css';
import { handlers } from '../../utils/handlers';

const TripCard = ({
                      id,
                      title,
                      country,
                      duration,
                      description = '',
                      tags = [],
                      image,
                      waypoints = [], // Маршрутные точки для модалки
                      liked = false,
                      isMyTrip = false,
                      isPublic = false,
                      onEdit,
                      onAddToMyTrips,
                      onDetails, // опциональный внешний колбэк
                  }) => {
    const [isLiked, setIsLiked] = React.useState(liked);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleLike = () => {
        const next = !isLiked;
        setIsLiked(next);
        handlers.onLike(id);
    };

    // ВАЖНО: здесь больше не вызываем handlers.onAddToMyTrips,
    // только пробрасываем событие наверх.
    const handleAddToMyTrips = () => {
        onAddToMyTrips?.(id);
    };

    const handleEdit = () => {
        handlers.onEditRoute?.(id);
        onEdit?.(id);
    };

    const handleDetails = () => {
        onDetails?.({
            id,
            title,
            country,
            duration,
            description,
            tags,
            image,
            waypoints,
            isPublic,
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const shortDescription = (description || '').substring(0, 80);
    const hasLongDescription = (description || '').length > 80;

    return (
        <>
            {/* Основная карточка */}
            <article className="trip-card">
                <div className="trip-card-image">
                    {image ? (
                        <img src={image} alt={title} className="trip-card-image-img" />
                    ) : (
                        <div className="trip-card-image-placeholder">🌍</div>
                    )}

                    {isPublic && (
                        <span className="trip-card-badge trip-card-badge--public">
              Публичный
            </span>
                    )}
                </div>

                <div className="trip-card-content">
                    <h3 className="trip-card-title">{title}</h3>
                    <div className="trip-card-meta">
                        {country && <span>{country}</span>}
                        {duration && <span>{duration}</span>}
                    </div>

                    {description && (
                        <p className="trip-card-description">
                            {shortDescription}
                            {hasLongDescription ? '…' : ''}
                        </p>
                    )}

                    {tags && tags.length > 0 && (
                        <div className="trip-card-tags">
                            {tags.map((tag, index) => (
                                <span key={index} className="trip-card-tag">
                  {tag}
                </span>
                            ))}
                        </div>
                    )}
                </div>

                <div className="trip-card-actions">
                    {/* Лайк */}
                    <button
                        type="button"
                        className={
                            'trip-card-btn trip-card-btn--like' +
                            (isLiked ? ' trip-card-btn--like-active' : '')
                        }
                        onClick={handleLike}
                    >
                        {isLiked ? 'Убрать из избранного' : 'В избранное'}
                    </button>

                    {/* Добавить к себе — только для публичных чужих маршрутов */}
                    {!isMyTrip && (
                        <button
                            type="button"
                            className="trip-card-btn trip-card-btn--add"
                            onClick={handleAddToMyTrips}
                        >
                            + Добавить к себе
                        </button>
                    )}

                    {/* Редактировать — только для моих маршрутов */}
                    {isMyTrip && (
                        <button
                            type="button"
                            className="trip-card-btn trip-card-btn--edit"
                            onClick={handleEdit}
                        >
                            Редактировать
                        </button>
                    )}

                    {/* Подробнее — модалка */}
                    <button
                        type="button"
                        className="trip-card-btn trip-card-btn--details"
                        onClick={handleDetails}
                    >
                        Подробнее
                    </button>
                </div>
            </article>

            {/* Модальное окно с деталями маршрута */}
            {isModalOpen && (
                <div className="trip-modal-overlay" onClick={closeModal}>
                    <div className="trip-modal" onClick={(e) => e.stopPropagation()}>
                        <header className="trip-modal-header">
                            <h2 className="trip-modal-title">{title}</h2>
                            <button
                                type="button"
                                className="trip-modal-close"
                                onClick={closeModal}
                            >
                                ×
                            </button>
                        </header>

                        <div className="trip-modal-content">
                            <div className="trip-modal-image">
                                {image ? (
                                    <img src={image} alt={title} />
                                ) : (
                                    <div className="trip-modal-image-placeholder">🌍</div>
                                )}
                            </div>

                            <div className="trip-modal-info">
                                <div className="trip-modal-meta">
                                    {country && <span>{country}</span>}
                                    {duration && <span>{duration}</span>}
                                    {isPublic && (
                                        <span className="trip-modal-badge">Публичный маршрут</span>
                                    )}
                                </div>

                                {description && (
                                    <p className="trip-modal-description">{description}</p>
                                )}

                                {tags && tags.length > 0 && (
                                    <div className="trip-modal-tags">
                                        {tags.map((tag, index) => (
                                            <span key={index} className="trip-modal-tag">
                        {tag}
                      </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {waypoints && waypoints.length > 0 && (
                                <section className="trip-modal-waypoints">
                                    <h3 className="trip-modal-section-title">Точки маршрута</h3>
                                    <div className="waypoints-list">
                                        {waypoints.map((wp, index) => (
                                            <div key={index} className="waypoint-item">
                                                <div className="waypoint-number">{index + 1}</div>
                                                <div className="waypoint-info">
                                                    {wp.city && (
                                                        <div className="waypoint-location">{wp.city}</div>
                                                    )}
                                                    {wp.description && (
                                                        <div className="waypoint-desc">
                                                            {wp.description}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TripCard;
