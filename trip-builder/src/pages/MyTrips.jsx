// src/pages/MyTrips.jsx

import React, { useEffect, useState } from 'react';
import './MyTrips.css';
import { Link, useNavigate } from 'react-router-dom';
import TripCard from '../components/Common/TripCard';
import TripModal from '../components/Common/TripModal';
import { handlers } from '../utils/handlers';

const MyTrips = () => {
    const [myTrips, setMyTrips] = useState([]);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const navigate = useNavigate();

    const currentUserId = localStorage.getItem('userId') || '';

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

    const handleOpenModal = (trip) => {
        const normalizedWaypoints = (trip.waypoints || []).map((wp) => ({
            ...wp,
            city: wp.city || '',
            description: wp.description || '',
            startDate: wp.startDate || wp.startDateTime?.slice(0, 10) || '',
            endDate: wp.endDate || wp.endDateTime?.slice(0, 10) || '',
        }));

        setSelectedTrip({
            ...trip,
            waypoints: normalizedWaypoints,
            createdBy: currentUserId,
        });
    };

    const closeModal = () => {
        setSelectedTrip(null);
    };

    const hasTrips = myTrips.length > 0;

    return (
        <div className="my-trips">
            <div className="my-trips-header">
                <div className="my-trips-title-group">
                    <h1 className="my-trips-title">📍 Мои путешествия</h1>
                </div>
                <Link to="/home" className="my-trips-create-btn">
                    + Найти маршрут
                </Link>
            </div>

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
                                    description={trip.description}
                                    tags={trip.tags}
                                    image={trip.image}
                                    waypoints={trip.waypoints}
                                    liked={trip.liked || false}
                                    isMyTrip={true}
                                    isPublic={trip.isPublic}
                                    createdBy={currentUserId}
                                    onEdit={handleEdit}
                                />


                                <div className="my-trips-actions">
                                    <button
                                        className="trip-card-btn trip-card-btn-secondary"
                                        onClick={() => handleTogglePublic(trip.id)}
                                    >
                                        {trip.isPublic ? '🌍 Публичный' : '🔒 Приватный'}
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
                <div className="my-trips-empty">
                    <div className="my-trips-empty-icon">🗺️</div>
                    <h3 className="my-trips-empty-title">Путешествий пока нет</h3>
                    <p className="my-trips-empty-text">
                        Добавьте понравившийся публичный маршрут «к себе», чтобы начать
                        планирование.
                    </p>
                    <Link to="/home" className="my-trips-empty-btn">
                        Найти маршрут
                    </Link>
                </div>
            )}

            {selectedTrip && (
                <TripModal
                    trip={selectedTrip}
                    onClose={closeModal}
                    currentUserId={currentUserId}
                    isMyTrip={true}
                    onEdit={() => handleEdit(selectedTrip.id)}
                    onAddToMyTrips={() => {}}
                />
            )}
        </div>
    );
};

export default MyTrips;
