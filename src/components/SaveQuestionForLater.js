import React, { useState, useEffect } from 'react';
import './SaveQuestionForLater.css';

const SaveQuestionForLater = () => {
    const [savedQuestions, setSavedQuestions] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newQuestion, setNewQuestion] = useState({
        subject: '',
        question: '',
        difficulty: 'medium',
        notes: ''
    });

    useEffect(() => {
        loadSavedQuestions();
    }, []);

    const loadSavedQuestions = () => {
        const saved = JSON.parse(localStorage.getItem('savedQuestions') || '[]');
        setSavedQuestions(saved);
    };

    const saveQuestion = () => {
        if (!newQuestion.question.trim()) return;

        const question = {
            id: Date.now(),
            ...newQuestion,
            dateSaved: new Date().toISOString(),
            completed: false
        };

        const updatedQuestions = [...savedQuestions, question];
        setSavedQuestions(updatedQuestions);
        localStorage.setItem('savedQuestions', JSON.stringify(updatedQuestions));

        setNewQuestion({
            subject: '',
            question: '',
            difficulty: 'medium',
            notes: ''
        });
        setShowForm(false);
    };

    const toggleCompleted = (id) => {
        const updatedQuestions = savedQuestions.map(q =>
            q.id === id ? { ...q, completed: !q.completed } : q
        );
        setSavedQuestions(updatedQuestions);
        localStorage.setItem('savedQuestions', JSON.stringify(updatedQuestions));
    };

    const deleteQuestion = (id) => {
        const updatedQuestions = savedQuestions.filter(q => q.id !== id);
        setSavedQuestions(updatedQuestions);
        localStorage.setItem('savedQuestions', JSON.stringify(updatedQuestions));
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'easy': return '#4CAF50';
            case 'medium': return '#FF9800';
            case 'hard': return '#f44336';
            default: return '#2196F3';
        }
    };

    const completedCount = savedQuestions.filter(q => q.completed).length;
    const totalCount = savedQuestions.length;

    return (
        <div className="save-question-later">
            <div className="saved-header">
                <h3>📚 Save Question for Later</h3>
                <p>Keep track of questions you want to revisit</p>
            </div>

            <div className="saved-stats">
                <div className="stat-item">
                    <span className="stat-number">{totalCount}</span>
                    <span className="stat-label">Total Saved</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">{completedCount}</span>
                    <span className="stat-label">Completed</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">{totalCount - completedCount}</span>
                    <span className="stat-label">Pending</span>
                </div>
            </div>

            <div className="saved-actions">
                <button className="add-question-btn" onClick={() => setShowForm(true)}>
                    ➕ Add Question
                </button>
            </div>

            {showForm && (
                <div className="question-form">
                    <h4>Add New Question</h4>
                    <div className="form-group">
                        <label>Subject:</label>
                        <select
                            value={newQuestion.subject}
                            onChange={(e) => setNewQuestion({...newQuestion, subject: e.target.value})}
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
                        <label>Question:</label>
                        <textarea
                            value={newQuestion.question}
                            onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}
                            placeholder="Enter the question text..."
                            rows="3"
                        />
                    </div>
                    <div className="form-group">
                        <label>Difficulty:</label>
                        <select
                            value={newQuestion.difficulty}
                            onChange={(e) => setNewQuestion({...newQuestion, difficulty: e.target.value})}
                        >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Notes (optional):</label>
                        <textarea
                            value={newQuestion.notes}
                            onChange={(e) => setNewQuestion({...newQuestion, notes: e.target.value})}
                            placeholder="Add any notes or hints..."
                            rows="2"
                        />
                    </div>
                    <div className="form-actions">
                        <button onClick={saveQuestion}>Save Question</button>
                        <button onClick={() => setShowForm(false)}>Cancel</button>
                    </div>
                </div>
            )}

            <div className="saved-questions">
                {savedQuestions.length === 0 ? (
                    <div className="no-questions">
                        <p>📝 No saved questions yet.</p>
                        <p>Click "Add Question" to save questions for later review!</p>
                    </div>
                ) : (
                    savedQuestions.map((question) => (
                        <div
                            key={question.id}
                            className={`question-card ${question.completed ? 'completed' : ''}`}
                        >
                            <div className="question-header">
                                <div className="question-meta">
                                    <span className="subject">{question.subject}</span>
                                    <span
                                        className="difficulty"
                                        style={{ backgroundColor: getDifficultyColor(question.difficulty) }}
                                    >
                                        {question.difficulty}
                                    </span>
                                </div>
                                <div className="question-actions">
                                    <button
                                        className="complete-btn"
                                        onClick={() => toggleCompleted(question.id)}
                                    >
                                        {question.completed ? '✅' : '⬜'}
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteQuestion(question.id)}
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>

                            <div className="question-content">
                                <p className="question-text">{question.question}</p>
                                {question.notes && (
                                    <p className="question-notes">
                                        <strong>Notes:</strong> {question.notes}
                                    </p>
                                )}
                            </div>

                            <div className="question-footer">
                                <small>
                                    Saved on {new Date(question.dateSaved).toLocaleDateString()}
                                </small>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="saved-tips">
                <h4>💡 Study Tips:</h4>
                <ul>
                    <li>Review saved questions regularly to reinforce learning</li>
                    <li>Focus on difficult questions first</li>
                    <li>Use notes to track your progress and mistakes</li>
                    <li>Mark questions as completed when you're confident</li>
                </ul>
            </div>
        </div>
    );
};

export default SaveQuestionForLater;
