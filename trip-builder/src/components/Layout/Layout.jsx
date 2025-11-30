// src/components/Layout/Layout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import './Layout.css';

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const sidebarWidth = isSidebarOpen ? '240px' : '60px';

    return (
        <div className="layout-container">
            {/* Хедер */}
            <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

            {/* Основной контейнер */}
            <div className="layout-wrapper">
                {/* Сайдбар */}
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

                {/* Основной контент */}
                <main className="layout-main" style={{ marginLeft: sidebarWidth }}>
                    <div className="layout-content">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* Футер */}
            <Footer sidebarWidth={sidebarWidth} />
        </div>
    );
};

export default Layout;
