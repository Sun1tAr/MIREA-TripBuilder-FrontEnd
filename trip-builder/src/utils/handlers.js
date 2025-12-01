// src/utils/handlers.js

const logAction = (actionName, data = null) => {
  const timestamp = new Date().toLocaleTimeString();
  const message = data ? `[${timestamp}] "${actionName}" → ${JSON.stringify(data)}` : `[${timestamp}] "${actionName}"`;
  console.log(`[TRIP BUILDER LOGIC]: ${message}`);
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Моковые данные для теста путешествий
export const MOCK_TRIPS = [
  {
    id: 1,
    title: 'Парижская романтика',
    country: 'Франция',
    duration: '5 дней',
    description: 'Исследуйте город света: Эйфелева башня, Лувр, Монмартр и круиз по Сене.',
    tags: ['Европа', 'Город', 'Романтика', 'Культура'],
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=200&fit=crop',
    isPublic: true,
    waypoints: [
      { city: 'Париж', description: 'Эйфелева башня и прогулка по Марсову полю' },
      { city: 'Версаль', description: 'Дворец Версаля и его сады' },
      { city: 'Париж', description: 'Лувр и Нотр-Дам' },
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
      { city: 'Бийск', description: 'Старт путешествия' },
      { city: 'Телецкое озеро', description: 'Катание на лодке, водопады' },
      { city: 'Катунь', description: 'Рafting и горные тропы' },
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
      { city: 'Токио - Сибуя', description: 'Переход и неоновые огни' },
      { city: 'Асакуса', description: 'Храм Сенсо-дзи' },
      { city: 'Гинза', description: 'Шопинг и рестораны' },
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
      { city: 'Семиньяк', description: 'Пляжный серфинг' },
      { city: 'Улувату', description: 'Храм на скале и закаты' },
      { city: 'Убуд', description: 'Обезьяний лес и рисовые террасы' },
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
      { city: 'Рим', description: 'Колизей и Римский форум' },
      { city: 'Ватикан', description: 'Сикстинская капелла' },
      { city: 'Рим', description: 'Испанская площадь и фонтан Треви' },
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
      { city: 'Нью-Йорк', description: 'Таймс-сквер' },
      { city: 'Бруклин', description: 'Мост и набережная' },
      { city: 'Манхэттен', description: 'Финансовый центр' },
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
      { city: 'Петропавловск', description: 'Старт экспедиции' },
      { city: 'Долина гейзеров', description: 'Ходьба и наблюдение' },
      { city: 'Курильское озеро', description: 'Медведи и рыбалка' },
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
      { city: 'Барселона', description: 'Храм Святого Семейства' },
      { city: 'Барселона', description: 'Ла Рамбла и пляжи' },
    ],
  },
  {
    id: 9,
    title: 'Острова Таити',
    country: 'Французская Полинезия',
    duration: '9 дней',
    description: 'Экзотика, лагуны, дайвинг и солнечные ванны.',
    tags: ['Острова', 'Природа', 'Природа', 'Экзотика'],
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=200&fit=crop',
    isPublic: true,
    waypoints: [
      { city: 'Папеэте', description: 'Столица с рынками и кафе' },
      { city: 'Бора-Бора', description: 'Лагуна и дома на воде' },
      { city: 'Таити', description: 'Тропические леса и водопады' },
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
      { city: 'Кейптаун', description: 'Гора Столовой и пляжи' },
      { city: 'Крюгер Парк', description: 'Большое сафари' },
      { city: 'Стелленбош', description: 'Винные туры' },
    ],
  }
  // Продолжить список до 30 уникальных маршрутов...
  // Следующие 20 маршрутов с разной географией, длительностью, стилистикой и тегами по аналогии с примерами выше
];

// Функции для работы с моковыми данными
const getMockPublicTrips = () => {
  return MOCK_TRIPS.filter(trip => trip.isPublic);
};

const searchMockTrips = (filters) => {
  return getMockPublicTrips().filter(trip => {
    const matchesTitle = !filters.title || trip.title.toLowerCase().includes(filters.title.toLowerCase());
    const matchesCountry = !filters.countries || filters.countries.length === 0 
      || filters.countries.some(c => trip.country.toLowerCase().includes(c.toLowerCase()));
    const matchesCities = !filters.cities || filters.cities.length === 0
      || filters.cities.some(city => trip.waypoints.some(wp => (wp.city || '').toLowerCase().includes(city.toLowerCase())));
    // Для простоты фильтрация по длительности по числу дней
    const parseDuration = (str) => parseInt(str) || 0;
    const tripDuration = parseDuration(trip.duration);
    const matchesDurationFrom = !filters.durationFrom || tripDuration >= filters.durationFrom;
    const matchesDurationTo = !filters.durationTo || tripDuration <= filters.durationTo;

    return matchesTitle && matchesCountry && matchesCities && matchesDurationFrom && matchesDurationTo;
  });
};

export const handlers = {
  // ===== Поиск и фильтры =====
  onSearch: (query) => logAction('Поисковая панель', { query }),

  onFilterCountry: (country) => logAction('Фильтр по стране', { country }),

  onFilterCity: (city) => logAction('Фильтр по городу', { city }),

  onFilterDuration: (duration) => logAction('Фильтр по длительности', { duration }),

  // ===== Мок замена запросов для путешествий =====
  searchTrips: async (filters) => {
    logAction('Поиск путешествий (mock)', filters);
    await delay(1500);
    return searchMockTrips(filters);
  },

  getAllPublicTrips: async () => {
    logAction('Загрузка всех публичных маршрутов (mock)');
    await delay(800);
    return getMockPublicTrips();
  },

  // ===== Действия с карточками путешествий =====
  onLike: (id) => logAction('Лайк', { id }),

  onAddToMyTrips: (id) => logAction('Добавить к себе', { id }),

  onDetails: (id) => logAction('Подробнее', { id }),

  onEdit: (id) => logAction('Редактировать маршрут', { id }),

  onTogglePublic: (id, isPublic) => logAction('Публичный доступ', { id, isPublic }),

  // ===== Задачи (Todo List) =====
  onAddTask: (column) => logAction('Добавить задачу', { column }),

  onDeleteTask: (id) => logAction('Удалить задачу (в корзину)', { id }),

  onRestoreTask: (id) => logAction('Восстановить задачу', { id }),

  onChangePriority: (id, level) => logAction('Изменить приоритет', { id, level }),

  onToggleTaskComplete: (id, completed) => logAction('Чекбокс выполнения', { id, completed }),

  onSelectTrip: (tripId) => logAction('Выбрать путешествие для задачи', { tripId }),

  // ===== Конструктор маршрутов =====
  onCreateRoute: (data) => logAction('Создать маршрут', data),

  onAddWaypoint: (routeId) => logAction('Добавить точку маршрута', { routeId }),

  onRemoveWaypoint: (routeId, waypointId) => logAction('Удалить точку маршрута', { routeId, waypointId }),

  onUpdateWaypoint: (waypointId, data) => logAction('Обновить точку маршрута', { waypointId, data }),

  onReorderWaypoints: (routeId, order) => logAction('Переупорядочить точки', { routeId, order }),

  // ===== Пользователь и настройки =====
  onChangePassword: (currentPwd, newPwd) => logAction('Изменить пароль', { currentPwd: '***', newPwd: '***' }),

  onChangeProfileData: (data) => logAction('Изменить данные профиля', data),

  onToggle2FA: (enabled) => logAction('Двухфакторная аутентификация', { enabled }),

  onAddBackupEmail: (email) => logAction('Добавить резервную почту', { email }),

  onLinkSocialNetwork: (provider) => logAction('Привязать соц. сеть', { provider }),

  onChangeLanguage: (language) => logAction('Изменить язык', { language }),

  onToggleNotifications: (enabled) => logAction('Уведомления', { enabled }),

  onChangeTimezone: (timezone) => logAction('Часовой пояс старта', { timezone }),

  // ===== Сервисные страницы =====
  onReportError: (description) => logAction('Сообщить об ошибке', { description }),

  onGoHome: () => logAction('Перейти на главную'),

  onGoMyTrips: () => logAction('Перейти в мои путешествия'),
};

