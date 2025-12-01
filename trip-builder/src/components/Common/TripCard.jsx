// src/components/Common/TripCard.jsx
import React, { useState } from 'react';
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
  waypoints = [], // Маршрутные точки для модалки
  liked = false,
  isMyTrip = false,
  isPublic = false,
  onEdit,
  onAddToMyTrips,
  onDetails, // Новый пропс для открытия модалки
}) => {
  const [isLiked, setIsLiked] = React.useState(liked);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

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

  const handleDetails = () => {
    onDetails?.({ id, title, country, duration, description, tags, image, waypoints, isPublic });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Основная карточка */}
      <article className="trip-card">
        <div className="trip-card-image">
          {image ? (
            <img src={image} alt={title} className="trip-card-image-img" />
          ) : (
            <div className="trip-card-image-placeholder">🗺️</div>
          )}
          <span className={`trip-card-badge ${isPublic ? 'trip-card-badge--public' : ''}`}>
            {isPublic ? 'Публичный' : 'Приватный'}
          </span>
        </div>

        <div className="trip-card-content">
          <h3 className="trip-card-title">{title}</h3>
          
          <div className="trip-card-meta">
            <span>{country}</span>
            <span>{duration}</span>
          </div>

          <p className="trip-card-description">
            {description.substring(0, 80)}
            {description.length > 80 ? '...' : ''}
          </p>

          {/* Теги */}
          {tags && tags.length > 0 && (
            <div className="trip-card-tags">
              {tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="trip-card-tag">{tag}</span>
              ))}
              {tags.length > 3 && (
                <span className="trip-card-tag">+{tags.length - 3}</span>
              )}
            </div>
          )}
        </div>

        {/* Кнопки */}
        <div className="trip-card-actions">
          <button
            className="trip-card-btn"
            onClick={handleLike}
          >
            {isLiked ? '❤️' : '🤍'} Лайк
          </button>

          {isMyTrip ? (
            <button
              className="trip-card-btn trip-card-btn--edit"
              onClick={handleEdit}
            >
              ✏️ Редактировать
            </button>
          ) : (
            <button
              className="trip-card-btn trip-card-btn--add"
              onClick={handleAddToMyTrips}
            >
              ➕ Добавить
            </button>
          )}

          <button
            className="trip-card-btn trip-card-btn--details"
            onClick={handleDetails}
          >
            👁️ Подробнее
          </button>
        </div>
      </article>

      {/* Модальное окно подробностей */}
      {isModalOpen && (
        <div className="trip-modal-overlay" onClick={closeModal}>
          <div className="trip-modal" onClick={(e) => e.stopPropagation()}>
            <div className="trip-modal-header">
              <h2 className="trip-modal-title">{title}</h2>
              <button className="trip-modal-close" onClick={closeModal}>
                ×
              </button>
            </div>

            <div className="trip-modal-content">
              {/* Изображение */}
              <div className="trip-modal-image">
                {image ? (
                  <img src={image} alt={title} />
                ) : (
                  <div className="trip-modal-image-placeholder">🗺️</div>
                )}
              </div>

              {/* Основная информация */}
              <div className="trip-modal-info">
                <div className="trip-modal-meta">
                  <span className="trip-modal-badge">
                    {isPublic ? 'Публичный маршрут' : 'Приватный маршрут'}
                  </span>
                  <span>{country}</span>
                  <span>{duration}</span>
                </div>

                <p className="trip-modal-description">{description}</p>

                {tags && tags.length > 0 && (
                  <div className="trip-modal-tags">
                    {tags.map((tag, index) => (
                      <span key={index} className="trip-modal-tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* Маршрутные точки */}
              {waypoints && waypoints.length > 0 && (
                <div className="trip-modal-waypoints">
                  <h3 className="trip-modal-section-title">Маршрутные точки</h3>
                  <div className="waypoints-list">
                    {waypoints.map((waypoint, index) => (
                      <div key={index} className="waypoint-item">
                        <span className="waypoint-number">{index + 1}</span>
                        <div className="waypoint-info">
                          <div className="waypoint-location">
                            {waypoint.city || waypoint.country || 'Неизвестно'}
                          </div>
                          {waypoint.description && (
                            <div className="waypoint-desc">{waypoint.description}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TripCard;
