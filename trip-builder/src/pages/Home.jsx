// src/pages/Home.jsx

import React, { useState, useEffect } from 'react';
import './Home.css';
import TripCard from '../components/Common/TripCard';
import { handlers } from '../utils/handlers';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    // Поля формы поиска
    const [title, setTitle] = useState('');
    const [countries, setCountries] = useState('');
    const [cities, setCities] = useState('');
    const [durationFrom, setDurationFrom] = useState('');
    const [durationTo, setDurationTo] = useState('');

    // Результаты поиска
    const [trips, setTrips] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const currentUserId = localStorage.getItem('userId') || '';

    useEffect(() => {
        loadAllTrips();
    }, []);

    const loadAllTrips = async () => {
        console.log('[HOME] loadAllTrips start');
        setIsLoading(true);
        try {
            // Загружаем публичные маршруты
            const publicTrips = await handlers.getAllPublicTrips();

            // Загружаем свои маршруты
            const myTrips = handlers.getMyTrips();
            const myPublicTrips = myTrips.filter((t) => t.isPublic);

            // Объединяем, добавляя к своим маршрутам флаги
            const allTrips = [
                ...publicTrips,
                ...myPublicTrips.map((t) => ({
                    ...t,
                    createdBy: currentUserId,
                    isMyTrip: true,
                })),
            ];

            // Удаляем дубликаты по ID
            const uniqueTrips = Array.from(
                new Map(allTrips.map((trip) => [trip.id, trip])).values()
            );

            console.log('[HOME] loadAllTrips result', {
                publicCount: publicTrips.length,
                myPublicCount: myPublicTrips.length,
                total: uniqueTrips.length,
            });

            setTrips(uniqueTrips);
        } catch (e) {
            console.error('[HOME] Ошибка загрузки маршрутов', e);
            setTrips([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = async () => {
        console.log('[HOME] handleSearch');
        setIsLoading(true);
        setHasSearched(true);

        const payload = {
            title: title.trim() || null,
            countries: countries
                .split(',')
                .map((c) => c.trim())
                .filter(Boolean),
            cities: cities
                .split(',')
                .map((c) => c.trim())
                .filter(Boolean),
            durationFrom: durationFrom ? Number(durationFrom) : null,
            durationTo: durationTo ? Number(durationTo) : null,
        };

        try {
            // Ищем в публичных маршрутах
            const searchResult = await handlers.searchTrips(payload);

            // Фильтруем свои опубликованные маршруты
            const myTrips = handlers.getMyTrips().filter((t) => t.isPublic);

            const myFiltered = myTrips
                .filter((trip) => {
                    const matchesTitle =
                        !payload.title ||
                        trip.title.toLowerCase().includes(payload.title.toLowerCase());

                    const matchesCountry =
                        !payload.countries ||
                        payload.countries.length === 0 ||
                        payload.countries.some((c) =>
                            trip.country?.toLowerCase().includes(c.toLowerCase())
                        );

                    const matchesCities =
                        !payload.cities ||
                        payload.cities.length === 0 ||
                        payload.cities.some((city) =>
                            trip.waypoints.some((wp) =>
                                wp.city.toLowerCase().includes(city.toLowerCase())
                            )
                        );

                    const parseDuration = (str) => parseInt(str, 10) || 0;
                    const tripDuration = parseDuration(trip.duration);

                    const matchesDurationFrom =
                        !payload.durationFrom || tripDuration >= payload.durationFrom;
                    const matchesDurationTo =
                        !payload.durationTo || tripDuration <= payload.durationTo;

                    return (
                        matchesTitle &&
                        matchesCountry &&
                        matchesCities &&
                        matchesDurationFrom &&
                        matchesDurationTo
                    );
                })
                .map((t) => ({
                    ...t,
                    createdBy: currentUserId,
                    isMyTrip: true,
                }));

            // Объединяем результаты
            const allResults = [...searchResult, ...myFiltered];

            // Удаляем дубликаты
            const uniqueResults = Array.from(
                new Map(allResults.map((trip) => [trip.id, trip])).values()
            );

            console.log('[HOME] search result', {
                searchCount: searchResult.length,
                myFilteredCount: myFiltered.length,
                total: uniqueResults.length,
            });

            setTrips(uniqueResults);
        } catch (e) {
            console.error('[HOME] Ошибка при поиске путешествий', e);
            setTrips([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch();
    };

    const handleAddToMyTrips = (id) => {
        console.log('[HOME] addToMyTrips click', { id });
        const copy = handlers.onAddToMyTrips(id);
        console.log('[HOME] addToMyTrips copy', copy);
        if (copy && copy.id) {
            navigate(`/create?from=myTrip&tripId=${copy.id}`);
        }
    };

    const handleEdit = (id) => {
        handlers.onEditRoute(id);
        navigate(`/create?from=myTrip&tripId=${id}`);
    };

    return (
        <div className="home">
            {/* Заголовок */}
            <div className="home-header">
                <h1 className="home-title">🌍 Путешествия</h1>
                <p className="home-subtitle">
                    Откройте для себя интересные маршруты по всему миру
                </p>
            </div>

            {/* Фильтры и поиск */}
            <form className="home-filters" onSubmit={handleSubmit}>
                <div className="filter-section">
                    <label className="filter-label">Название маршрута</label>
                    <input
                        type="text"
                        className="filter-input"
                        placeholder="Например: Европа за месяц"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="filters-grid">
                    <div className="filter-group">
                        <label className="filter-label">Страны</label>
                        <input
                            type="text"
                            className="filter-input"
                            placeholder="Франция, Италия"
                            value={countries}
                            onChange={(e) => setCountries(e.target.value)}
                        />
                    </div>

                    <div className="filter-group">
                        <label className="filter-label">Города</label>
                        <input
                            type="text"
                            className="filter-input"
                            placeholder="Париж, Рим"
                            value={cities}
                            onChange={(e) => setCities(e.target.value)}
                        />
                    </div>

                    <div className="filter-group">
                        <label className="filter-label">Длительность (дни)</label>
                        <div className="filter-input-group">
                            <input
                                type="number"
                                className="filter-input"
                                placeholder="От"
                                value={durationFrom}
                                onChange={(e) => setDurationFrom(e.target.value)}
                            />
                            <input
                                type="number"
                                className="filter-input"
                                placeholder="До"
                                value={durationTo}
                                onChange={(e) => setDurationTo(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <button type="submit" className="home-search-btn">
                    🔍 Искать маршруты
                </button>
            </form>

            {/* Результаты */}
            <div className="home-results">
                {isLoading ? (
                    <p style={{ textAlign: 'center', color: '#718096', padding: '40px 20px' }}>
                        ⏳ Загрузка маршрутов...
                    </p>
                ) : trips.length > 0 ? (
                    <>
                        <p className="home-results-count">Найдено {trips.length} маршрутов</p>
                        <div className="home-grid">
                            {trips.map((trip) => (
                                <TripCard
                                    key={trip.id}
                                    id={trip.id}
                                    title={trip.title}
                                    country={trip.country}
                                    duration={trip.duration}
                                    description={trip.description}
                                    tags={trip.tags}
                                    image={trip.image}
                                    waypoints={trip.waypoints}
                                    liked={trip.liked || false}
                                    isMyTrip={trip.isMyTrip || false}
                                    isPublic={trip.isPublic || true}
                                    createdBy={trip.createdBy}
                                    onEdit={handleEdit}
                                    onAddToMyTrips={handleAddToMyTrips}
                                />
                            ))}
                        </div>
                    </>
                ) : hasSearched ? (
                    <div className="home-empty">
                        <div className="home-empty-icon">🔍</div>
                        <h3 className="home-empty-title">Маршруты не найдены</h3>
                        <p className="home-empty-text">
                            Попробуйте изменить параметры поиска: уточните название, страны,
                            города или длительность.
                        </p>
                    </div>
                ) : (
                    <div className="home-empty">
                        <div className="home-empty-icon">🗺️</div>
                        <h3 className="home-empty-title">Начните поиск</h3>
                        <p className="home-empty-text">
                            Укажите интересующие страны, города и длительность, чтобы увидеть
                            подходящие маршруты.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
