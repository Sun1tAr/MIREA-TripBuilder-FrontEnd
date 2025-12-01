// src/pages/MyTrips.jsx
import React, { useEffect, useState } from 'react';
import './MyTrips.css';
import { Link, useNavigate } from 'react-router-dom';
import TripCard from '../components/Common/TripCard';
import { handlers } from '../utils/handlers';

const MyTrips = () => {
    const [myTrips, setMyTrips] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('[MY_TRIPS] mount, loading from storage');
        const trips = handlers.getMyTrips();
        console.log('[MY_TRIPS] loaded', trips);
        setMyTrips(Array.isArray(trips) ? trips : []);
    }, []);

    const handleEdit = (id) => {
        handlers.onEditRoute(id);
        console.log('[MY_TRIPS] Редактировать маршрут:', id);
        navigate(`/create?from=myTrip&tripId=${id}`);
    };

    const handleDelete = (id) => {
        console.log('[MY_TRIPS] delete click', { id });
        const updated = handlers.onDeleteMyTrip(id);
        console.log('[MY_TRIPS] after delete', updated);
        setMyTrips(Array.isArray(updated) ? updated : []);
    };

    const handleTogglePublic = (id) => {
        console.log('[MY_TRIPS] toggle public click', { id });
        const updatedTrip = handlers.onToggleMyTripPublic(id);
        console.log('[MY_TRIPS] after toggle public', updatedTrip);
        setMyTrips((prev) =>
            prev.map((t) =>
                t.id === id ? { ...t, isPublic: updatedTrip?.isPublic } : t
            )
        );
    };

    const hasTrips = myTrips.length > 0;

    return (
        <div className="my-trips">
            <header className="my-trips-header">
                <h1 className="my-trips-title">Ваши созданные маршруты и путешествия</h1>
                <p className="my-trips-subtitle">
                    Здесь хранятся маршруты, которые вы сохранили «к себе»
                </p>
            </header>

            {hasTrips ? (
                <section className="my-trips-list">
                    <div className="my-trips-grid">
                        {myTrips.map((trip) => (
                            <div key={trip.id} className="my-trips-card-wrapper">
                                <TripCard
                                    id={trip.id}
                                    title={trip.title}
                                    country={trip.country}
                                    duration={trip.duration}
                                    description={trip.description || ''}
                                    tags={trip.tags || []}
                                    image={trip.image}
                                    liked={!!trip.liked}
                                    isMyTrip={true}
                                    isPublic={!!trip.isPublic}
                                    waypoints={trip.waypoints || []}
                                    onEdit={handleEdit}
                                />

                                <div className="my-trips-actions">
                                    <button
                                        className="trip-card-btn trip-card-btn-secondary"
                                        onClick={() => handleTogglePublic(trip.id)}
                                    >
                                        {trip.isPublic ? 'Сделать приватным' : 'Сделать публичным'}
                                    </button>

                                    <button
                                        className="trip-card-btn trip-card-btn-danger"
                                        onClick={() => handleDelete(trip.id)}
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ) : (
                <section className="my-trips-empty">
                    <div className="my-trips-empty-card">
                        <h2 className="my-trips-empty-title">
                            У вас еще нет путешествий
                        </h2>
                        <p className="my-trips-empty-text">
                            Добавьте понравившийся публичный маршрут «к себе», чтобы начать планирование.
                        </p>
                        <Link to="/" className="my-trips-empty-btn">
                            Найти маршрут
                        </Link>
                    </div>
                </section>
            )}
        </div>
    );
};

export default MyTrips;
