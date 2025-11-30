// src/components/Trip/MapPreview.jsx
import React from 'react';
import './MapPreview.css';

const MapPreview = ({ waypoints }) => {
    return (
        <div className="map-preview">
            <div className="map-preview-icon">🗺️</div>
            <h4 className="map-preview-title">Предпросмотр маршрута</h4>
            <p className="map-preview-description">
                Здесь будет карта с маршрутными точками после интеграции с картографическим сервисом.
            </p>

            <div className="map-preview-waypoints">
                {waypoints.map((wp, idx) => (
                    <div key={wp.id} className="map-preview-item">
                        <div className="map-preview-item-number">{idx + 1}</div>
                        <div className="map-preview-item-content">
                            <div className="map-preview-item-title">
                                {wp.city || `Точка ${idx + 1}`}
                            </div>
                            {(wp.latitude || wp.longitude) && (
                                <div className="map-preview-item-coords">
                                    {wp.latitude || '—'}, {wp.longitude || '—'}
                                </div>
                            )}
                            {wp.duration && (
                                <div className="map-preview-item-duration">
                                    Длительность: {wp.duration}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MapPreview;
