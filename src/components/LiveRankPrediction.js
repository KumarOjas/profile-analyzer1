import React, { useState } from 'react';
import './LiveRankPrediction.css';

const LiveRankPrediction = () => {
    const [mockTestScore, setMockTestScore] = useState('');
    const [prediction, setPrediction] = useState(null);

    const predictRank = () => {
        // Mock prediction logic
        const score = parseInt(mockTestScore);
        let rank, probability, cutoffMatch, competitionHeatmap;

        if (score >= 150) {
            rank = '1-100';
            probability = '95%';
            cutoffMatch = 'Excellent match';
            competitionHeatmap = 'Low competition zone';
        } else if (score >= 120) {
            rank = '101-500';
            probability = '80%';
            cutoffMatch = 'Good match';
            competitionHeatmap = 'Moderate competition';
        } else if (score >= 90) {
            rank = '501-1000';
            probability = '60%';
            cutoffMatch = 'Average match';
            competitionHeatmap = 'High competition';
        } else {
            rank = '1001+';
            probability = '30%';
            cutoffMatch = 'Below cutoff';
            competitionHeatmap = 'Very high competition';
        }

        setPrediction({
            rank,
            probability,
            cutoffMatch,
            competitionHeatmap,
            improvementTips: [
                'Focus on weak subjects',
                'Practice more mock tests',
                'Improve time management'
            ]
        });
    };

    return (
        <div className="live-rank-prediction">
            <h1>Live Rank Prediction Engine</h1>
            <div className="prediction-form">
                <label>Enter Your Mock Test Score:</label>
                <input
                    type="number"
                    value={mockTestScore}
                    onChange={(e) => setMockTestScore(e.target.value)}
                    placeholder="e.g., 135"
                    max="200"
                />
                <button onClick={predictRank} disabled={!mockTestScore}>
                    Predict My Rank
                </button>
            </div>

            {prediction && (
                <div className="prediction-results">
                    <h2>Your Rank Prediction</h2>
                    <div className="prediction-card">
                        <div className="rank-info">
                            <h3>Expected Rank: {prediction.rank}</h3>
                            <p>Selection Probability: {prediction.probability}</p>
                            <p>Cutoff Match: {prediction.cutoffMatch}</p>
                            <p>Competition Heatmap: {prediction.competitionHeatmap}</p>
                        </div>
                        <div className="improvement-tips">
                            <h4>Improvement Tips:</h4>
                            <ul>
                                {prediction.improvementTips.map((tip, index) => (
                                    <li key={index}>{tip}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="premium-features">
                        <h3>Unlock Advanced Analytics</h3>
                        <p>Get detailed rank trends, competitor analysis, and personalized strategies.</p>
                        <button className="premium-btn">Upgrade to Pro - ₹499</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LiveRankPrediction;
