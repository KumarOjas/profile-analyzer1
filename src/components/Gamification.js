import React, { useState } from 'react';
import './Gamification.css';

const Gamification = () => {
    const [userPoints] = useState(1250);

    const badges = [
        { id: 1, name: 'First Login', icon: '🎯', earned: true },
        { id: 2, name: 'Quiz Master', icon: '🧠', earned: true },
        { id: 3, name: 'Discussion Starter', icon: '💬', earned: true },
        { id: 4, name: 'Study Streak', icon: '🔥', earned: false },
        { id: 5, name: 'Top Performer', icon: '🏆', earned: false },
        { id: 6, name: 'Mentor', icon: '👨‍🏫', earned: false }
    ];

    const achievements = [
        { id: 1, name: 'Complete 10 Quizzes', progress: 100, reward: '50 Points' },
        { id: 2, name: 'Post 5 Forum Discussions', progress: 80, reward: '30 Points' },
        { id: 3, name: 'Help 3 Students', progress: 60, reward: '40 Points' },
        { id: 4, name: 'Maintain 7-Day Study Streak', progress: 43, reward: '100 Points' }
    ];

    const leaderboard = [
        { rank: 1, name: 'AspirantPro', points: 2500, avatar: '👑' },
        { rank: 2, name: 'StudyMaster', points: 2200, avatar: '🎓' },
        { rank: 3, name: 'ExamCracker', points: 2100, avatar: '💡' },
        { rank: 4, name: 'You', points: 1250, avatar: '🎯', isCurrentUser: true },
        { rank: 5, name: 'FutureIAS', points: 1100, avatar: '📚' }
    ];

    return (
        <div className="gamification">
            <h1>Achievements & Leaderboard</h1>
            <p>Earn points, unlock badges, and climb the leaderboard by staying active!</p>

            <div className="user-stats">
                <div className="points-card">
                    <h2>Your Points</h2>
                    <div className="points-display">{userPoints}</div>
                    <p>Keep learning to earn more!</p>
                </div>
            </div>

            <section className="badges-section">
                <h2>Your Badges</h2>
                <div className="badges-grid">
                    {badges.map(badge => (
                        <div key={badge.id} className={`badge ${badge.earned ? 'earned' : 'locked'}`}>
                            <div className="badge-icon">{badge.icon}</div>
                            <div className="badge-name">{badge.name}</div>
                            {!badge.earned && <div className="lock-icon">🔒</div>}
                        </div>
                    ))}
                </div>
            </section>

            <section className="achievements-section">
                <h2>Achievements in Progress</h2>
                <div className="achievements-list">
                    {achievements.map(achievement => (
                        <div key={achievement.id} className="achievement-card">
                            <h3>{achievement.name}</h3>
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${achievement.progress}%` }}
                                ></div>
                            </div>
                            <p>{achievement.progress}% Complete</p>
                            <p className="reward">Reward: {achievement.reward}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="leaderboard-section">
                <h2>Leaderboard</h2>
                <div className="leaderboard">
                    {leaderboard.map(user => (
                        <div key={user.rank} className={`leaderboard-item ${user.isCurrentUser ? 'current-user' : ''}`}>
                            <div className="rank">{user.rank}</div>
                            <div className="avatar">{user.avatar}</div>
                            <div className="user-info">
                                <div className="name">{user.name}</div>
                                <div className="points">{user.points} points</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Gamification;
