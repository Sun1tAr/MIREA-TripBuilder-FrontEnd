// src/components/Layout/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { handlers } from '../../utils/handlers';

const Header = ({ onMenuClick }) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = React.useState('');

    const handleSearch = () => {
        if (searchQuery.trim()) {
            handlers.onSearch(searchQuery);
            // Переходим на страницу всех путешествий с поисковым запросом
            navigate('/');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <header className="header">
            {/* Left: Logo & Menu */}
            <div className="header-left">
                <button className="header-menu-btn" onClick={onMenuClick} title="Меню">
                    ☰
                </button>
                <Link to="/" className="header-logo">
                    <span>🌍</span>
                    <span>Trip Builder</span>
                </Link>
            </div>

            {/* Center: Search */}
            <div className="header-search-container">
                <input
                    type="text"
                    placeholder="Поиск путешествий..."
                    value={searchQuery}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className="header-search"
                />
                <button
                    onClick={handleSearch}
                    className="header-search-btn"
                    title="Поиск"
                    disabled={!searchQuery.trim()}
                >
                    🔍
                </button>
            </div>

            {/* Right: Notifications & Profile */}
            <div className="header-right">
                <button
                    onClick={() => handlers.onReportError('Уведомления')}
                    className="header-icon-btn"
                    title="Уведомления"
                >
                    🔔
                </button>
                <button
                    onClick={() => navigate('/profile')}
                    className="header-icon-btn"
                    title="Профиль"
                >
                    👤
                </button>
            </div>
        </header>
    );
};

export default Header;