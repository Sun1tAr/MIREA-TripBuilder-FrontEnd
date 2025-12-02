// src/components/Common/TripCard.jsx

import React from 'react';
import './TripCard.css';
import TripModal from './TripModal';
import { handlers } from '../../utils/handlers';

const TripCard = ({
                      id,
                      title,
                      country,
                      duration,
                      description,
                      tags = [],
                      image,
                      waypoints = [],
                      liked = false,
                      isMyTrip = false,
                      isPublic = false,
                      createdBy,
                      onEdit,
                      onAddToMyTrips,
                  }) => {
    const [isLiked, setIsLiked] = React.useState(liked);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    // Получаем текущего пользователя
    const currentUserId = localStorage.getItem('userId') || '';

    const handleLike = () => {
        const next = !isLiked;
        setIsLiked(next);
        handlers.onLike(id);
    };

    const handleAddToMyTrips = () => {
        if (onAddToMyTrips) {
            onAddToMyTrips(id);
        } else {
            handlers.onAddToMyTrips?.(id);
        }
    };

    const handleEdit = () => {
        handlers.onEditRoute?.(id);
        if (onEdit) {
            onEdit(id);
        }
    };

    const handleDetails = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const shortDescription = description?.substring(0, 80);
    const hasLongDescription = description?.length > 80;

    // Данные для модального окна
    const tripData = {
        id,
        title,
        country,
        duration,
        description,
        tags,
        image,
        waypoints,
        isPublic,
        createdBy,
    };

    return (
        <>
            <div className="trip-card">
                {/* Изображение */}
                <div className="trip-card-image" onClick={handleDetails}>
                    {image ? (
                        <img src={image} alt={title} className="trip-card-image-img" />
                    ) : (
                        <div className="trip-card-image-placeholder">✈️</div>
                    )}
                    {isPublic && (
                        <div className="trip-card-badge trip-card-badge--public">
                            🌍 ПУБЛИЧНЫЙ
                        </div>
                    )}
                </div>

                {/* Контент */}
                <div className="trip-card-content" onClick={handleDetails}>
                    <h3 className="trip-card-title">{title}</h3>

                    {/* Мета информация */}
                    <div className="trip-card-meta">
                        {country && <span>📍 {country}</span>}
                        {duration && <span>📅 {duration}</span>}
                    </div>

                    {/* Описание */}
                    {description && (
                        <p className="trip-card-description">
                            {shortDescription}
                            {hasLongDescription && '...'}
                        </p>
                    )}

                    {/* Теги */}
                    {tags && tags.length > 0 && (
                        <div className="trip-card-tags">
                            {tags.slice(0, 2).map((tag, idx) => (
                                <span key={idx} className="trip-card-tag">
                  {tag}
                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Кнопки действия */}
                <div className="trip-card-actions">
                    {/* Для своих маршрутов - редактировать */}
                    {isMyTrip ? (
                        <button className="trip-card-btn trip-card-btn--edit" onClick={handleEdit}>
                            ✏️ Редактировать
                        </button>
                    ) : (
                        /* Для публичных - добавить к себе */
                        <button className="trip-card-btn trip-card-btn--add" onClick={handleAddToMyTrips}>
                            ➕ Добавить
                        </button>
                    )}

                    {/* Лайк */}
                    <button
                        className={`trip-card-btn trip-card-btn--like ${isLiked ? 'trip-card-btn--like-active' : ''}`}
                        onClick={handleLike}
                    >
                        {isLiked ? '❤️' : '🤍'} Лайк
                    </button>

                    {/*/!* Подробнее *!/*/}
                    {/*<button className="trip-card-btn trip-card-btn--details" onClick={handleDetails}>*/}
                    {/*    👁️ Подробнее*/}
                    {/*</button>*/}
                </div>
            </div>

            {/* Единое модальное окно */}
            {isModalOpen && (
                <TripModal
                    trip={tripData}
                    onClose={closeModal}
                    currentUserId={currentUserId}
                    isMyTrip={isMyTrip}
                    onEdit={handleEdit}
                    onAddToMyTrips={handleAddToMyTrips}
                />
            )}
        </>
    );
};

export default TripCard;
