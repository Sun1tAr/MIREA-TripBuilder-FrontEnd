// src/pages/NotFound.jsx
import React from 'react';
import './NotFound.css';
import { Link, useNavigate } from 'react-router-dom';
import { handlers } from '../utils/handlers';

const NotFound = () => {
    const navigate = useNavigate();

    const handleReportError = () => {
        handlers.onReportError('404', window.location.pathname);
        alert('Ошибка сообщена. Спасибо за внимание!');
    };

    return (
        <div className="not-found">
            {/* Контент ошибки */}
            <div className="not-found-content">
                {/* Большой эмодзи/иллюстрация */}
                <div className="not-found-icon">🗺️</div>

                {/* Код ошибки */}
                <div className="not-found-code">404</div>

                {/* Заголовок */}
                <h1 className="not-found-title">Страница не найдена</h1>

                {/* Описание */}
                <p className="not-found-description">
                    К сожалению, страница, которую вы ищете, не существует. Возможно,
                    она была удалена или адрес неправильный.
                </p>

                {/* Подсказка */}
                <p className="not-found-hint">
                    💡 Совет: проверьте адрес в строке браузера или вернитесь на главную
                    страницу
                </p>

                {/* Кнопки действий */}
                <div className="not-found-actions">
                    <Link to="/" className="not-found-btn not-found-btn--primary">
                        🏠 На главную
                    </Link>
                    <Link to="/my-trips" className="not-found-btn not-found-btn--secondary">
                        🗺️ Мои путешествия
                    </Link>
                    <button
                        onClick={handleReportError}
                        className="not-found-btn not-found-btn--outline"
                    >
                        📢 Сообщить об ошибке
                    </button>
                </div>
            </div>

            {/* Декоративный фон */}
            <div className="not-found-decoration">
                <div className="not-found-decoration-item">🧭</div>
                <div className="not-found-decoration-item">✈️</div>
                <div className="not-found-decoration-item">🏔️</div>
                <div className="not-found-decoration-item">🌍</div>
                <div className="not-found-decoration-item">🗻</div>
            </div>
        </div>
    );
};

export default NotFound;
