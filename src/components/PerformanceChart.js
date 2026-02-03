import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import './PerformanceChart.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const PerformanceChart = () => {
    const [chartData, setChartData] = useState(null);
    const [timeRange, setTimeRange] = useState('last5');

    useEffect(() => {
        loadChartData();
    }, [timeRange, loadChartData]);

    const loadChartData = () => {
        // Load scores from localStorage
        const scores = JSON.parse(localStorage.getItem('examScores') || '[]');
        const dates = JSON.parse(localStorage.getItem('examDates') || '[]');

        let filteredScores = [];
        let filteredDates = [];
        const now = new Date();

        if (timeRange === 'last5') {
            // Get last 5 scores
            filteredScores = scores.slice(-5);
            filteredDates = dates.slice(-5);
        } else if (timeRange === 'last10') {
            // Get last 10 scores
            filteredScores = scores.slice(-10);
            filteredDates = dates.slice(-10);
        } else if (timeRange === 'month') {
            // Get scores from last month
            const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            const monthScores = [];
            const monthDates = [];

            dates.forEach((dateStr, index) => {
                const date = new Date(dateStr);
                if (date >= oneMonthAgo) {
                    monthScores.push(scores[index]);
                    monthDates.push(dateStr);
                }
            });

            filteredScores = monthScores.slice(-10); // Limit to 10 for chart readability
            filteredDates = monthDates.slice(-10);
        }

        // Format dates for display
        const formattedDates = filteredDates.map(dateStr => {
            const date = new Date(dateStr);
            return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
        });

        setChartData({
            labels: formattedDates,
            datasets: [
                {
                    label: 'Exam Scores (%)',
                    data: filteredScores,
                    backgroundColor: 'rgba(0, 123, 255, 0.6)',
                    borderColor: 'rgba(0, 123, 255, 1)',
                    borderWidth: 1,
                },
            ],
        });
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Your Performance Trend',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: {
                    display: true,
                    text: 'Score (%)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Exam Date'
                }
            }
        },
    };

    const getAverageScore = () => {
        if (!chartData || chartData.datasets[0].data.length === 0) return 0;
        const sum = chartData.datasets[0].data.reduce((a, b) => a + b, 0);
        return Math.round(sum / chartData.datasets[0].data.length);
    };

    const getImprovement = () => {
        if (!chartData || chartData.datasets[0].data.length < 2) return 0;
        const data = chartData.datasets[0].data;
        const first = data[0];
        const last = data[data.length - 1];
        return Math.round(last - first);
    };

    return (
        <div className="performance-chart">
            <div className="chart-header">
                <h3>📈 Performance Analytics</h3>
                <p>Track your progress over time</p>
            </div>

            <div className="chart-controls">
                <div className="time-range-selector">
                    <button
                        className={timeRange === 'last5' ? 'active' : ''}
                        onClick={() => setTimeRange('last5')}
                    >
                        Last 5 Exams
                    </button>
                    <button
                        className={timeRange === 'last10' ? 'active' : ''}
                        onClick={() => setTimeRange('last10')}
                    >
                        Last 10 Exams
                    </button>
                    <button
                        className={timeRange === 'month' ? 'active' : ''}
                        onClick={() => setTimeRange('month')}
                    >
                        Last Month
                    </button>
                </div>
            </div>

            <div className="chart-container">
                {chartData && chartData.datasets[0].data.length > 0 ? (
                    <Bar options={options} data={chartData} />
                ) : (
                    <div className="no-data">
                        <p>📊 No exam data available yet.</p>
                        <p>Take some exams to see your performance chart!</p>
                    </div>
                )}
            </div>

            {chartData && chartData.datasets[0].data.length > 0 && (
                <div className="chart-stats">
                    <div className="stat-card">
                        <h4>{getAverageScore()}%</h4>
                        <p>Average Score</p>
                    </div>
                    <div className="stat-card">
                        <h4 className={getImprovement() >= 0 ? 'positive' : 'negative'}>
                            {getImprovement() >= 0 ? '+' : ''}{getImprovement()}%
                        </h4>
                        <p>Improvement</p>
                    </div>
                    <div className="stat-card">
                        <h4>{chartData.datasets[0].data.length}</h4>
                        <p>Exams Taken</p>
                    </div>
                </div>
            )}

            <div className="chart-tips">
                <h4>💡 Performance Tips:</h4>
                <ul>
                    <li>Take regular mock tests to track progress</li>
                    <li>Focus on weak areas identified in the chart</li>
                    <li>Maintain consistency in study hours</li>
                    <li>Analyze mistakes to avoid repetition</li>
                </ul>
            </div>
        </div>
    );
};

export default PerformanceChart;
