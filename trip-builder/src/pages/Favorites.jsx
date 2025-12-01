// src/pages/Favorites.jsx
import React, { useEffect, useState } from 'react';
import './Favorites.css';
import TripCard from '../components/Common/TripCard';
import { handlers } from '../utils/handlers';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    const loadFavorites = () => {
        console.log('[FAVORITES] loadFavorites');
        const trips = handlers.getFavoriteTrips();
        console.log('[FAVORITES] loaded', trips);
        setFavorites(Array.isArray(trips) ? trips : []);
    };

    useEffect(() => {
        loadFavorites();
    }, []);

    const handleToggleFavorite = (id) => {
        console.log('[FAVORITES] toggle like', { id });
        const isFavorite = handlers.onLike(id);
        console.log('[FAVORITES] after toggle, isFavorite:', isFavorite);
        loadFavorites();
    };

    const stats = {
        total: favorites.length,
        active: favorites.length,
        planned: Math.ceil(favorites.length * 0.3),
    };

    const hasFavorites = favorites.length > 0;

    return (
        <div className="favorites">
            <header className="favorites-header">
                <h1 className="favorites-title">Ваши любимые путешествия и маршруты</h1>
                <p className="favorites-subtitle">
                    Лайкайте путешествия на главной странице, чтобы сохранить их здесь
                </p>
            </header>

            <section className="favorites-stats">
                <div className="favorites-stat-card">
                    <span className="favorites-stat-label">Всего избранных</span>
                    <span className="favorites-stat-value">{stats.total}</span>
                </div>
                <div className="favorites-stat-card">
                    <span className="favorites-stat-label">Активные планы</span>
                    <span className="favorites-stat-value">{stats.active}</span>
                </div>
                <div className="favorites-stat-card">
                    <span className="favorites-stat-label">Почти запланировано</span>
                    <span className="favorites-stat-value">{stats.planned}</span>
                </div>
            </section>

            {hasFavorites ? (
                <section className="favorites-list">
                    <div className="favorites-grid">
                        {favorites.map((trip) => (
                            <TripCard
                                key={trip.id}
                                id={trip.id}
                                title={trip.title}
                                country={trip.country}
                                duration={trip.duration}
                                description={trip.description || ''}
                                tags={trip.tags || []}
                                image={trip.image}
                                liked={true}
                                isMyTrip={false}
                                isPublic={!!trip.isPublic}
                                waypoints={trip.waypoints || []}
                            />
                        ))}
                    </div>
                </section>
            ) : (
                <section className="favorites-empty">
                    <div className="favorites-empty-card">
                        <span className="favorites-empty-icon">❤️</span>
                        <h2 className="favorites-empty-title">
                            У вас еще нет избранных путешествий
                        </h2>
                        <p className="favorites-empty-text">
                            Лайкайте путешествия на главной странице, чтобы они появились здесь.
                        </p>
                    </div>
                </section>
            )}
        </div>
    );
};

export default Favorites;
