import React, { useState, useEffect } from 'react';
import './DarkModeToggle.css';

const DarkModeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
        setIsDarkMode(initialTheme === 'dark');
        document.documentElement.setAttribute('data-theme', initialTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = isDarkMode ? 'light' : 'dark';
        setIsDarkMode(!isDarkMode);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <div className="dark-mode-toggle-container">
            <div className="dark-mode-toggle" onClick={toggleTheme}>
                <div className={`toggle-slider ${isDarkMode ? 'dark' : 'light'}`}>
                    <span className="toggle-icon">
                        {isDarkMode ? '🌙' : '☀️'}
                    </span>
                </div>
                <span className="toggle-label">
                    {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                </span>
            </div>

            <div className="dark-mode-info">
                <p>
                    {isDarkMode
                        ? '🌙 Dark mode activated! Save battery and reduce eye strain.'
                        : '☀️ Light mode for bright environments and clear visibility.'
                    }
                </p>
            </div>
        </div>
    );
};

export default DarkModeToggle;
