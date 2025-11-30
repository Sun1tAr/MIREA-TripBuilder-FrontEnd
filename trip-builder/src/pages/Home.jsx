// src/pages/Home.jsx
import React, { useState } from 'react';
import './Home.css';
import TripCard from '../components/Common/TripCard';
import Input from '../components/Common/Input';
import { handlers } from '../utils/handlers';

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCountry, setFilterCountry] = useState('');
    const [filterCity, setFilterCity] = useState('');
    const [filterDuration, setFilterDuration] = useState('');

    // Примеры данных путешествий
    const trips = [
        {
            id: 1,
            title: 'Парижская романтика',
            country: 'Франция',
            duration: '5 дней',
            description: 'Исследуйте город света, его достопримечательности и культуру',
            tags: ['Европа', 'Город', 'Романтика'],
            isPublic: true,
        },
        {
            id: 2,
            title: 'Горный Алтай',
            country: 'Россия',
            duration: '10 дней',
            description: 'Поход в горы, озёра и нетронутая природа Алтая',
            tags: ['Природа', 'Горы', 'Приключения'],
            isPublic: true,
        },
        {
            id: 3,
            title: 'Токийский опыт',
            country: 'Япония',
            duration: '7 дней',
            description: 'Погружение в культуру Японии, храмы и современные технологии',
            tags: ['Азия', 'Город', 'Культура'],
            isPublic: true,
        },
        {
            id: 4,
            title: 'Пляжи Бали',
            country: 'Индонезия',
            duration: '8 дней',
            description: 'Релакс на пляжах, серфинг и индонезийская кухня',
            tags: ['Пляж', 'Релакс', 'Серфинг'],
            isPublic: true,
        },
    ];

    const handleFilterClick = (type) => {
        if (type === 'country') {
            handlers.onFilterCountry(filterCountry || 'Все страны');
        } else if (type === 'city') {
            handlers.onFilterCity(filterCity || 'Все города');
        } else if (type === 'duration') {
            handlers.onFilterDuration(filterDuration || 'Вся длительность');
        }
    };

    const handleSearch = () => {
        handlers.onSearch(searchQuery);
    };

    const filteredTrips = trips.filter((trip) => {
        const matchesSearch = trip.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesCountry = !filterCountry || trip.country === filterCountry;
        const matchesDuration = !filterDuration || trip.duration === filterDuration;
        return matchesSearch && matchesCountry && matchesDuration;
    });

    return (
        <div className="home">
            {/* Заголовок */}
            <div className="home-header">
                <h1 className="home-title">🌍 Trip Builder</h1>
                <p className="home-subtitle">
                    Откройте новые места и вдохновитесь идеями путешествий от нашего
                    сообщества
                </p>
            </div>

            {/* Поиск и фильтры */}
            <div className="home-filters">
                {/* Поиск */}
                <div className="filter-section">
                    <Input
                        label="🔍 Поиск"
                        placeholder="Введите название маршрута..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        fullWidth
                    />
                </div>

                {/* Фильтры */}
                <div className="filters-grid">
                    {/* Страна */}
                    <div className="filter-group">
                        <label className="filter-label">📍 Страна</label>
                        <div className="filter-input-group">
                            <input
                                type="text"
                                placeholder="Например: Франция"
                                value={filterCountry}
                                onChange={(e) => setFilterCountry(e.target.value)}
                                className="filter-input"
                            />
                            <button
                                onClick={() => handleFilterClick('country')}
                                className="filter-btn"
                            >
                                ✓
                            </button>
                        </div>
                    </div>

                    {/* Город */}
                    <div className="filter-group">
                        <label className="filter-label">🏙️ Город</label>
                        <div className="filter-input-group">
                            <input
                                type="text"
                                placeholder="Например: Париж"
                                value={filterCity}
                                onChange={(e) => setFilterCity(e.target.value)}
                                className="filter-input"
                            />
                            <button
                                onClick={() => handleFilterClick('city')}
                                className="filter-btn"
                            >
                                ✓
                            </button>
                        </div>
                    </div>

                    {/* Длительность */}
                    <div className="filter-group">
                        <label className="filter-label">⏱️ Длительность</label>
                        <select
                            value={filterDuration}
                            onChange={(e) => setFilterDuration(e.target.value)}
                            className="filter-select"
                        >
                            <option value="">Все</option>
                            <option value="3 дня">3 дня</option>
                            <option value="5 дней">5 дней</option>
                            <option value="7 дней">7 дней</option>
                            <option value="10 дней">10 дней</option>
                            <option value="14 дней">14 дней</option>
                        </select>
                    </div>
                </div>

                {/* Кнопка поиска */}
                <button onClick={handleSearch} className="home-search-btn">
                    🔎 Искать
                </button>
            </div>

            {/* Результаты */}
            {filteredTrips.length > 0 ? (
                <div className="home-results">
                    <p className="home-results-count">
                        Найдено {filteredTrips.length} маршрутов
                    </p>
                    <div className="home-grid">
                        {filteredTrips.map((trip) => (
                            <TripCard
                                key={trip.id}
                                {...trip}
                                onAddToMyTrips={(id) => console.log('Добавлено:', id)}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="home-empty">
                    <div className="home-empty-icon">🔍</div>
                    <h2 className="home-empty-title">Ничего не найдено</h2>
                    <p className="home-empty-text">
                        Попробуйте изменить параметры поиска
                    </p>
                </div>
            )}
        </div>
    );
};

export default Home;
