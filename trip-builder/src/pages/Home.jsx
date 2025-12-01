// src/pages/Home.jsx
import React, { useState } from 'react';
import './Home.css';
import TripCard from '../components/Common/TripCard';
import { handlers } from '../utils/handlers';

const Home = () => {
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

  const handleSearch = async () => {
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
      // Предполагаем, что handlers.searchTrips вернет промис с массивом маршрутов
      const result = await handlers.searchTrips(payload);
      setTrips(Array.isArray(result) ? result : []);
    } catch (e) {
      console.error('Ошибка при поиске путешествий', e);
      setTrips([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="home">
      {/* Заголовок */}
      <header className="home-header">
        <h1 className="home-title">Публичные путешествия</h1>
        <p className="home-subtitle">
          Откройте новые места и вдохновитесь идеями путешествий от нашего сообщества
        </p>
      </header>

      {/* Фильтры и поиск */}
      <section className="home-filters">
        <form onSubmit={handleSubmit}>
          <div className="filter-section">
            <div className="filters-grid">
              {/* Название маршрута */}
              <div className="filter-group">
                <label className="filter-label" htmlFor="title">
                  Название маршрута
                </label>
                <input
                  id="title"
                  type="text"
                  className="filter-input"
                  placeholder="Например, Путешествие по Италии"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Список стран */}
              <div className="filter-group">
                <label className="filter-label" htmlFor="countries">
                  Страны
                </label>
                <input
                  id="countries"
                  type="text"
                  className="filter-input"
                  placeholder="Например, Франция, Италия"
                  value={countries}
                  onChange={(e) => setCountries(e.target.value)}
                />
              </div>

              {/* Список городов */}
              <div className="filter-group">
                <label className="filter-label" htmlFor="cities">
                  Города
                </label>
                <input
                  id="cities"
                  type="text"
                  className="filter-input"
                  placeholder="Например, Париж, Рим"
                  value={cities}
                  onChange={(e) => setCities(e.target.value)}
                />
              </div>

              {/* Длительность */}
              <div className="filter-group">
                <label className="filter-label">Желаемая длительность (дни)</label>
                <div className="filter-input-group">
                  <input
                    type="number"
                    min="1"
                    className="filter-input"
                    placeholder="От"
                    value={durationFrom}
                    onChange={(e) => setDurationFrom(e.target.value)}
                  />
                  <input
                    type="number"
                    min="1"
                    className="filter-input"
                    placeholder="До"
                    value={durationTo}
                    onChange={(e) => setDurationTo(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Кнопка поиска */}
          <button
            type="submit"
            className="home-search-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Поиск...' : 'Искать маршруты'}
          </button>
        </form>
      </section>

      {/* Результаты */}
      <section className="home-results">
        {hasSearched && (
          <p className="home-results-count">
            Найдено {trips.length} маршрутов
          </p>
        )}

        {trips.length > 0 ? (
          <div className="home-grid">
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        ) : hasSearched ? (
          <div className="home-empty">
            <span className="home-empty-icon">🔍</span>
            <h2 className="home-empty-title">Маршрутов не найдено</h2>
            <p className="home-empty-text">
              Попробуйте изменить параметры поиска: уточните название, страны, города или длительность.
            </p>
          </div>
        ) : (
          <div className="home-empty">
            <span className="home-empty-icon">🌍</span>
            <h2 className="home-empty-title">Найдите своё идеальное путешествие</h2>
            <p className="home-empty-text">
              Укажите интересующие страны, города и длительность, чтобы увидеть подходящие маршруты.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
