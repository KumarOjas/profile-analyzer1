import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { ref, push, set, onValue } from 'firebase/database';
import './CareerMap.css';

const CareerMap = () => {
    const [formData, setFormData] = useState({
        age: '',
        qualification: '',
        category: '',
        state: '',
        interests: ''
    });

    const [results, setResults] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [simulations, setSimulations] = useState([]);
    const [activeSimulation, setActiveSimulation] = useState(null);
    const [simulationStep, setSimulationStep] = useState(0);
    const [userChoices, setUserChoices] = useState([]);
    const [aiInsights, setAiInsights] = useState(null);
    const [isPremium, setIsPremium] = useState(false);

    // Sample career simulations
    const careerSimulations = [
        {
            id: 'upsc-ias',
            title: 'IAS Officer Career Journey',
            description: 'Experience the path to becoming an Indian Administrative Service officer',
            difficulty: 'Expert',
            duration: '5-7 years',
            scenarios: [
                {
                    step: 1,
                    situation: 'You are a fresh graduate with a degree in Political Science. You have 2 years to prepare for UPSC Prelims.',
                    choices: [
                        { text: 'Focus only on NCERT books and standard reference materials', outcome: 'score', points: 15, feedback: 'Good foundation, but need current affairs practice' },
                        { text: 'Join a coaching institute and study 8-10 hours daily', outcome: 'score', points: 25, feedback: 'Structured preparation with mentorship' },
                        { text: 'Self-study with online resources and mock tests', outcome: 'score', points: 20, feedback: 'Cost-effective but requires strong self-discipline' }
                    ]
                },
                {
                    step: 2,
                    situation: 'You cleared Prelims! Now you have 4 months for Mains preparation.',
                    choices: [
                        { text: 'Take 2-3 mock tests per week and focus on answer writing', outcome: 'score', points: 30, feedback: 'Excellent strategy for Mains success' },
                        { text: 'Cram all subjects equally without focused practice', outcome: 'score', points: 15, feedback: 'Need more practice and time management' },
                        { text: 'Focus only on General Studies, neglect optional subject', outcome: 'score', points: 10, feedback: 'Optional subject is crucial for ranking' }
                    ]
                },
                {
                    step: 3,
                    situation: 'Mains cleared! Interview round. The board asks about current affairs.',
                    choices: [
                        { text: 'Give detailed, analytical answers with examples', outcome: 'score', points: 35, feedback: 'Perfect! Shows depth of knowledge' },
                        { text: 'Give generic answers without specific examples', outcome: 'score', points: 20, feedback: 'Need more specific and analytical responses' },
                        { text: 'Panic and give incomplete answers', outcome: 'score', points: 5, feedback: 'Practice mock interviews more' }
                    ]
                }
            ],
            outcomes: {
                high: { title: 'AIR 50 - District Magistrate', salary: '₹1,50,000/month', posting: 'Prime district posting' },
                medium: { title: 'AIR 200 - Deputy Collector', salary: '₹1,00,000/month', posting: 'District level posting' },
                low: { title: 'AIR 500 - Assistant Collector', salary: '₹80,000/month', posting: 'Sub-district posting' }
            }
        },
        {
            id: 'ssc-cgl',
            title: 'SSC CGL Officer Journey',
            description: 'Navigate the path to becoming a Central Government Officer',
            difficulty: 'Intermediate',
            duration: '1-2 years',
            scenarios: [
                {
                    step: 1,
                    situation: 'You are preparing for Tier 1. Focus on quantitative aptitude.',
                    choices: [
                        { text: 'Practice 50 questions daily with time limits', outcome: 'score', points: 25, feedback: 'Speed and accuracy are key' },
                        { text: 'Study theory without practice', outcome: 'score', points: 10, feedback: 'Need regular practice sessions' },
                        { text: 'Use shortcuts and formulas extensively', outcome: 'score', points: 20, feedback: 'Good, but understand concepts too' }
                    ]
                }
            ],
            outcomes: {
                high: { title: 'Assistant Commissioner', salary: '₹50,000/month', posting: 'Delhi posting' },
                medium: { title: 'Inspector (Income Tax)', salary: '₹45,000/month', posting: 'Metro city' },
                low: { title: 'Junior Statistical Officer', salary: '₹35,000/month', posting: 'State capital' }
            }
        }
    ];

    // Authentication and data fetching
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });

        return () => unsubscribe();
    }, []);

    // Load user's saved simulations
    useEffect(() => {
        if (currentUser) {
            const userSimulationsRef = ref(db, `userSimulations/${currentUser.uid}`);
            onValue(userSimulationsRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setSimulations(Object.values(data));
                }
            });
        }
    }, [currentUser]);

    const startSimulation = (simulationId) => {
        const simulation = careerSimulations.find(sim => sim.id === simulationId);
        setActiveSimulation(simulation);
        setSimulationStep(0);
        setUserChoices([]);
        setAiInsights(null);
    };

    const makeChoice = (choiceIndex) => {
        const currentScenario = activeSimulation.scenarios[simulationStep];
        const choice = currentScenario.choices[choiceIndex];

        const newChoices = [...userChoices, {
            step: simulationStep + 1,
            choice: choice.text,
            points: choice.points,
            feedback: choice.feedback
        }];

        setUserChoices(newChoices);

        if (simulationStep < activeSimulation.scenarios.length - 1) {
            setSimulationStep(simulationStep + 1);

            // Generate AI insights based on choice
            generateAiInsights(choice, simulationStep + 1);
        } else {
            // Simulation complete - calculate final outcome
            const totalPoints = newChoices.reduce((sum, choice) => sum + choice.points, 0);
            const averagePoints = totalPoints / newChoices.length;

            let outcome;
            if (averagePoints >= 25) outcome = activeSimulation.outcomes.high;
            else if (averagePoints >= 15) outcome = activeSimulation.outcomes.medium;
            else outcome = activeSimulation.outcomes.low;

            setAiInsights({
                totalScore: totalPoints,
                averageScore: averagePoints,
                finalOutcome: outcome,
                recommendations: generateRecommendations(averagePoints, activeSimulation.id)
            });
        }
    };

    const generateAiInsights = (choice, step) => {
        // Simulate AI insights based on user choice
        const insights = {
            strength: choice.points >= 20 ? 'Excellent decision making!' : 'Good choice, but could be better',
            improvement: choice.points < 20 ? 'Consider more structured preparation' : 'Keep up the good work!',
            nextSteps: `Step ${step + 1} will test your ${step === 0 ? 'consistency' : step === 1 ? 'depth of knowledge' : 'interview skills'}`
        };
        setAiInsights(insights);
    };

    const generateRecommendations = (score, simulationId) => {
        const recommendations = [];

        if (simulationId === 'upsc-ias') {
            if (score >= 25) {
                recommendations.push('Consider joining a reputed coaching institute for mentorship');
                recommendations.push('Focus on current affairs and answer writing practice');
                recommendations.push('Take regular mock interviews');
            } else if (score >= 15) {
                recommendations.push('Strengthen your optional subject preparation');
                recommendations.push('Improve answer writing skills');
                recommendations.push('Join study groups for peer learning');
            } else {
                recommendations.push('Start with NCERT books for basic concepts');
                recommendations.push('Build strong foundation in all subjects');
                recommendations.push('Practice previous year questions regularly');
            }
        }

        return recommendations;
    };

    const saveSimulation = async () => {
        if (!currentUser || !activeSimulation) return;

        const simulationData = {
            simulationId: activeSimulation.id,
            title: activeSimulation.title,
            completedAt: new Date().toISOString(),
            totalScore: aiInsights.totalScore,
            choices: userChoices,
            finalOutcome: aiInsights.finalOutcome
        };

        try {
            const userSimulationsRef = ref(db, `userSimulations/${currentUser.uid}`);
            const newSimulationRef = push(userSimulationsRef);
            await set(newSimulationRef, simulationData);
            alert('Simulation saved successfully!');
        } catch (error) {
            console.error('Error saving simulation:', error);
        }
    };

    const shareSimulation = () => {
        const shareText = `🚀 I just completed the ${activeSimulation.title} simulation on OJAS JEE Classes! Final outcome: ${aiInsights.finalOutcome.title} with ₹${aiInsights.finalOutcome.salary}/month salary! #OJASCareer #GovernmentJobs`;
        const shareUrl = `${window.location.origin}/career-map`;

        if (navigator.share) {
            navigator.share({
                title: `My ${activeSimulation.title} Results`,
                text: shareText,
                url: shareUrl
            });
        } else {
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
            window.open(whatsappUrl, '_blank');
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock data for demonstration
        setResults({
            eligibleExams: [
                { name: 'UPSC Civil Services', year: 2025, salary: '₹56,100 - ₹2,50,000', cutoff: 95, probability: '15%' },
                { name: 'SSC CGL', year: 2025, salary: '₹19,900 - ₹1,42,400', cutoff: 140, probability: '25%' },
                { name: 'IBPS PO', year: 2025, salary: '₹36,000 - ₹63,840', cutoff: 55, probability: '30%' },
                { name: 'Railway NTPC', year: 2025, salary: '₹19,900 - ₹1,12,000', cutoff: 85, probability: '35%' },
                { name: 'NDA', year: 2025, salary: '₹56,100 - ₹1,77,500', cutoff: 320, probability: '20%' }
            ],
            salaryGrowth: [30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000],
            postingTransfers: 'All India with preference for home state',
            promotionLadder: ['Junior Officer', 'Senior Officer', 'Manager', 'Director', 'Joint Director'],
            difficultyTrend: 'Increasing due to competition',
            timeToClear: '2-3 years average',
            cutoffTrend: [85, 90, 95, 100, 105, 110],
            competitionHeatmap: 'High in North India, Moderate in South'
        });
    };

    const handlePremiumUnlock = () => {
        setIsPremium(true);
    };

    return (
        <div className="career-map">
            <h1>Government Exam Career Map</h1>
            <form onSubmit={handleSubmit} className="career-form">
                <div className="form-group">
                    <label>Age:</label>
                    <input type="number" name="age" value={formData.age} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Qualification:</label>
                    <select name="qualification" value={formData.qualification} onChange={handleInputChange} required>
                        <option value="">Select</option>
                        <option value="10th">10th Pass</option>
                        <option value="12th">12th Pass</option>
                        <option value="graduate">Graduate</option>
                        <option value="postgraduate">Postgraduate</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Category:</label>
                    <select name="category" value={formData.category} onChange={handleInputChange} required>
                        <option value="">Select</option>
                        <option value="general">General</option>
                        <option value="obc">OBC</option>
                        <option value="sc">SC</option>
                        <option value="st">ST</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>State:</label>
                    <input type="text" name="state" value={formData.state} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Interests:</label>
                    <input type="text" name="interests" value={formData.interests} onChange={handleInputChange} placeholder="e.g., administration, banking, defense" required />
                </div>
                <button type="submit" className="submit-btn">Get Career Map</button>
            </form>

            {results && (
                <div className="results">
                    <h2>Your Career Map</h2>
                    <div className="eligible-exams">
                        <h3>Eligible Exams (2025-2035)</h3>
                        <ul>
                            {results.eligibleExams.map((exam, index) => (
                                <li key={index}>{exam.name} ({exam.year}) - Salary: {exam.salary}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="salary-growth">
                        <h3>Salary Growth Chart</h3>
                        <div className="chart-placeholder">Salary growth visualization would go here</div>
                    </div>
                    <div className="career-details">
                        <p><strong>Posting & Transfers:</strong> {results.postingTransfers}</p>
                        <p><strong>Promotion Ladder:</strong> {results.promotionLadder.join(' → ')}</p>
                        <p><strong>Difficulty & Cutoff Trend:</strong> {results.difficultyTrend}</p>
                        <p><strong>Time-to-Clear Probability:</strong> {results.timeToClear}</p>
                    </div>
                    <div className="premium-offer">
                        <h3>Unlock Full Career Map</h3>
                        <p>Get detailed analysis, personalized roadmap, and expert guidance.</p>
                        <button className="premium-btn">Unlock for ₹99-₹299</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CareerMap;
