import React, { useState, useEffect, useCallback } from 'react';
import './StreakCounter.css';

const StreakCounter = () => {
    const [currentStreak, setCurrentStreak] = useState(0);
    const [longestStreak, setLongestStreak] = useState(0);
    const [lastVisitDate, setLastVisitDate] = useState(null);
    const [badges, setBadges] = useState([]);

    const updateBadges = useCallback(() => {
        const newBadges = [];

        // Streak-based badges
        if (currentStreak >= 1) newBadges.push({ emoji: '🌟', name: 'First Step', description: 'Started your journey!' });
        if (currentStreak >= 3) newBadges.push({ emoji: '🔥', name: 'On Fire', description: '3 days in a row!' });
        if (currentStreak >= 7) newBadges.push({ emoji: '⚡', name: 'Week Warrior', description: '7 days streak!' });
        if (currentStreak >= 14) newBadges.push({ emoji: '💪', name: 'Fortitude', description: '14 days strong!' });
        if (currentStreak >= 30) newBadges.push({ emoji: '👑', name: 'Study King', description: '30 days champion!' });
        if (currentStreak >= 50) newBadges.push({ emoji: '🎖️', name: 'Legend', description: '50 days legend!' });
        if (currentStreak >= 100) newBadges.push({ emoji: '🏆', name: 'Century Club', description: '100 days master!' });

        // Longest streak badges
        if (longestStreak >= 10) newBadges.push({ emoji: '🎯', name: 'Consistent', description: '10+ day best streak!' });
        if (longestStreak >= 25) newBadges.push({ emoji: '🚀', name: 'Dedicated', description: '25+ day best streak!' });
        if (longestStreak >= 50) newBadges.push({ emoji: '⭐', name: 'Unstoppable', description: '50+ day best streak!' });

        setBadges(newBadges);
    }, [currentStreak, longestStreak]);

    const updateStreak = useCallback((today) => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toDateString();

        let newStreak = currentStreak;

        if (lastVisitDate === yesterdayString) {
            // Consecutive day
            newStreak = currentStreak + 1;
        } else if (lastVisitDate !== today) {
            // Streak broken or first visit
            newStreak = 1;
        }

        setCurrentStreak(newStreak);
        setLongestStreak(Math.max(longestStreak, newStreak));
        setLastVisitDate(today);

        // Save to localStorage
        localStorage.setItem('studyStreak', newStreak.toString());
        localStorage.setItem('longestStreak', Math.max(longestStreak, newStreak).toString());
        localStorage.setItem('lastVisitDate', today);

        updateBadges();
    }, [currentStreak, lastVisitDate, longestStreak, updateBadges]);

    useEffect(() => {
        // Load streak data from localStorage
        const savedStreak = localStorage.getItem('studyStreak');
        const savedLongest = localStorage.getItem('longestStreak');
        const savedLastVisit = localStorage.getItem('lastVisitDate');

        if (savedStreak) setCurrentStreak(parseInt(savedStreak));
        if (savedLongest) setLongestStreak(parseInt(savedLongest));
        if (savedLastVisit) setLastVisitDate(savedLastVisit);

        // Check if user visited today
        const today = new Date().toDateString();
        const lastVisit = savedLastVisit;

        if (lastVisit !== today) {
            // First visit today
            updateStreak(today);
        }

        // Update badges based on streak
        updateBadges();
    }, [updateBadges, updateStreak]);

    const getStreakEmoji = (streak) => {
        if (streak === 0) return '😴';
        if (streak < 3) return '🌱';
        if (streak < 7) return '🔥';
        if (streak < 14) return '⚡';
        if (streak < 30) return '💪';
        if (streak < 50) return '👑';
        if (streak < 100) return '🎖️';
        return '🏆';
    };

    const shareStreak = () => {
        const shareText = `🔥 I'm on a ${currentStreak}-day study streak on OJAS JEE Classes! Join me in building study habits! ${window.location.origin}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="streak-counter">
            <div className="streak-header">
                <h2>🔥 Study Streak</h2>
                <p>Keep the momentum going!</p>
            </div>

            <div className="streak-stats">
                <div className="streak-main">
                    <div className="current-streak">
                        <span className="streak-emoji">{getStreakEmoji(currentStreak)}</span>
                        <div className="streak-info">
                            <h3>{currentStreak}</h3>
                            <p>Current Streak</p>
                        </div>
                    </div>
                    <div className="longest-streak">
                        <span className="streak-emoji">⭐</span>
                        <div className="streak-info">
                            <h3>{longestStreak}</h3>
                            <p>Best Streak</p>
                        </div>
                    </div>
                </div>

                <button className="share-streak-btn" onClick={shareStreak}>
                    📤 Share Streak
                </button>
            </div>

            <div className="badges-section">
                <h3>🏆 Your Badges</h3>
                <div className="badges-grid">
                    {badges.map((badge, index) => (
                        <div key={index} className="badge-card">
                            <span className="badge-emoji">{badge.emoji}</span>
                            <h4>{badge.name}</h4>
                            <p>{badge.description}</p>
                        </div>
                    ))}
                </div>
                {badges.length === 0 && (
                    <p className="no-badges">Start studying daily to earn your first badge! 🌟</p>
                )}
            </div>

            <div className="streak-motivation">
                <h3>💪 Keep Going!</h3>
                <p>
                    {currentStreak === 0 && "Every journey begins with a single step. Start today! 🚀"}
                    {currentStreak > 0 && currentStreak < 3 && "Great start! Keep the momentum! 🔥"}
                    {currentStreak >= 3 && currentStreak < 7 && "You're on fire! Don't stop now! ⚡"}
                    {currentStreak >= 7 && "Amazing dedication! You're unstoppable! 💪"}
                </p>
            </div>
        </div>
    );
};

export default StreakCounter;
