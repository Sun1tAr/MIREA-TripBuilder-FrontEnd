// src/components/Layout/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = ({ sidebarWidth }) => {
    const links = [
        {
            title: 'О приложении',
            items: [
                { label: 'О нас', href: '#' },
                { label: 'Команда', href: '#' },
                { label: 'Блог', href: '#' },
            ],
        },
        {
            title: 'Ресурсы',
            items: [
                { label: 'Документация', href: '#' },
                { label: 'FAQ', href: '#' },
                { label: 'Поддержка', href: '#' },
            ],
        },
        {
            title: 'Социальные сети',
            items: [
                { label: 'Twitter', href: '#' },
                { label: 'Instagram', href: '#' },
                { label: 'Facebook', href: '#' },
            ],
        },
    ];

    return (
        <footer className="footer" style={{ marginLeft: sidebarWidth }}>
            <div className="footer-container">
                {/* Три колонки */}
                <div className="footer-grid">
                    {links.map((column, idx) => (
                        <div key={idx} className="footer-column">
                            <h4 className="footer-title">{column.title}</h4>
                            <ul className="footer-list">
                                {column.items.map((item, itemIdx) => (
                                    <li key={itemIdx}>
                                        <a href={item.href} className="footer-link">
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Разделитель */}
                <hr className="footer-divider" />

                {/* Copyright */}
                <div className="footer-copyright">
                    © 2024 Trip Builder. Все права защищены.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
