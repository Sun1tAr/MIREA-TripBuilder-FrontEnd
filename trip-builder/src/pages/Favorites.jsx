// src/pages/Favorites.jsx
import React, { useState } from 'react';
import './Favorites.css';
import TripCard from '../components/Common/TripCard';

const Favorites = () => {
    // Путешествия, которые пользователь лайкнул
    const [favorites, setFavorites] = useState([
        {
            id: 201,
            title: 'Исландия: земля льда и огня',
            country: 'Исландия',
            duration: '14 дней',
            description: 'Водопады, ледники, вулканы и северные сияния',
            tags: ['Природа', 'Приключение', 'Фотография'],
            liked: true,
            isPublic: true,
        },
        {
            id: 202,
            title: 'Канада: величие природы',
            country: 'Канада',
            duration: '11 дней',
            description: 'Ниагарский водопад, озёра и национальные парки',
            tags: ['Природа', 'Озёра', 'Пешие прогулки'],
            liked: true,
            isPublic: true,
        },
        {
            id: 203,
            title: 'Марокко: экзотика Африки',
            country: 'Марокко',
            duration: '9 дней',
            description: 'Пустыня Сахара, древние города и базары',
            tags: ['Культура', 'Экзотика', 'Авантюра'],
            liked: true,
            isPublic: true,
        },
    ]);

    const stats = {
        total: favorites.length,
        active: favorites.length,
        planned: Math.ceil(favorites.length * 0.3),
    };

    const handleRemoveFromFavorites = (id) => {
        setFavorites(favorites.filter((trip) => trip.id !== id));
    };

    return (
        <div className="favorites">
            {/* Заголовок */}
            <div className="favorites-header">
                <h1 className="favorites-title">❤️ Избранное</h1>
                <p className="favorites-subtitle">
                    Ваши любимые путешествия и маршруты
                </p>
            </div>

            {/* Статистика */}
            {favorites.length > 0 && (
                <div className="favorites-stats">
                    <div className="stat-card">
                        <div className="stat-number">{stats.total}</div>
                        <div className="stat-label">Всего</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">{stats.active}</div>
                        <div className="stat-label">Активных</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">{stats.planned}</div>
                        <div className="stat-label">Планируемых</div>
                    </div>
                </div>
            )}

            {/* Список путешествий */}
            {favorites.length > 0 ? (
                <div className="favorites-grid">
                    {favorites.map((trip) => (
                        <TripCard
                            key={trip.id}
                            {...trip}
                            liked={true}
                            onRemoveFromFavorites={() => handleRemoveFromFavorites(trip.id)}
                        />
                    ))}
                </div>
            ) : (
                <div className="favorites-empty">
                    <div className="favorites-empty-icon">❤️</div>
                    <h2 className="favorites-empty-title">У вас нет избранных</h2>
                    <p className="favorites-empty-text">
                        Лайкайте путешествия на главной странице, чтобы их сохранить
                    </p>
                </div>
            )}
        </div>
    );
};

export default Favorites;
