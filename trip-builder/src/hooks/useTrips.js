// src/hooks/useTrips.js
import { useContext, useCallback } from 'react';
import { TripsContext } from '../context/TripsContext';

export const useTrips = () => {
    const context = useContext(TripsContext);

    if (!context) {
        throw new Error('useTrips должен использоваться внутри TripsProvider');
    }

    return context;
};

// Дополнительно полезные хуки
export const useMyTrips = () => {
    const { getMyTrips } = useTrips();
    return getMyTrips();
};

export const useLikedTrips = () => {
    const { getLikedTrips } = useTrips();
    return getLikedTrips();
};
