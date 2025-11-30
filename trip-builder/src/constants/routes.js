// src/constants/routes.js
export const ROUTES = {
    HOME: '/',
    MY_TRIPS: '/my-trips',
    TRIP_DETAIL: '/trip/:id',
    CONSTRUCTOR: '/constructor',
    FAVORITES: '/favorites',
    TODO_LIST: '/todo-list',
    PROFILE: '/profile',
    NOT_FOUND: '*',
};

export const NAVIGATION_ITEMS = [
    { path: ROUTES.HOME, label: 'Главная', icon: '🏠' },
    { path: ROUTES.MY_TRIPS, label: 'Мои путешествия', icon: '🗺️' },
    { path: ROUTES.TODO_LIST, label: 'Список дел', icon: '✅' },
    { path: ROUTES.FAVORITES, label: 'Избранное', icon: '❤️' },
    { path: ROUTES.CONSTRUCTOR, label: 'Конструктор', icon: '🧭' },
    { path: ROUTES.PROFILE, label: 'Профиль', icon: '👤' },
];
