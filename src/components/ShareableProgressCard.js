import React, { useState, useEffect } from 'react';
import './ShareableProgressCard.css';

const ShareableProgressCard = () => {
    const [progress, setProgress] = useState({
        examsTaken: 0,
        averageScore: 0,
        streakDays: 0,
        totalQuestions: 0
    });

    useEffect(() => {
        // Load progress data from localStorage
        const examsTaken = parseInt(localStorage.getItem('examsTaken') || '0');
        const averageScore = parseFloat(localStorage.getItem('averageScore') || '0');
        const streakDays = parseInt(localStorage.getItem('studyStreak') || '0');
        const totalQuestions = parseInt(localStorage.getItem('totalQuestionsAnswered') || '0');

        setProgress({
            examsTaken,
            averageScore: Math.round(averageScore),
            streakDays,
            totalQuestions
        });
    }, []);

    const shareProgress = () => {
        const shareText = `🚀 My JEE Progress on OJAS Classes!\n📊 Exams Taken: ${progress.examsTaken}\n🎯 Average Score: ${progress.averageScore}%\n🔥 Study Streak: ${progress.streakDays} days\n❓ Questions Answered: ${progress.totalQuestions}\n\nJoin me in acing JEE! ${window.location.origin}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
        window.open(whatsappUrl, '_blank');
    };

    const downloadCard = () => {
        // Simple download as text for now
        const cardData = `JEE Progress Card\nExams Taken: ${progress.examsTaken}\nAverage Score: ${progress.averageScore}%\nStudy Streak: ${progress.streakDays} days\nQuestions Answered: ${progress.totalQuestions}`;
        const blob = new Blob([cardData], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'jee-progress-card.txt';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="progress-card">
            <div className="card-header">
                <h3>📊 My JEE Progress</h3>
                <p>Track your journey to success</p>
            </div>

            <div className="progress-stats">
                <div className="stat-item">
                    <span className="stat-icon">📝</span>
                    <div className="stat-info">
                        <h4>{progress.examsTaken}</h4>
                        <p>Exams Taken</p>
                    </div>
                </div>

                <div className="stat-item">
                    <span className="stat-icon">🎯</span>
                    <div className="stat-info">
                        <h4>{progress.averageScore}%</h4>
                        <p>Average Score</p>
                    </div>
                </div>

                <div className="stat-item">
                    <span className="stat-icon">🔥</span>
                    <div className="stat-info">
                        <h4>{progress.streakDays}</h4>
                        <p>Day Streak</p>
                    </div>
                </div>

                <div className="stat-item">
                    <span className="stat-icon">❓</span>
                    <div className="stat-info">
                        <h4>{progress.totalQuestions}</h4>
                        <p>Questions</p>
                    </div>
                </div>
            </div>

            <div className="progress-actions">
                <button className="share-btn" onClick={shareProgress}>
                    📤 Share on WhatsApp
                </button>
                <button className="download-btn" onClick={downloadCard}>
                    💾 Download Card
                </button>
            </div>

            <div className="progress-motivation">
                <p>
                    {progress.examsTaken === 0
                        ? "Start your first exam to see your progress! 🚀"
                        : progress.averageScore >= 80
                        ? "Excellent progress! Keep up the great work! 🌟"
                        : "Great effort! Keep practicing to improve your scores! 💪"
                    }
                </p>
            </div>
        </div>
    );
};

export default ShareableProgressCard;
