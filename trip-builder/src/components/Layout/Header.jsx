// src/components/Layout/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { handlers } from '../../utils/handlers';

const Header = ({ onMenuClick }) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = React.useState('');

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.trim()) {
            handlers.onSearch(query);
        }
    };

    return (
        <header className="header">
            {/* Left: Logo & Menu */}
            <div className="header-left">
                <button className="header-menu-btn" onClick={onMenuClick} title="Меню">
                    ☰
                </button>
                <Link to="/" className="header-logo">
                    <span>🧭</span>
                    <span>Trip Builder</span>
                </Link>
            </div>

            {/* Center: Search */}
            <input
                type="text"
                placeholder="Поиск путешествий..."
                value={searchQuery}
                onChange={handleSearch}
                className="header-search"
            />

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
