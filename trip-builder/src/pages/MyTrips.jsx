// src/pages/MyTrips.jsx
import React, { useState } from 'react';
import './MyTrips.css';
import { Link } from 'react-router-dom';
import TripCard from '../components/Common/TripCard';
import { handlers } from '../utils/handlers';

const MyTrips = () => {
    // Примеры маршрутов текущего пользователя
    const [myTrips, setMyTrips] = useState([
        {
            id: 101,
            title: 'Мой Швейцарский тур',
            country: 'Швейцария',
            duration: '12 дней',
            description: 'Полная поездка через швейцарские Альпы и озёра',
            tags: ['Горы', 'Озёра', 'Приключение'],
            isMyTrip: true,
            isPublic: true,
        },
        {
            id: 102,
            title: 'Тайланд 2024',
            country: 'Таиланд',
            duration: '10 дней',
            description: 'Экзотический отдых с пляжами и храмами',
            tags: ['Пляж', 'Культура', 'Экзотика'],
            isMyTrip: true,
            isPublic: false,
        },
        {
            id: 103,
            title: 'Норвежские фьорды',
            country: 'Норвегия',
            duration: '8 дней',
            description: 'Авто-тур по красивейшим фьордам Норвегии',
            tags: ['Природа', 'Фьорды', 'Авто-тур'],
            isMyTrip: true,
            isPublic: true,
        },
    ]);

    const handleEdit = (id) => {
        handlers.onEditRoute(id);
        console.log('Редактировать маршрут:', id);
    };

    const handleDelete = (id) => {
        setMyTrips(myTrips.filter((trip) => trip.id !== id));
        handlers.onDeleteRoute(id);
    };

    return (
        <div className="my-trips">
            {/* Заголовок */}
            <div className="my-trips-header">
                <div className="my-trips-title-group">
                    <h1 className="my-trips-title">🗺️ Мои путешествия</h1>
                    <p className="my-trips-subtitle">
                        Ваши созданные маршруты и путешествия
                    </p>
                </div>
                <Link to="/constructor" className="my-trips-create-btn">
                    ➕ Создать новое
                </Link>
            </div>

            {/* Список путешествий */}
            {myTrips.length > 0 ? (
                <div className="my-trips-grid">
                    {myTrips.map((trip) => (
                        <div key={trip.id} className="my-trip-card-wrapper">
                            <TripCard
                                {...trip}
                                onEdit={() => handleEdit(trip.id)}
                            />
                            <div className="my-trip-controls">
                <span
                    className={`my-trip-status ${
                        trip.isPublic
                            ? 'my-trip-status--public'
                            : 'my-trip-status--private'
                    }`}
                >
                  {trip.isPublic ? '🌐 Публичный' : '🔒 Приватный'}
                </span>
                                <button
                                    onClick={() => handleDelete(trip.id)}
                                    className="my-trip-delete-btn"
                                    title="Удалить"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="my-trips-empty">
                    <div className="my-trips-empty-icon">🗺️</div>
                    <h2 className="my-trips-empty-title">У вас нет путешествий</h2>
                    <p className="my-trips-empty-text">
                        Создайте свой первый маршрут и поделитесь им с сообществом
                    </p>
                    <Link to="/constructor" className="my-trips-empty-btn">
                        ✨ Создать первое путешествие
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MyTrips;
