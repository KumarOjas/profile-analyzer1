import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import './SimpleLeaderboard.css';

const SimpleLeaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [userRank, setUserRank] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        loadLeaderboard();
    }, []);

    const loadLeaderboard = () => {
        // Load scores from localStorage (simulated leaderboard)
        const scores = JSON.parse(localStorage.getItem('examScores') || '[]');
        const dates = JSON.parse(localStorage.getItem('examDates') || '[]');

        // Create leaderboard entries (simulated with different users)
        const mockUsers = [
            { name: 'Rahul Sharma', score: 95, avatar: '👨‍🎓' },
            { name: 'Priya Patel', score: 92, avatar: '👩‍🎓' },
            { name: 'Amit Kumar', score: 89, avatar: '👨‍💼' },
            { name: 'Sneha Singh', score: 87, avatar: '👩‍💻' },
            { name: 'Vikram Rao', score: 85, avatar: '👨‍🔬' },
            { name: 'Kavita Jain', score: 83, avatar: '👩‍⚕️' },
            { name: 'Rohit Verma', score: 81, avatar: '👨‍🏫' },
            { name: 'Anjali Gupta', score: 79, avatar: '👩‍🎨' },
            { name: 'Suresh Reddy', score: 77, avatar: '👨‍🚀' },
            { name: 'Meera Iyer', score: 75, avatar: '👩‍🌾' }
        ];

        // Add user's scores if available
        if (scores.length > 0) {
            const userBestScore = Math.max(...scores);
            const userEntry = {
                name: 'You',
                score: userBestScore,
                avatar: '🎯',
                isUser: true
            };

            // Insert user in correct position
            const userIndex = mockUsers.findIndex(user => user.score < userBestScore);
            if (userIndex === -1) {
                mockUsers.push(userEntry);
            } else {
                mockUsers.splice(userIndex, 0, userEntry);
            }

            // Keep only top 10
            const finalLeaderboard = mockUsers.slice(0, 10);
            setLeaderboard(finalLeaderboard);

            // Find user's rank
            const userRankIndex = finalLeaderboard.findIndex(entry => entry.isUser);
            setUserRank(userRankIndex + 1);
        } else {
            setLeaderboard(mockUsers.slice(0, 10));
        }
    };

    const getRankIcon = (rank) => {
        switch (rank) {
            case 1: return '🥇';
            case 2: return '🥈';
            case 3: return '🥉';
            default: return `#${rank}`;
        }
    };

    const getRankColor = (rank) => {
        switch (rank) {
            case 1: return '#FFD700';
            case 2: return '#C0C0C0';
            case 3: return '#CD7F32';
            default: return 'var(--text-color)';
        }
    };

    return (
        <div className="leaderboard">
            <div className="leaderboard-header">
                <h3>🏆 JEE Leaderboard</h3>
                <p>Top performers this month</p>
            </div>

            {userRank && (
                <div className="user-rank">
                    <p>Your current rank: <span className="rank-highlight">#{userRank}</span></p>
                </div>
            )}

            <div className="leaderboard-list">
                {leaderboard.length > 0 ? (
                    leaderboard.map((entry, index) => (
                        <div
                            key={entry.userId || index}
                            className={`leaderboard-item ${entry.userId === currentUser?.uid ? 'user-entry' : ''}`}
                        >
                            <div className="rank">
                                <span className="rank-icon" style={{ color: getRankColor(index + 1) }}>
                                    {getRankIcon(index + 1)}
                                </span>
                            </div>

                            <div className="user-info">
                                <span className="avatar">👤</span>
                                <div className="user-details">
                                    <span className="name">{entry.userName || 'Anonymous'}</span>
                                    {entry.userId === currentUser?.uid && <span className="you-badge">You</span>}
                                </div>
                            </div>

                            <div className="score">
                                <span className="score-value">{entry.totalScore || 0} pts</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-leaderboard-data">
                        <p>No leaderboard data available yet. Take some tests to get started!</p>
                    </div>
                )}
            </div>

            <div className="leaderboard-motivation">
                <h4>🎯 Get on the Leaderboard!</h4>
                <ul>
                    <li>Take regular mock tests</li>
                    <li>Focus on accuracy and speed</li>
                    <li>Learn from top performers</li>
                    <li>Maintain consistency</li>
                </ul>
            </div>

            <div className="leaderboard-refresh">
                <button className="refresh-btn" onClick={loadLeaderboard}>
                    🔄 Refresh Rankings
                </button>
            </div>
        </div>
    );
};

export default SimpleLeaderboard;
