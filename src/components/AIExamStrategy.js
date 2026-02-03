import React, { useState } from 'react';
import './AIExamStrategy.css';

const AIExamStrategy = () => {
    const [selectedExam, setSelectedExam] = useState('');
    const [strategy, setStrategy] = useState(null);

    const exams = [
        'UPSC Civil Services',
        'SSC CGL',
        'IBPS PO',
        'Railway NTPC',
        'NDA',
        'CDS'
    ];

    const generateStrategy = () => {
        // Mock AI-generated strategy
        setStrategy({
            dailyTimetable: [
                '6:00 AM - 7:00 AM: Physical Exercise',
                '7:00 AM - 8:00 AM: Breakfast & News Reading',
                '8:00 AM - 11:00 AM: Subject Study (3 hours)',
                '11:00 AM - 12:00 PM: Mock Test Practice',
                '12:00 PM - 1:00 PM: Lunch Break',
                '1:00 PM - 4:00 PM: Revision & Weak Areas',
                '4:00 PM - 5:00 PM: Current Affairs',
                '5:00 PM - 6:00 PM: Hobby/Relaxation',
                '6:00 PM - 8:00 PM: Self-Study',
                '8:00 PM - 9:00 PM: Dinner',
                '9:00 PM - 10:00 PM: Light Revision',
                '10:00 PM: Sleep'
            ],
            weeklyRevision: [
                'Monday: Polity & Governance',
                'Tuesday: Economy & Finance',
                'Wednesday: History & Culture',
                'Thursday: Geography & Environment',
                'Friday: Science & Technology',
                'Saturday: Current Affairs & Mock Test',
                'Sunday: Full Revision & Analysis'
            ],
            mockTestCalendar: [
                'Week 1: Topic-wise Tests',
                'Week 2: Subject-wise Tests',
                'Week 3: Full-length Mock 1',
                'Week 4: Full-length Mock 2 + Analysis'
            ],
            weakAreas: ['Mathematics', 'General Science'],
            subscriptionPrice: '₹199/month'
        });
    };

    return (
        <div className="ai-exam-strategy">
            <h1>AI Exam Strategy Generator</h1>
            <div className="strategy-form">
                <select value={selectedExam} onChange={(e) => setSelectedExam(e.target.value)}>
                    <option value="">Select Exam</option>
                    {exams.map(exam => (
                        <option key={exam} value={exam}>{exam}</option>
                    ))}
                </select>
                <button onClick={generateStrategy} disabled={!selectedExam}>
                    Generate AI Strategy
                </button>
            </div>

            {strategy && (
                <div className="strategy-results">
                    <h2>Your Personalized Strategy for {selectedExam}</h2>

                    <div className="strategy-section">
                        <h3>Daily Timetable</h3>
                        <ul>
                            {strategy.dailyTimetable.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="strategy-section">
                        <h3>Weekly Revision Plan</h3>
                        <ul>
                            {strategy.weeklyRevision.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="strategy-section">
                        <h3>Mock Test Calendar</h3>
                        <ul>
                            {strategy.mockTestCalendar.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="strategy-section">
                        <h3>Focus Areas (Based on Your Performance)</h3>
                        <ul>
                            {strategy.weakAreas.map((area, index) => (
                                <li key={index}>{area}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="subscription-offer">
                        <h3>Get Weekly Strategy Updates</h3>
                        <p>AI-powered adjustments based on your mock test results</p>
                        <button className="subscribe-btn">Subscribe for {strategy.subscriptionPrice}</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIExamStrategy;
