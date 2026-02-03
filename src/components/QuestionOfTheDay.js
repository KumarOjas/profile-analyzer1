import React, { useState, useEffect } from 'react';
import './QuestionOfTheDay.css';

const QuestionOfTheDay = () => {
    const [question, setQuestion] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [notificationEnabled, setNotificationEnabled] = useState(false);
    const [loading, setLoading] = useState(true);

    // Sample questions database (in real app, this would come from API)
    const questions = [
        {
            id: 1,
            question: "What is the SI unit of force?",
            options: ["Newton", "Joule", "Watt", "Pascal"],
            correctAnswer: "Newton",
            explanation: "Force is measured in Newtons (N) in the SI system.",
            subject: "Physics",
            difficulty: "Easy"
        },
        {
            id: 2,
            question: "Which element has atomic number 1?",
            options: ["Helium", "Hydrogen", "Lithium", "Beryllium"],
            correctAnswer: "Hydrogen",
            explanation: "Hydrogen has atomic number 1 and is the lightest element.",
            subject: "Chemistry",
            difficulty: "Easy"
        },
        {
            id: 3,
            question: "What is the derivative of sin(x)?",
            options: ["cos(x)", "-sin(x)", "tan(x)", "sec(x)"],
            correctAnswer: "cos(x)",
            explanation: "The derivative of sin(x) is cos(x).",
            subject: "Mathematics",
            difficulty: "Medium"
        },
        {
            id: 4,
            question: "Which organelle is known as the powerhouse of the cell?",
            options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
            correctAnswer: "Mitochondria",
            explanation: "Mitochondria generate ATP, the energy currency of cells.",
            subject: "Biology",
            difficulty: "Easy"
        },
        {
            id: 5,
            question: "What is the speed of light in vacuum?",
            options: ["3 × 10^8 m/s", "3 × 10^6 m/s", "3 × 10^10 m/s", "3 × 10^4 m/s"],
            correctAnswer: "3 × 10^8 m/s",
            explanation: "The speed of light in vacuum is approximately 3 × 10^8 meters per second.",
            subject: "Physics",
            difficulty: "Medium"
        }
    ];

    useEffect(() => {
        loadQuestionOfTheDay();
        checkNotificationPermission();
    }, []);

    const loadQuestionOfTheDay = () => {
        const today = new Date().toDateString();
        const savedQuestion = localStorage.getItem('questionOfTheDay');
        const savedDate = localStorage.getItem('questionDate');

        if (savedDate === today && savedQuestion) {
            setQuestion(JSON.parse(savedQuestion));
        } else {
            // Select random question for today
            const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
            setQuestion(randomQuestion);
            localStorage.setItem('questionOfTheDay', JSON.stringify(randomQuestion));
            localStorage.setItem('questionDate', today);
        }
        setLoading(false);
    };

    const checkNotificationPermission = () => {
        if ('Notification' in window) {
            setNotificationEnabled(Notification.permission === 'granted');
        }
    };

    const requestNotificationPermission = async () => {
        if ('Notification' in window) {
            const permission = await Notification.requestPermission();
            setNotificationEnabled(permission === 'granted');

            if (permission === 'granted') {
                // Register service worker for notifications
                registerServiceWorker();
            }
        }
    };

    const registerServiceWorker = async () => {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('Service Worker registered:', registration);
            } catch (error) {
                console.log('Service Worker registration failed:', error);
            }
        }
    };

    const scheduleNotification = () => {
        if ('serviceWorker' in navigator && notificationEnabled) {
            // Schedule notification for 9 AM daily
            const now = new Date();
            const notificationTime = new Date();
            notificationTime.setHours(9, 0, 0, 0);

            if (now > notificationTime) {
                notificationTime.setDate(notificationTime.getDate() + 1);
            }

            const timeUntilNotification = notificationTime.getTime() - now.getTime();

            setTimeout(() => {
                new Notification('📚 Question of the Day', {
                    body: 'Your daily JEE question is ready! Click to solve it.',
                    icon: '/favicon.ico',
                    badge: '/favicon.ico'
                });
            }, timeUntilNotification);
        }
    };

    const submitAnswer = () => {
        if (!userAnswer) return;

        const correct = userAnswer === question.correctAnswer;
        setIsCorrect(correct);
        setShowResult(true);

        // Save answer to localStorage
        const answerData = {
            questionId: question.id,
            userAnswer,
            isCorrect: correct,
            timestamp: new Date().toISOString()
        };

        const savedAnswers = JSON.parse(localStorage.getItem('questionAnswers') || '[]');
        savedAnswers.push(answerData);
        localStorage.setItem('questionAnswers', JSON.stringify(savedAnswers));

        // Update streak if correct
        if (correct) {
            const currentStreak = parseInt(localStorage.getItem('dailyQuestionStreak') || '0');
            localStorage.setItem('dailyQuestionStreak', (currentStreak + 1).toString());
        }
    };

    const getNextQuestion = () => {
        setShowResult(false);
        setUserAnswer('');
        loadQuestionOfTheDay();
    };

    const getStreak = () => {
        return parseInt(localStorage.getItem('dailyQuestionStreak') || '0');
    };

    const getTotalAnswered = () => {
        const answers = JSON.parse(localStorage.getItem('questionAnswers') || '[]');
        return answers.length;
    };

    const getCorrectPercentage = () => {
        const answers = JSON.parse(localStorage.getItem('questionAnswers') || '[]');
        if (answers.length === 0) return 0;
        const correct = answers.filter(a => a.isCorrect).length;
        return Math.round((correct / answers.length) * 100);
    };

    if (loading) {
        return (
            <div className="question-of-the-day">
                <div className="loading">Loading today's question...</div>
            </div>
        );
    }

    return (
        <div className="question-of-the-day">
            <div className="question-header">
                <h3>❓ Question of the Day</h3>
                <p>Sharpen your skills with daily practice questions</p>
            </div>

            <div className="question-stats">
                <div className="stat">
                    <span className="stat-number">{getStreak()}</span>
                    <span className="stat-label">Day Streak</span>
                </div>
                <div className="stat">
                    <span className="stat-number">{getTotalAnswered()}</span>
                    <span className="stat-label">Questions Solved</span>
                </div>
                <div className="stat">
                    <span className="stat-number">{getCorrectPercentage()}%</span>
                    <span className="stat-label">Accuracy</span>
                </div>
            </div>

            <div className="notification-settings">
                <div className="notification-toggle">
                    <span>🔔 Daily Notifications</span>
                    <button
                        className={`notification-btn ${notificationEnabled ? 'enabled' : 'disabled'}`}
                        onClick={notificationEnabled ? scheduleNotification : requestNotificationPermission}
                    >
                        {notificationEnabled ? 'Scheduled' : 'Enable'}
                    </button>
                </div>
                <small>Get notified at 9 AM daily for your question!</small>
            </div>

            <div className="question-card">
                <div className="question-meta">
                    <span className="subject">{question.subject}</span>
                    <span className={`difficulty ${question.difficulty.toLowerCase()}`}>
                        {question.difficulty}
                    </span>
                </div>

                <div className="question-content">
                    <h4>{question.question}</h4>

                    {!showResult ? (
                        <div className="answer-options">
                            {question.options.map((option, index) => (
                                <label key={index} className="option">
                                    <input
                                        type="radio"
                                        name="answer"
                                        value={option}
                                        checked={userAnswer === option}
                                        onChange={(e) => setUserAnswer(e.target.value)}
                                    />
                                    <span className="option-text">{option}</span>
                                </label>
                            ))}

                            <button
                                className="submit-btn"
                                onClick={submitAnswer}
                                disabled={!userAnswer}
                            >
                                Submit Answer
                            </button>
                        </div>
                    ) : (
                        <div className={`result ${isCorrect ? 'correct' : 'incorrect'}`}>
                            <div className="result-header">
                                <span className="result-icon">{isCorrect ? '✅' : '❌'}</span>
                                <h5>{isCorrect ? 'Correct!' : 'Incorrect'}</h5>
                            </div>

                            <div className="result-details">
                                <p><strong>Your Answer:</strong> {userAnswer}</p>
                                <p><strong>Correct Answer:</strong> {question.correctAnswer}</p>
                                <div className="explanation">
                                    <strong>Explanation:</strong> {question.explanation}
                                </div>
                            </div>

                            <button className="next-btn" onClick={getNextQuestion}>
                                Next Question
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="question-tips">
                <h4>💡 Study Tips:</h4>
                <ul>
                    <li>Practice daily to build consistency and improve retention</li>
                    <li>Review explanations even for correct answers to deepen understanding</li>
                    <li>Focus on weak subjects to improve overall performance</li>
                    <li>Track your progress and celebrate milestones</li>
                </ul>
            </div>
        </div>
    );
};

export default QuestionOfTheDay;
