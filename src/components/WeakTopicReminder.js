import React, { useState, useEffect } from 'react';
import './WeakTopicReminder.css';

const WeakTopicReminder = () => {
    const [weakTopics, setWeakTopics] = useState([]);
    const [newTopic, setNewTopic] = useState({
        subject: '',
        topic: '',
        difficulty: 'medium',
        lastAttempt: '',
        notes: ''
    });
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        // Section for adding initial weak topics (add your own data here if needed)
        // Example format:
        // const initialTopics = [
        //     {
        //         id: 1,
        //         subject: 'Physics',
        //         topic: 'Kinematics',
        //         difficulty: 'medium',
        //         lastAttempt: '2023-10-01',
        //         notes: 'Need to practice more problems',
        //         addedDate: new Date().toISOString(),
        //         reviewCount: 0,
        //         lastReviewed: null
        //     }
        // ];
        // If no data in localStorage, you can set initialTopics here
        loadWeakTopics();
    }, []);

    const loadWeakTopics = () => {
        const saved = JSON.parse(localStorage.getItem('weakTopics') || '[]');
        setWeakTopics(saved);
    };

    const addWeakTopic = () => {
        if (!newTopic.subject || !newTopic.topic) return;

        const topic = {
            id: Date.now(),
            ...newTopic,
            addedDate: new Date().toISOString(),
            reviewCount: 0,
            lastReviewed: null
        };

        const updatedTopics = [...weakTopics, topic];
        setWeakTopics(updatedTopics);
        localStorage.setItem('weakTopics', JSON.stringify(updatedTopics));

        setNewTopic({
            subject: '',
            topic: '',
            difficulty: 'medium',
            lastAttempt: '',
            notes: ''
        });
        setShowForm(false);
    };

    const markReviewed = (id) => {
        const updatedTopics = weakTopics.map(topic =>
            topic.id === id
                ? { ...topic, reviewCount: topic.reviewCount + 1, lastReviewed: new Date().toISOString() }
                : topic
        );
        setWeakTopics(updatedTopics);
        localStorage.setItem('weakTopics', JSON.stringify(updatedTopics));
    };

    const deleteTopic = (id) => {
        const updatedTopics = weakTopics.filter(topic => topic.id !== id);
        setWeakTopics(updatedTopics);
        localStorage.setItem('weakTopics', JSON.stringify(updatedTopics));
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'easy': return '#4CAF50';
            case 'medium': return '#FF9800';
            case 'hard': return '#f44336';
            default: return '#2196F3';
        }
    };

    const getTopicsNeedingReview = () => {
        const now = new Date();
        return weakTopics.filter(topic => {
            if (!topic.lastReviewed) return true;
            const lastReview = new Date(topic.lastReviewed);
            const daysSinceReview = Math.floor((now - lastReview) / (1000 * 60 * 60 * 24));
            // Review schedule: easy topics every 7 days, medium every 3 days, hard every 1 day
            const reviewInterval = topic.difficulty === 'easy' ? 7 : topic.difficulty === 'medium' ? 3 : 1;
            return daysSinceReview >= reviewInterval;
        });
    };

    const topicsNeedingReview = getTopicsNeedingReview();

    return (
        <div className="weak-topic-reminder">
            <div className="reminder-header">
                <h3>📚 Weak Topic Reminder</h3>
                <p>Track and review your weak areas systematically</p>
            </div>

            <div className="reminder-stats">
                <div className="stat-item">
                    <span className="stat-number">{weakTopics.length}</span>
                    <span className="stat-label">Total Topics</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">{topicsNeedingReview.length}</span>
                    <span className="stat-label">Need Review</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">
                        {weakTopics.length > 0 ? Math.round((weakTopics.reduce((sum, topic) => sum + topic.reviewCount, 0) / weakTopics.length) * 10) / 10 : 0}
                    </span>
                    <span className="stat-label">Avg Reviews</span>
                </div>
            </div>

            <div className="reminder-actions">
                <button className="add-topic-btn" onClick={() => setShowForm(true)}>
                    ➕ Add Weak Topic
                </button>
            </div>

            {showForm && (
                <div className="topic-form">
                    <h4>Add Weak Topic</h4>
                    <div className="form-group">
                        <label>Subject:</label>
                        <select
                            value={newTopic.subject}
                            onChange={(e) => setNewTopic({...newTopic, subject: e.target.value})}
                        >
                            <option value="">Select subject</option>
                            <option value="Physics">Physics</option>
                            <option value="Chemistry">Chemistry</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="Biology">Biology</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Topic Name:</label>
                        <input
                            type="text"
                            value={newTopic.topic}
                            onChange={(e) => setNewTopic({...newTopic, topic: e.target.value})}
                            placeholder="e.g., Kinematics, Organic Chemistry"
                        />
                    </div>
                    <div className="form-group">
                        <label>Difficulty Level:</label>
                        <select
                            value={newTopic.difficulty}
                            onChange={(e) => setNewTopic({...newTopic, difficulty: e.target.value})}
                        >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Last Attempt Date:</label>
                        <input
                            type="date"
                            value={newTopic.lastAttempt}
                            onChange={(e) => setNewTopic({...newTopic, lastAttempt: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label>Notes (optional):</label>
                        <textarea
                            value={newTopic.notes}
                            onChange={(e) => setNewTopic({...newTopic, notes: e.target.value})}
                            placeholder="Specific areas to focus on..."
                            rows="3"
                        />
                    </div>
                    <div className="form-actions">
                        <button onClick={addWeakTopic}>Add Topic</button>
                        <button onClick={() => setShowForm(false)}>Cancel</button>
                    </div>
                </div>
            )}

            <div className="topics-sections">
                {topicsNeedingReview.length > 0 && (
                    <div className="topics-section">
                        <h4>🔄 Topics Needing Review ({topicsNeedingReview.length})</h4>
                        <div className="topics-grid">
                            {topicsNeedingReview.map((topic) => (
                                <div key={topic.id} className="topic-card review-needed">
                                    <div className="topic-header">
                                        <div className="topic-meta">
                                            <span className="subject">{topic.subject}</span>
                                            <span
                                                className="difficulty"
                                                style={{ backgroundColor: getDifficultyColor(topic.difficulty) }}
                                            >
                                                {topic.difficulty}
                                            </span>
                                        </div>
                                        <div className="topic-actions">
                                            <button
                                                className="review-btn"
                                                onClick={() => markReviewed(topic.id)}
                                            >
                                                ✅ Reviewed
                                            </button>
                                            <button
                                                className="delete-btn"
                                                onClick={() => deleteTopic(topic.id)}
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </div>

                                    <div className="topic-content">
                                        <h5>{topic.topic}</h5>
                                        {topic.notes && (
                                            <p className="topic-notes">
                                                <strong>Notes:</strong> {topic.notes}
                                            </p>
                                        )}
                                    </div>

                                    <div className="topic-footer">
                                        <small>
                                            Reviews: {topic.reviewCount} |
                                            Last: {topic.lastReviewed ? new Date(topic.lastReviewed).toLocaleDateString() : 'Never'}
                                        </small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="topics-section">
                    <h4>📋 All Weak Topics ({weakTopics.length})</h4>
                    {weakTopics.length === 0 ? (
                        <div className="no-topics">
                            <p>🎯 No weak topics added yet.</p>
                            <p>Start tracking your weak areas to improve systematically!</p>
                        </div>
                    ) : (
                        <div className="topics-grid">
                            {weakTopics.map((topic) => (
                                <div key={topic.id} className="topic-card">
                                    <div className="topic-header">
                                        <div className="topic-meta">
                                            <span className="subject">{topic.subject}</span>
                                            <span
                                                className="difficulty"
                                                style={{ backgroundColor: getDifficultyColor(topic.difficulty) }}
                                            >
                                                {topic.difficulty}
                                            </span>
                                        </div>
                                        <div className="topic-actions">
                                            <button
                                                className="review-btn"
                                                onClick={() => markReviewed(topic.id)}
                                            >
                                                ✅ Reviewed
                                            </button>
                                            <button
                                                className="delete-btn"
                                                onClick={() => deleteTopic(topic.id)}
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </div>

                                    <div className="topic-content">
                                        <h5>{topic.topic}</h5>
                                        {topic.notes && (
                                            <p className="topic-notes">
                                                <strong>Notes:</strong> {topic.notes}
                                            </p>
                                        )}
                                    </div>

                                    <div className="topic-footer">
                                        <small>
                                            Reviews: {topic.reviewCount} |
                                            Last: {topic.lastReviewed ? new Date(topic.lastReviewed).toLocaleDateString() : 'Never'}
                                        </small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="reminder-tips">
                <h4>💡 Study Tips:</h4>
                <ul>
                    <li>Review hard topics daily, medium topics every 3 days, easy topics weekly</li>
                    <li>Focus on understanding concepts rather than memorization</li>
                    <li>Practice with similar problems after reviewing</li>
                    <li>Track your progress and celebrate improvements</li>
                </ul>
            </div>
        </div>
    );
};

export default WeakTopicReminder;
