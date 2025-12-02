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
  tags = [],
  image,
  waypoints = [],
  liked = false,
  isMyTrip = false,
  isPublic = false,
  onEdit,
  onAddToMyTrips,
  onDetails,
}) => {
  const [isLiked, setIsLiked] = React.useState(liked);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleLike = () => {
    const next = !isLiked;
    setIsLiked(next);
    handlers.onLike(id);
    if (onAddToMyTrips) {
      // Not needed for like, but keeping structure
    }
  };

  const handleAddToMyTrips = () => {
    if (onAddToMyTrips) {
      onAddToMyTrips?.(id);
    } else {
      handlers.onAddToMyTrips?.(id);
    }
  };

  const handleEdit = () => {
    handlers.onEditRoute?.(id);
    if (onEdit) {
      onEdit?.(id);
    }
  };

  const handleDetails = () => {
    if (onDetails) {
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
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const shortDescription = description?.substring(0, 80);
  const hasLongDescription = description?.length > 80;

  return (
    <>
      <article className="trip-card">
        <div className="trip-card-image">
          {image ? (
            <img src={image} alt={title} className="trip-card-image-img" />
          ) : (
            <div className="trip-card-image-placeholder" />
          )}
          {isPublic && <span className="trip-card-badge trip-card-badge--public">Публичный</span>}
        </div>

        <div className="trip-card-content">
          <h3 className="trip-card-title">{title}</h3>

          <div className="trip-card-meta">
            <span className="trip-card-country">{country}</span>
            <span className="trip-card-duration">{duration}</span>
          </div>

          {description && (
            <p className="trip-card-description">
              {shortDescription}
              {hasLongDescription && '...'}
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
          <button
            type="button"
            className={`trip-card-btn trip-card-btn--like ${isLiked ? 'trip-card-btn--like-active' : ''}`}
            onClick={handleLike}
            title={isLiked ? 'Удалить из избранного' : 'Добавить в избранное'}
          >
            {isLiked ? '❤️' : '🤍'}
          </button>

          {!isMyTrip && (
            <button
              type="button"
              className="trip-card-btn trip-card-btn--add"
              onClick={handleAddToMyTrips}
              title="Добавить в мои маршруты"
            >
              ➕
            </button>
          )}

          {isMyTrip && (
            <button
              type="button"
              className="trip-card-btn trip-card-btn--edit"
              onClick={handleEdit}
              title="Редактировать маршрут"
            >
              ✏️
            </button>
          )}

          <button
            type="button"
            className="trip-card-btn trip-card-btn--details"
            onClick={handleDetails}
            title="Подробнее"
          >
            👁️
          </button>
        </div>
      </article>

      {isModalOpen && (
        <div className="trip-modal-overlay" onClick={closeModal}>
          <div className="trip-modal" onClick={(e) => e.stopPropagation()}>
            <header className="trip-modal-header">
              <h2 className="trip-modal-title">{title}</h2>
              <button
                type="button"
                className="trip-modal-close"
                onClick={closeModal}
                title="Закрыть"
              >
                ✕
              </button>
            </header>

            <div className="trip-modal-content">
              <div className="trip-modal-image">
                {image ? (
                  <img src={image} alt={title} />
                ) : (
                  <div className="trip-modal-image-placeholder" />
                )}
              </div>

              <div className="trip-modal-info">
                <div className="trip-modal-meta">
                  <span className="trip-modal-country">{country}</span>
                  <span className="trip-modal-duration">{duration}</span>
                  {isPublic && <span className="trip-modal-badge">Публичный</span>}
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
                  <h3 className="trip-modal-section-title">Маршрутные точки</h3>
                  <div className="waypoints-list">
                    {waypoints.map((wp, index) => (
                      <div key={index} className="waypoint-item">
                        <div className="waypoint-number">{index + 1}</div>
                        <div className="waypoint-info">
                          <div className="waypoint-city">{wp.city}</div>
                          {wp.description && (
                            <div className="waypoint-desc">{wp.description}</div>
                          )}
                          {wp.startDate && wp.endDate && wp.startTime && wp.endTime && (
                            <div className="waypoint-datetime">
                              {wp.startDate} {wp.startTime} → {wp.endDate} {wp.endTime}
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
