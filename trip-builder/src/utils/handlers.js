// src/utils/handlers.js

const logAction = (actionName, data = null) => {
    const timestamp = new Date().toLocaleTimeString();
    const message = data
        ? `[${timestamp}] "${actionName}" → ${JSON.stringify(data)}`
        : `[${timestamp}] "${actionName}"`;
    console.log(`[TRIP BUILDER LOGIC]: ${message}`);
};

const storageLog = (actionName, data = null) => {
    const timestamp = new Date().toLocaleTimeString();
    const message = data
        ? `[${timestamp}] "${actionName}" → ${JSON.stringify(data)}`
        : `[${timestamp}] "${actionName}"`;
    console.log(`[TRIP BUILDER STORAGE]: ${message}`);
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ===== Безопасная работа с датами =====

const safeParseDate = (dateString) => {
    if (!dateString || typeof dateString !== 'string') return null;
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
};

const safeFormatDateTime = (date) => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
        return new Date().toISOString().slice(0, 16);
    }
    return date.toISOString().slice(0, 16);
};

// ===== Нормализация waypoint (4 поля: startDate, endDate, startTime, endTime) =====

const normalizeWaypoint = (wp) => {
    const latitude = typeof wp.latitude === 'string' ? parseFloat(wp.latitude) : wp.latitude || 0;
    const longitude = typeof wp.longitude === 'string' ? parseFloat(wp.longitude) : wp.longitude || 0;

    if (wp.duration && (!wp.startDateTime || !wp.endDateTime)) {
        const startDateTime = safeFormatDateTime(safeParseDate(wp.startDateTime) || new Date());
        const startDate = safeParseDate(startDateTime);

        if (startDate) {
            const durationDays = parseInt(wp.duration) || 1;
            const endDateTime = safeFormatDateTime(new Date(startDate.getTime() + durationDays * 24 * 60 * 60 * 1000));

            return {
                ...wp,
                latitude,
                longitude,
                startDateTime,
                endDateTime,
                startDate: startDateTime.slice(0, 10),
                endDate: endDateTime.slice(0, 10),
                startTime: startDateTime.slice(11, 16),
                endTime: endDateTime.slice(11, 16),
                duration: undefined,
            };
        }
    }

    const startDateTime = safeFormatDateTime(safeParseDate(wp.startDateTime));
    const endDateTime = safeFormatDateTime(safeParseDate(wp.endDateTime));

    return {
        ...wp,
        latitude,
        longitude,
        startDateTime,
        endDateTime,
        startDate: startDateTime.slice(0, 10),
        endDate: endDateTime.slice(0, 10),
        startTime: startDateTime.slice(11, 16),
        endTime: endDateTime.slice(11, 16),
    };
};

// ===== MOCK_TRIPS — ВСЕ 10 ПОЕЗДОК с новой структурой =====

export const MOCK_TRIPS = [
    {
        id: 1,
        title: 'Парижская романтика',
        country: 'Франция',
        duration: '3 дня',
        description: 'Исследуйте город света: Эйфелева башня, Лувр, Монмартр и круиз по Сене.',
        tags: ['Европа', 'Город', 'Романтика', 'Культура'],
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=200&fit=crop',
        isPublic: true,
        waypoints: [
            {
                city: 'Париж',
                description: 'Эйфелева башня и прогулка по Марсову полю',
                latitude: 48.8584,
                longitude: 2.2945,
                startDateTime: '2024-06-01T08:00',
                endDateTime: '2024-06-01T18:00',
                startDate: '2024-06-01',
                endDate: '2024-06-01',
                startTime: '08:00',
                endTime: '18:00',
            },
            {
                city: 'Версаль',
                description: 'Дворец Версаля и его сады',
                latitude: 48.8047,
                longitude: 2.1203,
                startDateTime: '2024-06-02T09:00',
                endDateTime: '2024-06-02T17:00',
                startDate: '2024-06-02',
                endDate: '2024-06-02',
                startTime: '09:00',
                endTime: '17:00',
            },
            {
                city: 'Париж',
                description: 'Лувр и Нотр-Дам',
                latitude: 48.8606,
                longitude: 2.3352,
                startDateTime: '2024-06-03T10:00',
                endDateTime: '2024-06-03T19:00',
                startDate: '2024-06-03',
                endDate: '2024-06-03',
                startTime: '10:00',
                endTime: '19:00',
            },
        ],
    },
    {
        id: 2,
        title: 'Горный Алтай',
        country: 'Россия',
        duration: '10 дней',
        description: 'Экстремальный поход по Телецкому озеру, Катунскому хребту и Чуйскому тракту.',
        tags: ['Россия', 'Горы', 'Приключения', 'Природа'],
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop',
        isPublic: true,
        waypoints: [
            {
                city: 'Бийск',
                description: 'Старт путешествия',
                latitude: 52.6316,
                longitude: 85.9589,
                startDateTime: '2024-07-01T08:00',
                endDateTime: '2024-07-01T16:00',
                startDate: '2024-07-01',
                endDate: '2024-07-01',
                startTime: '08:00',
                endTime: '16:00',
            },
            {
                city: 'Телецкое озеро',
                description: 'Катание на лодке, водопады',
                latitude: 51.6507,
                longitude: 87.2667,
                startDateTime: '2024-07-02T09:00',
                endDateTime: '2024-07-02T18:00',
                startDate: '2024-07-02',
                endDate: '2024-07-02',
                startTime: '09:00',
                endTime: '18:00',
            },
            {
                city: 'Катунь',
                description: 'Rafting и горные тропы',
                latitude: 51.2333,
                longitude: 86.65,
                startDateTime: '2024-07-03T10:00',
                endDateTime: '2024-07-10T19:00',
                startDate: '2024-07-03',
                endDate: '2024-07-10',
                startTime: '10:00',
                endTime: '19:00',
            },
        ],
    },
    {
        id: 3,
        title: 'Токийский опыт',
        country: 'Япония',
        duration: '7 дней',
        description: 'От Сибуи до Асакусы: неон, храмы, суши и высокоскоростные поезда.',
        tags: ['Азия', 'Город', 'Культура', 'Еда'],
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=200&fit=crop',
        isPublic: true,
        waypoints: [
            {
                city: 'Токио - Сибуя',
                description: 'Переход и неоновые огни',
                latitude: 35.6595,
                longitude: 139.7004,
                startDateTime: '2024-08-01T08:00',
                endDateTime: '2024-08-01T20:00',
                startDate: '2024-08-01',
                endDate: '2024-08-01',
                startTime: '08:00',
                endTime: '20:00',
            },
            {
                city: 'Асакуса',
                description: 'Храм Сенсо-дзи',
                latitude: 35.7148,
                longitude: 139.7967,
                startDateTime: '2024-08-02T09:00',
                endDateTime: '2024-08-02T17:00',
                startDate: '2024-08-02',
                endDate: '2024-08-02',
                startTime: '09:00',
                endTime: '17:00',
            },
            {
                city: 'Гинза',
                description: 'Шопинг и рестораны',
                latitude: 35.6728,
                longitude: 139.7637,
                startDateTime: '2024-08-03T10:00',
                endDateTime: '2024-08-07T22:00',
                startDate: '2024-08-03',
                endDate: '2024-08-07',
                startTime: '10:00',
                endTime: '22:00',
            },
        ],
    },
    {
        id: 4,
        title: 'Пляжи Бали',
        country: 'Индонезия',
        duration: '8 дней',
        description: 'Семиньяк, Улувату, Убуд: серфинг, йога и рисовые террасы.',
        tags: ['Пляж', 'Релакс', 'Серфинг', 'Индонезия'],
        image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&h=200&fit=crop',
        isPublic: true,
        waypoints: [
            {
                city: 'Семиньяк',
                description: 'Пляжный серфинг',
                latitude: -8.6894,
                longitude: 115.1693,
                startDateTime: '2024-09-01T07:00',
                endDateTime: '2024-09-01T17:00',
                startDate: '2024-09-01',
                endDate: '2024-09-01',
                startTime: '07:00',
                endTime: '17:00',
            },
            {
                city: 'Улувату',
                description: 'Храм на скале и закаты',
                latitude: -8.8272,
                longitude: 115.2681,
                startDateTime: '2024-09-02T08:00',
                endDateTime: '2024-09-02T20:00',
                startDate: '2024-09-02',
                endDate: '2024-09-02',
                startTime: '08:00',
                endTime: '20:00',
            },
            {
                city: 'Убуд',
                description: 'Обезьяний лес и рисовые террасы',
                latitude: -8.5069,
                longitude: 115.2625,
                startDateTime: '2024-09-03T09:00',
                endDateTime: '2024-09-08T18:00',
                startDate: '2024-09-03',
                endDate: '2024-09-08',
                startTime: '09:00',
                endTime: '18:00',
            },
        ],
    },
    {
        id: 5,
        title: 'Римские каникулы',
        country: 'Италия',
        duration: '6 дней',
        description: 'Колизей, Ватикан, фонтан Треви и паста карбонара каждый день.',
        tags: ['Европа', 'История', 'Гастрономия', 'Италия'],
        image: 'https://images.unsplash.com/photo-1515549823949-94fd3e9e6e91?w=400&h=200&fit=crop',
        isPublic: true,
        waypoints: [
            {
                city: 'Рим',
                description: 'Колизей и Римский форум',
                latitude: 41.8902,
                longitude: 12.4924,
                startDateTime: '2024-10-01T08:00',
                endDateTime: '2024-10-01T17:00',
                startDate: '2024-10-01',
                endDate: '2024-10-01',
                startTime: '08:00',
                endTime: '17:00',
            },
            {
                city: 'Ватикан',
                description: 'Сикстинская капелла',
                latitude: 41.9029,
                longitude: 12.4534,
                startDateTime: '2024-10-02T09:00',
                endDateTime: '2024-10-02T18:00',
                startDate: '2024-10-02',
                endDate: '2024-10-02',
                startTime: '09:00',
                endTime: '18:00',
            },
            {
                city: 'Рим',
                description: 'Испанская площадь и фонтан Треви',
                latitude: 41.9009,
                longitude: 12.483,
                startDateTime: '2024-10-03T10:00',
                endDateTime: '2024-10-06T19:00',
                startDate: '2024-10-03',
                endDate: '2024-10-06',
                startTime: '10:00',
                endTime: '19:00',
            },
        ],
    },
    {
        id: 6,
        title: 'Нью-Йоркский уикенд',
        country: 'США',
        duration: '4 дня',
        description: 'Манхэттен, Бруклин, Центральный парк и стейк на каждый завтрак.',
        tags: ['США', 'Город', 'Шопинг', 'Деловые'],
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=200&fit=crop',
        isPublic: true,
        waypoints: [
            {
                city: 'Нью-Йорк',
                description: 'Таймс-сквер',
                latitude: 40.758,
                longitude: -73.9855,
                startDateTime: '2024-11-01T08:00',
                endDateTime: '2024-11-01T20:00',
                startDate: '2024-11-01',
                endDate: '2024-11-01',
                startTime: '08:00',
                endTime: '20:00',
            },
            {
                city: 'Бруклин',
                description: 'Мост и набережная',
                latitude: 40.6501,
                longitude: -73.9496,
                startDateTime: '2024-11-02T09:00',
                endDateTime: '2024-11-02T19:00',
                startDate: '2024-11-02',
                endDate: '2024-11-02',
                startTime: '09:00',
                endTime: '19:00',
            },
            {
                city: 'Манхэттен',
                description: 'Финансовый центр',
                latitude: 40.7074,
                longitude: -74.0113,
                startDateTime: '2024-11-03T10:00',
                endDateTime: '2024-11-04T18:00',
                startDate: '2024-11-03',
                endDate: '2024-11-04',
                startTime: '10:00',
                endTime: '18:00',
            },
        ],
    },
    {
        id: 7,
        title: 'Камчатский вулкан',
        country: 'Россия',
        duration: '12 дней',
        description: 'Вулканы, гейзеры, медведи и рыбалка на Камчатке.',
        tags: ['Россия', 'Природа', 'Экстрим', 'Вулканы'],
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop',
        isPublic: true,
        waypoints: [
            {
                city: 'Петропавловск',
                description: 'Старт экспедиции',
                latitude: 53.0201,
                longitude: 158.6502,
                startDateTime: '2024-05-01T08:00',
                endDateTime: '2024-05-01T16:00',
                startDate: '2024-05-01',
                endDate: '2024-05-01',
                startTime: '08:00',
                endTime: '16:00',
            },
            {
                city: 'Долина гейзеров',
                description: 'Ходьба и наблюдение',
                latitude: 54.52,
                longitude: 160.06,
                startDateTime: '2024-05-02T09:00',
                endDateTime: '2024-05-02T18:00',
                startDate: '2024-05-02',
                endDate: '2024-05-02',
                startTime: '09:00',
                endTime: '18:00',
            },
            {
                city: 'Курильское озеро',
                description: 'Медведи и рыбалка',
                latitude: 54.0,
                longitude: 159.7,
                startDateTime: '2024-05-03T10:00',
                endDateTime: '2024-05-12T19:00',
                startDate: '2024-05-03',
                endDate: '2024-05-12',
                startTime: '10:00',
                endTime: '19:00',
            },
        ],
    },
    {
        id: 8,
        title: 'Барселонские каникулы',
        country: 'Испания',
        duration: '6 дней',
        description: 'Гауди, пляжи, тапас и ночной город.',
        tags: ['Европа', 'Город', 'Культура', 'Пляж'],
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=200&fit=crop',
        isPublic: true,
        waypoints: [
            {
                city: 'Барселона',
                description: 'Храм Святого Семейства',
                latitude: 41.4036,
                longitude: 2.1744,
                startDateTime: '2024-06-15T09:00',
                endDateTime: '2024-06-15T18:00',
                startDate: '2024-06-15',
                endDate: '2024-06-15',
                startTime: '09:00',
                endTime: '18:00',
            },
            {
                city: 'Барселона',
                description: 'Ла Рамбла и пляжи',
                latitude: 41.3851,
                longitude: 2.1734,
                startDateTime: '2024-06-16T08:00',
                endDateTime: '2024-06-20T20:00',
                startDate: '2024-06-16',
                endDate: '2024-06-20',
                startTime: '08:00',
                endTime: '20:00',
            },
        ],
    },
    {
        id: 9,
        title: 'Острова Таити',
        country: 'Французская Полинезия',
        duration: '9 дней',
        description: 'Экзотика, лагуны, дайвинг и солнечные ванны.',
        tags: ['Острова', 'Природа', 'Экзотика'],
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=200&fit=crop',
        isPublic: true,
        waypoints: [
            {
                city: 'Папеэте',
                description: 'Столица с рынками и кафе',
                latitude: -17.5367,
                longitude: -149.5677,
                startDateTime: '2024-07-10T08:00',
                endDateTime: '2024-07-10T16:00',
                startDate: '2024-07-10',
                endDate: '2024-07-10',
                startTime: '08:00',
                endTime: '16:00',
            },
            {
                city: 'Бора-Бора',
                description: 'Лагуна и дома на воде',
                latitude: -16.5004,
                longitude: -151.7417,
                startDateTime: '2024-07-11T09:00',
                endDateTime: '2024-07-11T17:00',
                startDate: '2024-07-11',
                endDate: '2024-07-11',
                startTime: '09:00',
                endTime: '17:00',
            },
            {
                city: 'Таити',
                description: 'Тропические леса и водопады',
                latitude: -17.5506,
                longitude: -149.2667,
                startDateTime: '2024-07-12T10:00',
                endDateTime: '2024-07-18T18:00',
                startDate: '2024-07-12',
                endDate: '2024-07-18',
                startTime: '10:00',
                endTime: '18:00',
            },
        ],
    },
    {
        id: 10,
        title: 'Маршрут по Южной Африке',
        country: 'ЮАР',
        duration: '14 дней',
        description: 'Сафари, Кейптаун, винные регионы и природа.',
        tags: ['Африка', 'Приключения', 'Природа', 'Культура'],
        image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=400&h=200&fit=crop',
        isPublic: true,
        waypoints: [
            {
                city: 'Кейптаун',
                description: 'Гора Столовой и пляжи',
                latitude: -33.9249,
                longitude: 18.4241,
                startDateTime: '2024-12-01T08:00',
                endDateTime: '2024-12-01T17:00',
                startDate: '2024-12-01',
                endDate: '2024-12-01',
                startTime: '08:00',
                endTime: '17:00',
            },
            {
                city: 'Крюгер Парк',
                description: 'Большое сафари',
                latitude: -23.9654,
                longitude: 31.1954,
                startDateTime: '2024-12-02T06:00',
                endDateTime: '2024-12-02T18:00',
                startDate: '2024-12-02',
                endDate: '2024-12-02',
                startTime: '06:00',
                endTime: '18:00',
            },
            {
                city: 'Стелленбош',
                description: 'Винные туры',
                latitude: -33.9324,
                longitude: 18.8606,
                startDateTime: '2024-12-03T09:00',
                endDateTime: '2024-12-14T17:00',
                startDate: '2024-12-03',
                endDate: '2024-12-14',
                startTime: '09:00',
                endTime: '17:00',
            },
        ],
    },
];

// ===== Работа с моками =====

const getMockPublicTrips = () => {
    return MOCK_TRIPS.filter((trip) => trip.isPublic);
};

const searchMockTrips = (filters) => {
    return getMockPublicTrips().filter((trip) => {
        const matchesTitle =
            !filters.title || trip.title.toLowerCase().includes(filters.title.toLowerCase());
        const matchesCountry =
            !filters.countries ||
            filters.countries.length === 0 ||
            filters.countries.some((c) => trip.country.toLowerCase().includes(c.toLowerCase()));

        const matchesCities =
            !filters.cities ||
            filters.cities.length === 0 ||
            filters.cities.some((city) =>
                trip.waypoints.some((wp) => wp.city.toLowerCase().includes(city.toLowerCase()))
            );

        const parseDuration = (str) => parseInt(str, 10) || 0;
        const tripDuration = parseDuration(trip.duration);
        const matchesDurationFrom = !filters.durationFrom || tripDuration >= filters.durationFrom;
        const matchesDurationTo = !filters.durationTo || tripDuration <= filters.durationTo;

        return (
            matchesTitle &&
            matchesCountry &&
            matchesCities &&
            matchesDurationFrom &&
            matchesDurationTo
        );
    });
};

// ===== Работа с localStorage для "Мои маршруты" =====

const STORAGE_KEYS = {
    MYTRIPS: 'tripBuilder_myTrips',
    FAVORITES: 'tripBuilder_favoriteTripIds',
    TASKS: 'tasks_todo_list',
    TRASH: 'tasks_trash',
};

const safeParseJSON = (value, fallback) => {
    try {
        return value ? JSON.parse(value) : fallback;
    } catch (e) {
        storageLog('JSON parse error', value);
        return fallback;
    }
};

const getMyTripsFromStorage = () => {
    const raw = window.localStorage.getItem(STORAGE_KEYS.MYTRIPS);
    const parsed = safeParseJSON(raw, []);
    storageLog('getMyTripsFromStorage', { count: parsed.length });
    return parsed;
};

const saveMyTripsToStorage = (trips) => {
    window.localStorage.setItem(STORAGE_KEYS.MYTRIPS, JSON.stringify(trips));
    storageLog('saveMyTripsToStorage', { count: trips.length });
};

const addTripToMyTrips = (sourceTripId) => {
    const source = MOCK_TRIPS.find((t) => t.id === sourceTripId);
    if (!source) {
        storageLog('addTripToMyTrips source not found', sourceTripId);
        return null;
    }

    const myTrips = getMyTripsFromStorage();
    const maxId = myTrips.reduce((max, t) => Math.max(max, t.id), 1000) + 1000;

    const copy = {
        ...source,
        id: maxId + 1,
        isMyTrip: true,
        isPublic: false,
        waypoints: source.waypoints.map((wp) => normalizeWaypoint(wp)),
    };

    const updated = [...myTrips, copy];
    saveMyTripsToStorage(updated);
    storageLog('addTripToMyTrips created copy', {
        sourceId: sourceTripId,
        newId: copy.id,
    });

    return copy;
};

const removeMyTripById = (id) => {
    const trips = getMyTripsFromStorage();
    const updated = trips.filter((t) => t.id !== id);
    saveMyTripsToStorage(updated);
    storageLog('removeMyTripById', { id, count: updated.length });
    return updated;
};

const toggleMyTripPublic = (id) => {
    const trips = getMyTripsFromStorage();
    const updated = trips.map((t) => (t.id === id ? { ...t, isPublic: !t.isPublic } : t));
    saveMyTripsToStorage(updated);
    const target = updated.find((t) => t.id === id);
    storageLog('toggleMyTripPublic', {
        id,
        isPublic: target ? target.isPublic : undefined,
    });
    return target;
};

// ===== Работа с избранным =====

const getFavoriteIdsFromStorage = () => {
    const raw = window.localStorage.getItem(STORAGE_KEYS.FAVORITES);
    const parsed = safeParseJSON(raw, []);
    storageLog('getFavoriteIdsFromStorage', { ids: parsed });
    return parsed;
};

const saveFavoriteIdsToStorage = (ids) => {
    window.localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(ids));
    storageLog('saveFavoriteIdsToStorage', { ids });
};

const toggleFavoriteId = (tripId) => {
    const current = getFavoriteIdsFromStorage();
    const exists = current.includes(tripId);
    const next = exists ? current.filter((id) => id !== tripId) : [...current, tripId];
    saveFavoriteIdsToStorage(next);
    storageLog('toggleFavoriteId', { tripId, isFavorite: !exists });
    return !exists;
};

const getFavoriteTrips = () => {
    const ids = getFavoriteIdsFromStorage();
    const trips = getMockPublicTrips()
        .filter((t) => ids.includes(t.id))
        .map((t) => ({
            ...t,
            waypoints: t.waypoints.map((wp) => normalizeWaypoint(wp)),
        }));
    storageLog('getFavoriteTrips', { count: trips.length });
    return trips;
};

const mapWithFavorites = (trips) => {
    const favoriteIds = new Set(getFavoriteIdsFromStorage());
    return trips.map((t) => ({
        ...t,
        liked: favoriteIds.has(t.id),
        waypoints: t.waypoints.map((wp) => normalizeWaypoint(wp)),
    }));
};

// ===== ЛОКАЛЬНОЕ ХРАНИЛИЩЕ ДЛЯ ЗАДАЧ =====

const getTasksFromStorage = () => {
    try {
        const tasks = localStorage.getItem(STORAGE_KEYS.TASKS);
        return tasks ? JSON.parse(tasks) : { before: [], during: [], after: [] };
    } catch (error) {
        console.error('[STORAGE] Error getting tasks:', error);
        return { before: [], during: [], after: [] };
    }
};

const saveTasksToStorage = (tasks) => {
    try {
        localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
        storageLog('saveTasksToStorage', {
            before: tasks.before?.length || 0,
            during: tasks.during?.length || 0,
            after: tasks.after?.length || 0,
        });
    } catch (error) {
        console.error('[STORAGE] Error saving tasks:', error);
    }
};

const getTrashFromStorage = () => {
    try {
        const trash = localStorage.getItem(STORAGE_KEYS.TRASH);
        return trash ? JSON.parse(trash) : [];
    } catch (error) {
        console.error('[STORAGE] Error getting trash:', error);
        return [];
    }
};

const saveTrashToStorage = (trash) => {
    try {
        localStorage.setItem(STORAGE_KEYS.TRASH, JSON.stringify(trash));
        storageLog('saveTrashToStorage', { count: trash.length });
    } catch (error) {
        console.error('[STORAGE] Error saving trash:', error);
    }
};

const addTaskToStorage = (column, task) => {
    const tasks = getTasksFromStorage();
    if (tasks[column]) {
        tasks[column].push(task);
        saveTasksToStorage(tasks);
        storageLog('addTaskToStorage', { column, taskId: task.id });
    }
};

const deleteTaskFromStorage = (taskId, column) => {
    const tasks = getTasksFromStorage();
    if (tasks[column]) {
        tasks[column] = tasks[column].filter((t) => t.id !== taskId);
        saveTasksToStorage(tasks);
        storageLog('deleteTaskFromStorage', { taskId, column });
    }
};

const restoreTaskFromTrash = (taskId) => {
    const trash = getTrashFromStorage();
    const task = trash.find((t) => t.id === taskId);
    if (task) {
        trash.splice(trash.indexOf(task), 1);
        saveTrashToStorage(trash);
        storageLog('restoreTaskFromTrash', { taskId });
        return task;
    }
    return null;
};

const addTaskToTrash = (task, column) => {
    const trash = getTrashFromStorage();
    trash.push({ ...task, column, deletedAt: new Date().toISOString() });
    saveTrashToStorage(trash);
    storageLog('addTaskToTrash', { taskId: task.id });
};

const clearTrash = () => {
    saveTrashToStorage([]);
    storageLog('clearTrash', {});
};

// ===== Главный объект обработчиков =====

export const handlers = {
    onSearch: (query) => {
        logAction('onSearch', { query });
    },

    onFilterCountry: (country) => {
        logAction('onFilterCountry', { country });
    },

    onFilterCity: (city) => {
        logAction('onFilterCity', { city });
    },

    onFilterDuration: (duration) => {
        logAction('onFilterDuration', { duration });
    },

    searchTrips: async (filters) => {
        logAction('searchTrips', { filters });
        await delay(500);
        const result = searchMockTrips(filters);
        const withFlags = mapWithFavorites(result);
        storageLog('searchTrips', { result, count: withFlags.length });
        return withFlags;
    },

    getAllPublicTrips: async () => {
        logAction('getAllPublicTrips - mock');
        await delay(300);
        const result = getMockPublicTrips();
        const withFlags = mapWithFavorites(result);
        storageLog('getAllPublicTrips', { result, count: withFlags.length });
        return withFlags;
    },

    onLike: (id) => {
        logAction('onLike - favorites only', { id });
        const isFavorite = toggleFavoriteId(id);
        return isFavorite;
    },

    onAddToMyTrips: (id) => {
        logAction('onAddToMyTrips', { id });
        const copy = addTripToMyTrips(id);
        return copy;
    },

    onToggleMyTripPublic: (id) => {
        logAction('onToggleMyTripPublic', { id });
        const updated = toggleMyTripPublic(id);
        return updated;
    },

    onDeleteMyTrip: (id) => {
        logAction('onDeleteMyTrip', { id });
        const updatedList = removeMyTripById(id);
        return updatedList;
    },

    onDetails: (id) => {
        logAction('onDetails', id);
    },

    onEdit: (id) => {
        logAction('onEdit', { id });
    },

    onEditRoute: (id) => {
        logAction('onEditRoute', id);
    },

    onTogglePublic: (id, isPublic) => {
        logAction('onTogglePublic', { id, isPublic });
    },

    getMyTrips: () => {
        const trips = getMyTripsFromStorage().map((t) => ({
            ...t,
            waypoints: t.waypoints.map((wp) => normalizeWaypoint(wp)),
        }));
        storageLog('getMyTrips handler', { count: trips.length });
        return trips;
    },

    removeMyTrip: (id) => {
        removeMyTripById(id);
    },

    getFavoriteTrips: () => {
        const trips = getFavoriteTrips();
        storageLog('getFavoriteTrips handler', { count: trips.length });
        return trips;
    },

    onAddTask: (column) => {
        logAction('onAddTask', { column });
    },

    onDeleteTask: (id, column) => {
        logAction('onDeleteTask', { id, column });
        deleteTaskFromStorage(id, column);
    },

    onRestoreTask: (id) => {
        logAction('onRestoreTask', { id });
        restoreTaskFromTrash(id);
    },

    onClearTrash: () => {
        logAction('onClearTrash');
        clearTrash();
    },

    onChangePriority: (id, level) => {
        logAction('onChangePriority', { id, level });
    },

    onToggleTaskComplete: (id, completed) => {
        logAction('onToggleTaskComplete', { id, completed });
    },

    // ===== НОВЫЕ ФУНКЦИИ ДЛЯ localStorage ЗАДАЧ =====
    getTasksFromStorage,
    saveTasksToStorage,
    getTrashFromStorage,
    saveTrashToStorage,
    addTaskToStorage,
    deleteTaskFromStorage,
    restoreTaskFromTrash,
    addTaskToTrash,
    clearTrash,

    onSelectTrip: (tripId) => {
        logAction('onSelectTrip', { tripId });
    },

    onCreateRoute: (data) => {
        logAction('onCreateRoute', { data });
    },

    onAddWaypoint: (routeId) => {
        logAction('onAddWaypoint', { routeId });
    },

    onRemoveWaypoint: (routeId, waypointId) => {
        logAction('onRemoveWaypoint', { routeId, waypointId });
    },

    onUpdateWaypoint: (waypointId, data) => {
        logAction('onUpdateWaypoint', { waypointId, data });
    },

    onReorderWaypoints: (routeId, order) => {
        logAction('onReorderWaypoints', { routeId, order });
    },

    onChangePassword: (currentPwd, newPwd) => {
        logAction('onChangePassword', { currentPwd });
    },

    onChangeProfileData: (data) => {
        logAction('onChangeProfileData', { data });
    },

    onToggle2FA: (enabled) => {
        logAction('onToggle2FA', { enabled });
    },

    onAddBackupEmail: (email) => {
        logAction('onAddBackupEmail', { email });
    },

    onLinkSocialNetwork: (provider) => {
        logAction('onLinkSocialNetwork', { provider });
    },

    onChangeLanguage: (language) => {
        logAction('onChangeLanguage', { language });
    },

    onToggleNotifications: (enabled) => {
        logAction('onToggleNotifications', { enabled });
    },

    onChangeTimezone: (timezone) => {
        logAction('onChangeTimezone', { timezone });
    },

    onReportError: (description) => {
        logAction('onReportError', { description });
    },

    onGoHome: () => {
        logAction('onGoHome');
    },

    onGoMyTrips: () => {
        logAction('onGoMyTrips');
    },
};

export default handlers;
