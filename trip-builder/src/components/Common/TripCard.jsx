// src/components/Common/TripCard.jsx
import React from 'react';
import './TripCard.css';
import { handlers } from '../../utils/handlers';

const TripCard = ({
                      id,
                      title,
                      country,
                      duration,
                      description,
                      tags,
                      image,
                      liked = false,
                      isMyTrip = false,
                      isPublic = false,
                      onEdit,
                      onAddToMyTrips,
                  }) => {
    const [isLiked, setIsLiked] = React.useState(liked);

    const handleLike = () => {
        setIsLiked(!isLiked);
        handlers.onLike(id);
    };

    const handleAddToMyTrips = () => {
        handlers.onAddToMyTrips(id);
        onAddToMyTrips?.(id);
    };

    const handleEdit = () => {
        handlers.onEditRoute(id);
        onEdit?.(id);
    };

    return (
        <div className="trip-card">
            {/* Изображение */}
            <div className="trip-card-image">
                <img
                    src={image || '🏔️'}
                    alt={title}
                    className="trip-card-image-img"
                    onError={(e) => {
                        e.target.style.display = 'none';
                    }}
                />
                <div className="trip-card-image-placeholder">
                    {!image && '🏔️'}
                </div>

                {/* Статус публичности */}
                {isPublic && (
                    <div className="trip-card-badge trip-card-badge--public">
                        🌐 Публичный
                    </div>
                )}
            </div>

            {/* Содержимое */}
            <div className="trip-card-content">
                {/* Заголовок */}
                <h3 className="trip-card-title">{title}</h3>

                {/* Страна и длительность */}
                <div className="trip-card-meta">
                    <span>📍 {country}</span>
                    <span>⏱️ {duration}</span>
                </div>

                {/* Описание */}
                {description && (
                    <p className="trip-card-description">
                        {description.substring(0, 80)}
                        {description.length > 80 ? '...' : ''}
                    </p>
                )}

                {/* Теги */}
                {tags && tags.length > 0 && (
                    <div className="trip-card-tags">
                        {tags.map((tag, idx) => (
                            <span key={idx} className="trip-card-tag">
                #{tag}
              </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Кнопки действия */}
            <div className="trip-card-actions">
                <button
                    onClick={handleLike}
                    className={`trip-card-btn trip-card-btn--like ${
                        isLiked ? 'trip-card-btn--like-active' : ''
                    }`}
                    title={isLiked ? 'Убрать из избранного' : 'Добавить в избранное'}
                >
                    {isLiked ? '❤️' : '🤍'} {isLiked ? 'Нравится' : 'Лайк'}
                </button>

                {isMyTrip ? (
                    <button
                        onClick={handleEdit}
                        className="trip-card-btn trip-card-btn--edit"
                        title="Редактировать"
                    >
                        ✏️ Редактировать
                    </button>
                ) : (
                    <button
                        onClick={handleAddToMyTrips}
                        className="trip-card-btn trip-card-btn--add"
                        title="Добавить к себе"
                    >
                        ➕ Добавить к себе
                    </button>
                )}
            </div>
        </div>
    );
};

export default TripCard;
