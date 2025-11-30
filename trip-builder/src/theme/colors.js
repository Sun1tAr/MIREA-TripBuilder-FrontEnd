// src/theme/colors.js
export const theme = {
  bg: {
    main: '#F0F4F8',      // Светло-серый с голубоватым (Утренний туман)
    paper: '#FFFFFF',     // Чистый белый (Карточки)
    sidebar: '#FFFFFF',   // Белый
    footer: '#1A202C',    // Темно-синий (Ночное небо)
    construct: '#EBF4FF', // Очень светлый серо-голубой
    taskBg: '#FAFBFC',    // Белый с легкой текстурой
  },
  text: {
    primary: '#2D3748',   // Темно-серый
    secondary: '#718096', // Средний серый
    light: '#E2E8F0',     // Светло-серый (для футера)
    accent: '#FFFFFF',    // Белый текст на кнопках
  },
  accent: {
    primary: '#3182CE',   // Спокойный синий (Основной)
    secondary: '#ED8936', // Оранжевый (Акцентный/Создать)
    teal: '#38B2AC',      // Бирюзовый (Теги, Ссылки)
    error: '#E53E3E',     // Мягкий красный
    success: '#48BB78',   // Зеленый
    warning: '#ECC94B',   // Теплый желтый
    info: '#90CDF4',      // Серо-голубой
  },
  status: {
    planned: '#A0AEC0',    // Серый - планируется
    active: '#48BB78',     // Зеленый - активное
    completed: '#9F7AEA',  // Фиолетовый - завершено
  },
  priority: {
    high: '#FC8181',       // Мягкий красный
    medium: '#F6AD55',     // Теплый желтый
    low: '#90CDF4',        // Серо-голубой
  },
  ui: {
    border: '#E2E8F0',    // Светло-серые линии
    activeNav: '#38B2AC', // Бирюзовая полоса
    navBorder: '#3182CE', // Синяя граница справа сайдбара
  }
};

export const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px rgba(0, 0, 0, 0.05)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  hover: '0 8px 12px rgba(0, 0, 0, 0.08)',
};

export const transitions = {
  fast: '0.15s ease',
  normal: '0.3s ease',
  slow: '0.5s ease',
};