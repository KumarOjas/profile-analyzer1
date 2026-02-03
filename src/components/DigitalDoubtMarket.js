import React, { useState, useEffect } from 'react';
import { ref, onValue, push, set } from 'firebase/database';
import { db } from '../firebase';
import './DigitalDoubtMarket.css';

const DigitalDoubtMarket = () => {
    const [doubts, setDoubts] = useState([]);
    const [newDoubt, setNewDoubt] = useState('');
    const [userPoints, setUserPoints] = useState(150);

    useEffect(() => {
        const doubtsRef = ref(db, 'doubts');
        onValue(doubtsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const doubtsArray = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                setDoubts(doubtsArray);
            } else {
                setDoubts([]);
            }
        });
    }, []);

    const submitDoubt = () => {
        if (newDoubt.trim()) {
            const doubtsRef = ref(db, 'doubts');
            const newDoubtRef = push(doubtsRef);
            set(newDoubtRef, {
                question: newDoubt,
                answers: [],
                tags: ['New'],
                timestamp: Date.now()
            });
            setNewDoubt('');
        }
    };

    const voteAnswer = (doubtId, answerId) => {
        const answerRef = ref(db, `doubts/${doubtId}/answers/${answerId}`);
        onValue(answerRef, (snapshot) => {
            const answer = snapshot.val();
            if (answer) {
                set(answerRef, { ...answer, votes: answer.votes + 1 });
            }
        }, { onlyOnce: true });
    };

    return (
        <div className="digital-doubt-market">
            <h1>Digital Doubt Market</h1>
            <div className="user-points">
                <p>Your Points: {userPoints}</p>
            </div>

            <div className="ask-doubt">
                <h2>Ask Your Doubt</h2>
                <textarea
                    value={newDoubt}
                    onChange={(e) => setNewDoubt(e.target.value)}
                    placeholder="Type your doubt here..."
                    rows="4"
                />
                <button onClick={submitDoubt}>Submit Doubt</button>
            </div>

            <div className="doubts-list">
                <h2>Recent Doubts & Answers</h2>
                {doubts.map(doubt => (
                    <div key={doubt.id} className="doubt-card">
                        <div className="doubt-question">
                            <h3>{doubt.question}</h3>
                            <div className="tags">
                                {doubt.tags.map(tag => (
                                    <span key={tag} className="tag">{tag}</span>
                                ))}
                            </div>
                        </div>
                        <div className="answers">
                            {doubt.answers.map(answer => (
                                <div key={answer.id} className="answer">
                                    <p>{answer.text}</p>
                                    <div className="answer-meta">
                                        <span>By: {answer.author}</span>
                                        <button onClick={() => voteAnswer(doubt.id, answer.id)}>
                                            👍 {answer.votes}
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {doubt.answers.length === 0 && (
                                <p className="no-answers">No answers yet. Be the first to help!</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="gamification-info">
                <h3>Earn Points & Rewards</h3>
                <ul>
                    <li>Ask a doubt: +5 points</li>
                    <li>Answer correctly: +10 points</li>
                    <li>Get voted best answer: +20 points</li>
                    <li>Redeem points for premium content</li>
                </ul>
            </div>
        </div>
    );
};

export default DigitalDoubtMarket;
