// src/context/TripsContext.jsx
import React, { createContext, useCallback, useState } from 'react';

export const TripsContext = createContext();

export const TripsProvider = ({ children }) => {
    const [trips, setTrips] = useState([
        {
            id: 1,
            title: 'Парижская романтика',
            country: 'Франция',
            duration: '5 дней',
            description: 'Исследуйте город света',
            tags: ['Европа', 'Город', 'Романтика'],
            liked: false,
            isPublic: true,
            createdAt: new Date().toISOString(),
        },
    ]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addTrip = useCallback((tripData) => {
        const newTrip = {
            id: Math.max(...trips.map((t) => t.id), 0) + 1,
            ...tripData,
            createdAt: new Date().toISOString(),
        };
        setTrips((prev) => [...prev, newTrip]);
        return newTrip;
    }, [trips]);

    const updateTrip = useCallback((id, updates) => {
        setTrips((prev) =>
            prev.map((trip) => (trip.id === id ? { ...trip, ...updates } : trip))
        );
    }, []);

    const deleteTrip = useCallback((id) => {
        setTrips((prev) => prev.filter((trip) => trip.id !== id));
    }, []);

    const toggleLike = useCallback((id) => {
        updateTrip(id, { liked: !trips.find((t) => t.id === id)?.liked });
    }, [trips, updateTrip]);

    const getLikedTrips = useCallback(() => {
        return trips.filter((trip) => trip.liked);
    }, [trips]);

    const getMyTrips = useCallback(() => {
        return trips.filter((trip) => trip.isMyTrip);
    }, [trips]);

    const value = {
        trips,
        loading,
        error,
        addTrip,
        updateTrip,
        deleteTrip,
        toggleLike,
        getLikedTrips,
        getMyTrips,
    };

    return (
        <TripsContext.Provider value={value}>{children}</TripsContext.Provider>
    );
};
