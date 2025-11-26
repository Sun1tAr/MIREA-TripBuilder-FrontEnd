# Travel Planner Prototype — Архитектура и инструкция

## 📋 Описание

Это HTML/CSS прототип веб-приложения "Планировщик путешествий" с полной адаптивностью (mobile/tablet/desktop) и готовой структурой для последующего переноса в React.

---

## 📁 Структура проекта

```
travel-planner-prototype/
│
├── index.html                    # HOME PAGE - Лента идей
├── route-builder.html            # Конструктор маршрута
├── checklist.html                # Список дел перед поездкой
├── saved-trips.html              # Сохранённые путешествия
├── trip-details.html             # Детали путешествия + совместный доступ
├── 404.html                      # Страница ошибки
│
├── css/
│   ├── variables.css             # CSS переменные (цвета, типография, размеры)
│   ├── base.css                  # Base стили (reset, общие стили)
│   ├── components.css            # Переиспользуемые компоненты
│   ├── layout.css                # Header, Sidebar, Footer, Grid
│   └── responsive.css            # Медиа-запросы (3 breakpoints)
│
├── assets/
│   ├── icons/
│   │   ├── home.svg
│   │   ├── route.svg
│   │   ├── checklist.svg
│   │   ├── trips.svg
│   │   ├── menu.svg
│   │   ├── search.svg
│   │   ├── bell.svg
│   │   ├── user.svg
│   │   └── arrow-right.svg
│   └── images/
│       ├── placeholder-1.jpg
│       ├── placeholder-2.jpg
│       └── user-avatar.jpg
│
├── js/
│   └── navigation.js             # Простая навигация между страницами
│
└── README.md                     # Инструкция по развёртыванию
```

---

## 🎯 Breakpoints (3 класса размеров)

```
Mobile:   0px - 640px     (смартфоны)
Tablet:   641px - 1024px  (планшеты)
Desktop:  1025px+         (ноутбуки и мониторы)
```

### Адаптивные изменения по размеру:

| Элемент | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| **Sidebar** | Скрытая (drawer через бургер) | Видима, узкая | Видима, полная |
| **Header** | Компактный | Нормальный | Нормальный |
| **Grid карточек** | 1 колонна | 2 колонны | 3 колонны |
| **Контейнер** | Полная ширина | Полная ширина | max-width: 1200px |
| **Отступы** | 12px | 16px | 20px |

---

## 🎨 Цветовая схема

### CSS переменные в `variables.css`:

```css
/* Primary Colors */
--color-primary: #2196F3;        /* Синий */
--color-primary-dark: #1976D2;
--color-primary-light: #BBDEFB;

/* Accent */
--color-accent: #FF6F00;         /* Оранжевый */
--color-accent-light: #FFB74D;

/* Neutral */
--color-bg-primary: #FAFAFA;     /* Фон */
--color-bg-secondary: #FFFFFF;   /* Карточки */
--color-text-primary: #212121;   /* Текст */
--color-text-secondary: #757575; /* Субтекст */
--color-border: #E0E0E0;         /* Границы */

/* Status */
--color-success: #4CAF50;
--color-warning: #FFC107;
--color-error: #F44336;

/* Gradients */
--gradient-primary: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
```

---

## 📐 CSS Структура

### 1. **variables.css**
Хранит все переменные (цвета, шрифты, размеры, тени, переходы).

```css
:root {
  /* Color Palette */
  /* Typography */
  /* Spacing */
  /* Border Radius */
  /* Shadows */
  /* Transitions */
}
```

### 2. **base.css**
- CSS Reset (Normalize)
- Базовые стили для элементов (body, h1-h6, p, a, button, input)
- Типография

```css
* { box-sizing: border-box; }
html { font-size: 16px; }
body { font-family: var(--font-family-base); }
```

### 3. **components.css**
Переиспользуемые компоненты:
- `.btn` (с вариантами: `--primary`, `--secondary`, `--outline`)
- `.card` (с `.card-header`, `.card-body`, `.card-footer`)
- `.input-group` (поле ввода с меткой)
- `.badge` (теги, статусы)
- `.modal` (модальные окна)
- `.drawer` (боковой ящик для мобайла)

```css
.btn { /* базовые стили */ }
.btn--primary { background: var(--color-primary); }
.card { background: var(--color-bg-secondary); border-radius: var(--radius-md); }
```

### 4. **layout.css**
Структурные компоненты:
- `.header` (верхняя панель)
- `.sidebar` (боковая панель)
- `.main-content` (основной контент)
- `.footer` (подвал)
- `.grid` (сетка для карточек)

```css
.header { position: fixed; top: 0; width: 100%; }
.sidebar { width: 280px; position: fixed; }
.main-content { margin-left: 280px; margin-top: 70px; }
```

### 5. **responsive.css**
Медиа-запросы для каждого breakpoint:

```css
/* Tablet: 641px - 1024px */
@media (min-width: 641px) and (max-width: 1024px) {
  .sidebar { width: 200px; }
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Mobile: до 640px */
@media (max-width: 640px) {
  .sidebar { display: none; }
  .sidebar.active { position: fixed; z-index: 1000; }
  .grid { grid-template-columns: 1fr; }
}
```

---

## 📄 HTML страницы (общая структура)

### Каждая страница содержит:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Travel Planner</title>
    
    <!-- CSS -->
    <link rel="stylesheet" href="css/variables.css">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/components.css">
    <link rel="stylesheet" href="css/layout.css">
    <link rel="stylesheet" href="css/responsive.css">
</head>
<body>
    <!-- Header (одинаковый на всех страницах) -->
    <header class="header">
        <!-- Logo, Search, User menu -->
    </header>

    <!-- Sidebar (одинаковый на всех страницах) -->
    <aside class="sidebar">
        <!-- Navigation -->
    </aside>

    <!-- Main Content (уникален для каждой страницы) -->
    <main class="main-content">
        <!-- Page-specific content -->
    </main>

    <!-- Footer (одинаковый на всех страницах) -->
    <footer class="footer">
        <!-- Footer content -->
    </footer>

    <!-- JavaScript -->
    <script src="js/navigation.js"></script>
</body>
</html>
```

---

## 🔄 Компоненты (готовые для React)

### Переиспользуемые HTML структуры (легко конвертировать в JSX):

#### 1. **Button** (`.btn`)
```html
<button class="btn btn--primary">Сохранить</button>
<button class="btn btn--secondary">Отменить</button>
<button class="btn btn--outline">Удалить</button>
```

#### 2. **Card** (`.card`)
```html
<div class="card">
    <div class="card-header">Заголовок</div>
    <div class="card-body">Содержимое</div>
    <div class="card-footer">Подвал</div>
</div>
```

#### 3. **Input Group** (`.input-group`)
```html
<div class="input-group">
    <label for="name">Имя</label>
    <input type="text" id="name" class="input">
</div>
```

#### 4. **Badge** (`.badge`)
```html
<span class="badge badge--success">Активно</span>
<span class="badge badge--warning">В процессе</span>
```

#### 5. **Modal** (`.modal`)
```html
<div class="modal modal--active">
    <div class="modal-content">
        <div class="modal-header">Заголовок</div>
        <div class="modal-body">Содержимое</div>
        <div class="modal-footer">
            <button class="btn btn--primary">OK</button>
        </div>
    </div>
</div>
```

#### 6. **Grid** (`.grid`)
```html
<div class="grid">
    <div class="card">Item 1</div>
    <div class="card">Item 2</div>
    <div class="card">Item 3</div>
</div>
```

---

## 📝 Страницы в деталях

### 1. **index.html** (HOME PAGE - Лента идей)

**Функционал:**
- Фильтры (категория, рейтинг, сортировка)
- Grid карточек идей
- Каждая карточка: картинка, название, описание, автор, лайки, комментарии

**Макет:**
```
┌─────────────────────────────────────┐
│        HEADER                       │
├─────────┬─────────────────────────┤
│ SIDEBAR │   MAIN CONTENT          │
│         │                         │
│ HOME    │  FILTERS                │
│ ROUTE   │  ┌─────────────────┐    │
│ CHECK   │  │ IDEA CARD 1     │    │
│ TRIPS   │  │ [Image]         │    │
│ SHARE   │  │ Title           │    │
│         │  │ ❤️ 42 💬 8      │    │
│ USER    │  └─────────────────┘    │
│ CARD    │                         │
├─────────┴─────────────────────────┤
│        FOOTER                       │
└─────────────────────────────────────┘
```

### 2. **route-builder.html** (Конструктор маршрута)

**Функционал:**
- Форма добавления точек маршрута
- Список точек (таблица)
- Превью маршрута
- Кнопки: добавить, удалить, оптимизировать, сохранить

**Макет:**
```
┌─────────────────────────────────────┐
│        HEADER                       │
├─────────┬─────────────────────────┤
│ SIDEBAR │   MAIN CONTENT          │
│         │                         │
│ HOME    │  FORM (LEFT SIDE)       │
│ ROUTE   │  - Название маршрута    │
│ CHECK   │  - Точка #1 (координаты)│
│ TRIPS   │  - Точка #2             │
│         │  - [+ Добавить точку]   │
│ USER    │                         │
│ CARD    │  [PREVIEW MAP] (RIGHT)  │
│         │                         │
├─────────┴─────────────────────────┤
│        FOOTER                       │
└─────────────────────────────────────┘
```

### 3. **checklist.html** (Список дел)

**Функционал:**
- Несколько списков (перед поездкой, в поездке, после)
- Добавление/удаление дел
- Статусы (выполнено/не выполнено)
- Приоритеты (цветные)

**Макет:**
```
┌─────────────────────────────────────┐
│        HEADER                       │
├─────────┬─────────────────────────┤
│ SIDEBAR │   MAIN CONTENT          │
│         │                         │
│ HOME    │  CHECKLIST 1            │
│ ROUTE   │  ☐ Купить билеты        │
│ CHECK   │  ✓ Получить визу        │
│ TRIPS   │  ☐ Забронировать отель  │
│         │  + [Добавить дело]      │
│ USER    │                         │
│ CARD    │  CHECKLIST 2            │
│         │  ☐ Снять деньги         │
│         │  ☐ Проверить паспорт    │
├─────────┴─────────────────────────┤
│        FOOTER                       │
└─────────────────────────────────────┘
```

### 4. **saved-trips.html** (Сохранённые путешествия)

**Функционал:**
- Каталог путешествий (grid карточек)
- Фильтры (дата, статус, поиск)
- Быстрые действия (детали, удалить, поделиться)

**Макет:**
```
┌─────────────────────────────────────┐
│        HEADER                       │
├─────────┬─────────────────────────┤
│ SIDEBAR │   MAIN CONTENT          │
│         │                         │
│ HOME    │  FILTERS                │
│ ROUTE   │  ┌──────────────────┐   │
│ CHECK   │  │ TRIP 1           │   │
│ TRIPS   │  │ Сицилия          │   │
│         │  │ 7-14 июня, 5 дн. │   │
│ USER    │  │ 4 участника      │   │
│ CARD    │  │ [ДЕТАЛИ]         │   │
│         │  └──────────────────┘   │
├─────────┴─────────────────────────┤
│        FOOTER                       │
└─────────────────────────────────────┘
```

### 5. **trip-details.html** (Детали путешествия)

**Функционал:**
- Основная информация (название, даты, описание)
- Табы (Маршрут, Чеклист, Участники, Медиа)
- Список участников с ролями
- Модаль "Пригласить участника" (email)
- Кнопка поделиться

**Макет:**
```
┌─────────────────────────────────────┐
│        HEADER                       │
├─────────┬─────────────────────────┤
│ SIDEBAR │   MAIN CONTENT          │
│         │                         │
│ HOME    │  TRIP HEADER            │
│ ROUTE   │  Название: Сицилия     │
│ CHECK   │  Даты: 7-14 июня       │
│ TRIPS   │  Описание...            │
│         │  [Поделиться]           │
│ USER    │                         │
│ CARD    │  TABS                   │
│         │  [Маршрут] [Чеклист]    │
│         │  [Участники] [Медиа]    │
│         │                         │
│         │  TAB CONTENT            │
├─────────┴─────────────────────────┤
│        FOOTER                       │
└─────────────────────────────────────┘
```

### 6. **404.html** (Ошибка)

**Функционал:**
- Сообщение об ошибке
- Кнопка "Вернуться на главную"

---

## 🛠️ Как собрать и просмотреть

### Вариант 1: Локальный сервер (рекомендуется для адаптива)

```bash
# Используя Python (встроен в большинство систем)
python -m http.server 8000

# или используя Node.js http-server
npx http-server

# или используя Live Server в VS Code
# Установи расширение "Live Server"
# Правый клик на index.html → "Open with Live Server"
```

Затем откройте `http://localhost:8000` в браузере.

### Вариант 2: Просто открыть файл

```bash
# На Windows
start index.html

# На macOS
open index.html

# На Linux
xdg-open index.html
```

⚠️ **Важно:** При просмотре через локальный сервер адаптивность будет корректнее.

---

## 🔀 Переход в React

После готовности HTML/CSS прототипа:

### 1. **Экспортировать компоненты**
```
HTML структуры → JSX компоненты
CSS классы → CSS Modules или Tailwind
```

### 2. **Структура React проекта**
```
src/
├── components/
│   ├── Header.jsx (из header.html)
│   ├── Sidebar.jsx (из sidebar.html)
│   ├── Card.jsx (из .card)
│   ├── Button.jsx (из .btn)
│   └── ...
├── pages/
│   ├── HomePage.jsx (из index.html)
│   ├── RouteBuilderPage.jsx (из route-builder.html)
│   └── ...
└── styles/
    ├── variables.css (переиспользуется)
    ├── base.css (переиспользуется)
    └── components.css (переиспользуется или конвертируется в CSS modules)
```

### 3. **Добавить интерактивность**
- Состояние (useState)
- Обработчики (onClick, onChange)
- Роутинг (React Router)
- API запросы (useEffect + Axios)

---

## ✅ Чек-лист перед разработкой React

- [ ] Все 5 страниц вёрстаны и выглядят хорошо
- [ ] Адаптивность работает на 3 breakpoints
- [ ] Все CSS классы именованы по BEM или похожей методологии
- [ ] Компоненты изолированы (каждый компонент в отдельном блоке)
- [ ] Mock-данные готовы (картинки, тексты)
- [ ] Навигация между страницами работает (через js/navigation.js)

---

## 📚 Полезные ресурсы

- **CSS Variables Guide:** https://developer.mozilla.org/en-US/docs/Web/CSS/--*
- **CSS Grid:** https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout
- **Responsive Design:** https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design
- **BEM Methodology:** http://getbem.com/

---

## 📞 Поддержка

При возникновении проблем:
1. Проверь консоль браузера (F12 → Console)
2. Убедись, что все CSS файлы подключены в HTML
3. Проверь пути к изображениям в `assets/images/`
4. Используй DevTools для отладки адаптивности (F12 → Device Emulation)

---

**Готово! Теперь переходи к созданию файлов по структуре выше. Удачи! 🚀**
