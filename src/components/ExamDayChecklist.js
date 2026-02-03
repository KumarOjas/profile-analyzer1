import React, { useState, useEffect } from 'react';
import './ExamDayChecklist.css';

const ExamDayChecklist = () => {
    const [checklist, setChecklist] = useState([
        { id: 1, text: 'Arrive at exam center 1 hour early', completed: false, category: 'preparation' },
        { id: 2, text: 'Carry valid ID proof (Aadhaar/Passport)', completed: false, category: 'documents' },
        { id: 3, text: 'Bring admit card and hall ticket', completed: false, category: 'documents' },
        { id: 4, text: 'Check exam timing and reporting time', completed: false, category: 'preparation' },
        { id: 5, text: 'Wear comfortable, light-colored clothes', completed: false, category: 'personal' },
        { id: 6, text: 'Bring water bottle (transparent)', completed: false, category: 'essentials' },
        { id: 7, text: 'Bring necessary stationery (pens, pencils)', completed: false, category: 'essentials' },
        { id: 8, text: 'Have a light breakfast/lunch', completed: false, category: 'health' },
        { id: 9, text: 'Get adequate sleep the night before', completed: false, category: 'health' },
        { id: 10, text: 'Stay calm and confident', completed: false, category: 'mental' },
        { id: 11, text: 'Read instructions carefully before starting', completed: false, category: 'exam' },
        { id: 12, text: 'Manage time effectively during exam', completed: false, category: 'exam' },
        { id: 13, text: 'Double-check answers before submission', completed: false, category: 'exam' },
        { id: 14, text: 'Stay hydrated during breaks', completed: false, category: 'health' },
        { id: 15, text: 'Review answers if time permits', completed: false, category: 'exam' }
    ]);

    useEffect(() => {
        loadChecklistProgress();
    }, []);

    const loadChecklistProgress = () => {
        const saved = JSON.parse(localStorage.getItem('examDayChecklist') || '[]');
        if (saved.length > 0) {
            setChecklist(saved);
        }
    };

    const toggleItem = (id) => {
        const updatedChecklist = checklist.map(item =>
            item.id === id ? { ...item, completed: !item.completed } : item
        );
        setChecklist(updatedChecklist);
        localStorage.setItem('examDayChecklist', JSON.stringify(updatedChecklist));
    };

    const resetChecklist = () => {
        const resetChecklist = checklist.map(item => ({ ...item, completed: false }));
        setChecklist(resetChecklist);
        localStorage.setItem('examDayChecklist', JSON.stringify(resetChecklist));
    };

    const getCategoryIcon = (category) => {
        const icons = {
            preparation: '⏰',
            documents: '📄',
            personal: '👕',
            essentials: '✏️',
            health: '💊',
            mental: '🧠',
            exam: '📝'
        };
        return icons[category] || '✅';
    };

    const getCategoryName = (category) => {
        const names = {
            preparation: 'Preparation',
            documents: 'Documents',
            personal: 'Personal',
            essentials: 'Essentials',
            health: 'Health',
            mental: 'Mental Prep',
            exam: 'During Exam'
        };
        return names[category] || category;
    };

    const getCompletionStats = () => {
        const completed = checklist.filter(item => item.completed).length;
        const total = checklist.length;
        return { completed, total, percentage: Math.round((completed / total) * 100) };
    };

    const stats = getCompletionStats();

    const groupedChecklist = checklist.reduce((groups, item) => {
        if (!groups[item.category]) {
            groups[item.category] = [];
        }
        groups[item.category].push(item);
        return groups;
    }, {});

    return (
        <div className="exam-checklist">
            <div className="checklist-header">
                <h3>📋 Exam Day Checklist</h3>
                <p>Don't forget these important steps for exam day success</p>
            </div>

            <div className="checklist-progress">
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${stats.percentage}%` }}
                    ></div>
                </div>
                <div className="progress-text">
                    <span className="progress-number">{stats.completed}/{stats.total}</span>
                    <span className="progress-percent">({stats.percentage}%)</span>
                </div>
            </div>

            <div className="checklist-actions">
                <button className="reset-btn" onClick={resetChecklist}>
                    🔄 Reset All
                </button>
            </div>

            <div className="checklist-content">
                {Object.entries(groupedChecklist).map(([category, items]) => (
                    <div key={category} className="checklist-category">
                        <h4 className="category-header">
                            <span className="category-icon">{getCategoryIcon(category)}</span>
                            {getCategoryName(category)}
                        </h4>

                        <div className="category-items">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className={`checklist-item ${item.completed ? 'completed' : ''}`}
                                    onClick={() => toggleItem(item.id)}
                                >
                                    <div className="item-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={item.completed}
                                            onChange={() => toggleItem(item.id)}
                                            id={`item-${item.id}`}
                                        />
                                        <label htmlFor={`item-${item.id}`}></label>
                                    </div>

                                    <div className="item-content">
                                        <span className="item-text">{item.text}</span>
                                        {item.completed && (
                                            <span className="completed-badge">✅ Done</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="checklist-motivation">
                <h4>💪 Last Minute Tips:</h4>
                <div className="tips-grid">
                    <div className="tip-card">
                        <h5>🧘‍♂️ Stay Calm</h5>
                        <p>Take deep breaths and stay confident. You've prepared well!</p>
                    </div>
                    <div className="tip-card">
                        <h5>⏱️ Time Management</h5>
                        <p>Don't spend too much time on difficult questions. Move on and come back later.</p>
                    </div>
                    <div className="tip-card">
                        <h5>📝 Read Carefully</h5>
                        <p>Read questions twice. Underline key words and requirements.</p>
                    </div>
                    <div className="tip-card">
                        <h5>🎯 Focus</h5>
                        <p>Block out distractions. Focus on your paper and your performance.</p>
                    </div>
                </div>
            </div>

            <div className="checklist-footer">
                <p>🚀 <strong>Remember:</strong> Success comes to those who are prepared. You've got this! Good luck! 🌟</p>
            </div>
        </div>
    );
};

export default ExamDayChecklist;
