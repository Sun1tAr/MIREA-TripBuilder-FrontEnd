// src/pages/Profile.jsx
import React, { useState } from 'react';
import './Profile.css';
import Input from '../components/Common/Input';
import { handlers } from '../utils/handlers';

// ✅ ВЫНЕСЕНО ЗА ПРЕДЕЛЫ И ОБЁРНУТО В React.memo
const Section = React.memo(({ title, children }) => (
    <div className="profile-section">
        <h3 className="profile-section-title">{title}</h3>
        {children}
    </div>
));

Section.displayName = 'Section';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('about');

    const [profile, setProfile] = useState({
        firstName: 'Иван',
        lastName: 'Иванов',
        email: 'ivan@example.com',
        phone: '+7 (999) 123-45-67',
        avatar: '👤',
    });

    const [settings, setSettings] = useState({
        language: 'ru',
        notifications: true,
        timezone: 'UTC+3',
    });

    const [security, setSecurity] = useState({
        twoFactor: false,
        backupEmail: '',
        socialNetworks: ['Google', 'GitHub'],
    });

    const [newPassword, setNewPassword] = useState({
        current: '',
        new: '',
        confirm: '',
    });

    const handleProfileChange = (field, value) => {
        setProfile((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSettingsChange = (field, value) => {
        setSettings((prev) => ({
            ...prev,
            [field]: value,
        }));
        if (field === 'language') {
            handlers.onChangeLanguage(value);
        }
    };

    const handlePasswordChange = () => {
        if (
            newPassword.new === newPassword.confirm &&
            newPassword.new.length >= 8
        ) {
            handlers.onChangePassword(newPassword.current, newPassword.new);
            alert('Пароль успешно изменен!');
            setNewPassword({ current: '', new: '', confirm: '' });
        } else {
            alert('Пароли не совпадают или слишком короткие');
        }
    };

    const handleToggleTwoFactor = () => {
        setSecurity((prev) => ({
            ...prev,
            twoFactor: !prev.twoFactor,
        }));
    };

    return (
        <div className="profile">
            {/* Заголовок */}
            <div className="profile-header">
                <div className="profile-avatar">{profile.avatar}</div>
                <div className="profile-info">
                    <h1 className="profile-name">
                        {profile.firstName} {profile.lastName}
                    </h1>
                    <p className="profile-email">{profile.email}</p>
                </div>
            </div>

            {/* Вкладки */}
            <div className="profile-tabs">
                <button
                    onClick={() => setActiveTab('about')}
                    className={`profile-tab ${activeTab === 'about' ? 'profile-tab--active' : ''}`}
                >
                    👤 Обо мне
                </button>
                <button
                    onClick={() => setActiveTab('settings')}
                    className={`profile-tab ${activeTab === 'settings' ? 'profile-tab--active' : ''}`}
                >
                    ⚙️ Настройки
                </button>
                <button
                    onClick={() => setActiveTab('security')}
                    className={`profile-tab ${activeTab === 'security' ? 'profile-tab--active' : ''}`}
                >
                    🔒 Безопасность
                </button>
            </div>

            {/* Содержимое вкладок */}
            <div className="profile-content">
                {/* Вкладка: Обо мне */}
                {activeTab === 'about' && (
                    <div className="profile-tab-content">
                        <Section title="Личная информация">
                            <div className="profile-form-grid">
                                <Input
                                    label="Имя"
                                    value={profile.firstName}
                                    onChange={(e) =>
                                        handleProfileChange('firstName', e.target.value)
                                    }
                                    placeholder="Ваше имя"
                                    fullWidth
                                />
                                <Input
                                    label="Фамилия"
                                    value={profile.lastName}
                                    onChange={(e) =>
                                        handleProfileChange('lastName', e.target.value)
                                    }
                                    placeholder="Ваша фамилия"
                                    fullWidth
                                />
                            </div>
                            <div className="profile-form-grid">
                                <Input
                                    label="Email"
                                    type="email"
                                    value={profile.email}
                                    onChange={(e) =>
                                        handleProfileChange('email', e.target.value)
                                    }
                                    placeholder="email@example.com"
                                    fullWidth
                                />
                                <Input
                                    label="Телефон"
                                    type="tel"
                                    value={profile.phone}
                                    onChange={(e) =>
                                        handleProfileChange('phone', e.target.value)
                                    }
                                    placeholder="+7 (999) 123-45-67"
                                    fullWidth
                                />
                            </div>
                        </Section>

                        <Section title="Фото профиля">
                            <div className="profile-avatar-upload">
                                <input type="file" accept="image/*" className="profile-file-input" />
                                <p className="profile-avatar-hint">
                                    Загрузите изображение размером 200x200 пикселей
                                </p>
                            </div>
                        </Section>
                    </div>
                )}

                {/* Вкладка: Настройки */}
                {activeTab === 'settings' && (
                    <div className="profile-tab-content">
                        <Section title="Язык и локализация">
                            <div className="profile-form-row">
                                <label className="profile-label">Язык интерфейса</label>
                                <select
                                    value={settings.language}
                                    onChange={(e) =>
                                        handleSettingsChange('language', e.target.value)
                                    }
                                    className="profile-select"
                                >
                                    <option value="ru">🇷🇺 Русский</option>
                                    <option value="en">🇬🇧 Английский</option>
                                    <option value="de">🇩🇪 Немецкий</option>
                                    <option value="fr">🇫🇷 Французский</option>
                                </select>
                            </div>
                            <div className="profile-form-row">
                                <label className="profile-label">Часовой пояс</label>
                                <select
                                    value={settings.timezone}
                                    onChange={(e) =>
                                        handleSettingsChange('timezone', e.target.value)
                                    }
                                    className="profile-select"
                                >
                                    <option value="UTC+3">UTC+3 (Москва)</option>
                                    <option value="UTC+0">UTC+0 (Лондон)</option>
                                    <option value="UTC+1">UTC+1 (Берлин)</option>
                                    <option value="UTC-5">UTC-5 (Нью-Йорк)</option>
                                </select>
                            </div>
                        </Section>

                        <Section title="Уведомления">
                            <div className="profile-checkbox">
                                <input
                                    type="checkbox"
                                    id="notifications"
                                    checked={settings.notifications}
                                    onChange={(e) =>
                                        handleSettingsChange('notifications', e.target.checked)
                                    }
                                />
                                <label htmlFor="notifications" className="profile-checkbox-label">
                                    ✉️ Получать уведомления по электронной почте
                                </label>
                            </div>
                        </Section>
                    </div>
                )}

                {/* Вкладка: Безопасность */}
                {activeTab === 'security' && (
                    <div className="profile-tab-content">
                        <Section title="Смена пароля">
                            <Input
                                label="Текущий пароль"
                                type="password"
                                value={newPassword.current}
                                onChange={(e) =>
                                    setNewPassword((prev) => ({
                                        ...prev,
                                        current: e.target.value,
                                    }))
                                }
                                placeholder="••••••••"
                                fullWidth
                            />
                            <Input
                                label="Новый пароль"
                                type="password"
                                value={newPassword.new}
                                onChange={(e) =>
                                    setNewPassword((prev) => ({
                                        ...prev,
                                        new: e.target.value,
                                    }))
                                }
                                placeholder="Минимум 8 символов"
                                fullWidth
                            />
                            <Input
                                label="Подтвердите пароль"
                                type="password"
                                value={newPassword.confirm}
                                onChange={(e) =>
                                    setNewPassword((prev) => ({
                                        ...prev,
                                        confirm: e.target.value,
                                    }))
                                }
                                placeholder="Повторите пароль"
                                fullWidth
                            />
                            <button onClick={handlePasswordChange} className="profile-btn-primary">
                                ✅ Изменить пароль
                            </button>
                        </Section>

                        <Section title="Двухфакторная аутентификация">
                            <div className="profile-checkbox">
                                <input
                                    type="checkbox"
                                    id="twoFactor"
                                    checked={security.twoFactor}
                                    onChange={handleToggleTwoFactor}
                                />
                                <label htmlFor="twoFactor" className="profile-checkbox-label">
                                    🔐 Включить двухфакторную аутентификацию
                                </label>
                            </div>
                        </Section>

                        <Section title="Резервная почта">
                            <Input
                                label="Резервный email"
                                type="email"
                                value={security.backupEmail}
                                onChange={(e) =>
                                    setSecurity((prev) => ({
                                        ...prev,
                                        backupEmail: e.target.value,
                                    }))
                                }
                                placeholder="backup@example.com"
                                fullWidth
                            />
                        </Section>

                        <Section title="Социальные сети">
                            <div className="profile-social-networks">
                                {security.socialNetworks.map((network) => (
                                    <span key={network} className="profile-social-badge">
                    {network}
                  </span>
                                ))}
                            </div>
                        </Section>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
