// src/utils/handlers.js

const logAction = (actionName, data = null) => {
  const timestamp = new Date().toLocaleTimeString();
  const message = data ? `[${timestamp}] "${actionName}" → ${JSON.stringify(data)}` : `[${timestamp}] "${actionName}"`;
  console.log(`[TRIP BUILDER LOGIC]: ${message}`);
  
  // Опционально показываем alert для UI feedback
  // alert(`Обработано: ${actionName}`);
};

export const handlers = {
  // ===== Поиск и фильтры =====
  onSearch: (query) => logAction('Поисковая панель', { query }),
  onFilterCountry: (country) => logAction('Фильтр по стране', { country }),
  onFilterCity: (city) => logAction('Фильтр по городу', { city }),
  onFilterDuration: (duration) => logAction('Фильтр по длительности', { duration }),

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
  onReportError: (description) => logAction('Cообщить об ошибке', { description }),
  onGoHome: () => logAction('Перейти на главную'),
  onGoMyTrips: () => logAction('Перейти в мои путешествия'),
};