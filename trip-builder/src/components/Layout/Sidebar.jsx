// src/components/Layout/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Путешествия', icon: '🧭' },
        { path: '/my-trips', label: 'Мои путешествия', icon: '🗺️' },
        { path: '/todo', label: 'Список дел', icon: '✅' },
        { path: '/favorites', label: 'Избранное', icon: '❤️' },
    ];

    const createItems = [
        { path: '/create', label: 'Создать маршрут', icon: '➕', isCreate: true },
    ];

    const isActive = (path) => location.pathname === path;

    const NavLink = ({ to, icon, label, isCreate, onClick }) => (
        <Link
            to={to}
            onClick={onClick}
            className={`sidebar-link ${isActive(to) ? 'sidebar-link--active' : ''} ${
                isCreate ? 'sidebar-link--create' : ''
            }`}
        >
            <span className="sidebar-link-icon">{icon}</span>
            {isOpen && <span className="sidebar-link-label">{label}</span>}
        </Link>
    );

    return (
        <>
            {/* Overlay для мобильных */}
            {isOpen && <div className="sidebar-overlay" onClick={onClose} />}

            {/* Сайдбар */}
            <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
                {/* Основная навигация */}
                <nav className="sidebar-nav sidebar-nav--main">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            icon={item.icon}
                            label={item.label}
                            onClick={onClose}
                        />
                    ))}
                </nav>

                {/* Секция создания маршрута */}
                <nav className="sidebar-nav sidebar-nav--create">
                    {createItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            icon={item.icon}
                            label={item.label}
                            isCreate={item.isCreate}
                            onClick={onClose}
                        />
                    ))}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
