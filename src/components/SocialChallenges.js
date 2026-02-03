import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { ref, onValue, push, set, update } from 'firebase/database';
import './SocialChallenges.css';

const SocialChallenges = () => {
    const [challenges, setChallenges] = useState([]);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [leaderboard] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [showCreateTeam, setShowCreateTeam] = useState(false);
    const [newTeam, setNewTeam] = useState({
        name: '',
        description: '',
        maxMembers: 5,
        challengeId: ''
    });

    // Sample challenges data
    const sampleChallenges = [
        {
            id: '1',
            title: 'OJAS Clerk Speed Challenge',
            description: 'Solve 50 quantitative aptitude questions in 30 minutes',
            type: 'speed',
            duration: 30, // minutes
            questions: 50,
            subject: 'quantitative',
            reward: '₹500 Amazon Voucher',
            participants: 1250,
            startTime: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
            endTime: new Date(Date.now() + 7200000).toISOString(), // 2 hours from now
            difficulty: 'medium'
        },
        {
            id: '2',
            title: 'JEE Main Formula Marathon',
            description: 'Recall and apply 100+ important formulas across Physics, Chemistry, Math',
            type: 'memory',
            duration: 45,
            questions: 100,
            subject: 'formulas',
            reward: 'Free JEE Test Series',
            participants: 890,
            startTime: new Date(Date.now() + 7200000).toISOString(), // 2 hours from now
            endTime: new Date(Date.now() + 10800000).toISOString(), // 3 hours from now
            difficulty: 'hard'
        },
        {
            id: '3',
            title: 'SSC Reasoning Puzzle Party',
            description: 'Team up to solve complex reasoning puzzles and logic problems',
            type: 'team',
            duration: 60,
            questions: 25,
            subject: 'reasoning',
            reward: 'SSC Study Material Package',
            participants: 2100,
            startTime: new Date(Date.now() + 1800000).toISOString(), // 30 min from now
            endTime: new Date(Date.now() + 5400000).toISOString(), // 1.5 hours from now
            difficulty: 'easy'
        }
    ];

    useEffect(() => {
        // Set sample challenges if none exist in Firebase
        const challengesRef = ref(db, 'challenges');
        onValue(challengesRef, (snapshot) => {
            const data = snapshot.val();
            if (!data) {
                // Initialize with sample challenges
                sampleChallenges.forEach(challenge => {
                    const newChallengeRef = push(challengesRef);
                    set(newChallengeRef, challenge);
                });
                setChallenges(sampleChallenges);
            } else {
                const challengesArray = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value
                }));
                setChallenges(challengesArray);
            }
        });

        // Get current user
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });

        return () => unsubscribe();
    }, []);

    const createTeam = async () => {
        if (!currentUser || !newTeam.name.trim()) return;

        const teamData = {
            ...newTeam,
            leader: currentUser.uid,
            leaderName: currentUser.displayName || currentUser.email,
            members: [currentUser.uid],
            memberNames: [currentUser.displayName || currentUser.email],
            createdAt: new Date().toISOString(),
            score: 0,
            status: 'active'
        };

        try {
            const teamsRef = ref(db, 'teams');
            const newTeamRef = push(teamsRef);
            await set(newTeamRef, teamData);
            setNewTeam({ name: '', description: '', maxMembers: 5, challengeId: '' });
            setShowCreateTeam(false);
        } catch (error) {
            console.error('Error creating team:', error);
        }
    };



    const shareChallenge = (challenge) => {
        const shareText = `🚀 Join the ${challenge.title} challenge on OJAS JEE Classes! ${challenge.reward} up for grabs! #OJASChallenge #JEESuccess`;
        const shareUrl = `${window.location.origin}/challenges/${challenge.id}`;

        if (navigator.share) {
            navigator.share({
                title: challenge.title,
                text: shareText,
                url: shareUrl
            });
        } else {
            // Fallback for browsers without Web Share API
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
            window.open(whatsappUrl, '_blank');
        }
    };

    return (
        <div className="social-challenges">
            <div className="challenges-header">
                <h1>🚀 Social Learning Challenges</h1>
                <p>Join teams, compete, and win amazing rewards while learning together!</p>
            </div>

            {/* Active Challenges */}
            <div className="challenges-section">
                <h2>Active Challenges</h2>
                <div className="challenges-grid">
                    {challenges.map(challenge => (
                        <div key={challenge.id} className="challenge-card">
                            <div className="challenge-header">
                                <h3>{challenge.title}</h3>
                                <span className={`difficulty ${challenge.difficulty}`}>
                                    {challenge.difficulty.toUpperCase()}
                                </span>
                            </div>

                            <p className="challenge-description">{challenge.description}</p>

                            <div className="challenge-details">
                                <div className="detail-item">
                                    <span className="icon">⏱️</span>
                                    <span>{challenge.duration} min</span>
                                </div>
                                <div className="detail-item">
                                    <span className="icon">📚</span>
                                    <span>{challenge.questions} questions</span>
                                </div>
                                <div className="detail-item">
                                    <span className="icon">👥</span>
                                    <span>{challenge.participants} joined</span>
                                </div>
                            </div>

                            <div className="challenge-reward">
                                <span className="reward-icon">🎁</span>
                                <span className="reward-text">{challenge.reward}</span>
                            </div>

                            <div className="challenge-actions">
                                <button
                                    className="join-challenge-btn"
                                    onClick={() => setActiveChallenge(challenge)}
                                >
                                    Join Challenge
                                </button>
                                <button
                                    className="share-challenge-btn"
                                    onClick={() => shareChallenge(challenge)}
                                >
                                    📤 Share
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Team Creation */}
            {currentUser && (
                <div className="team-section">
                    <div className="team-header">
                        <h2>🏆 Create or Join Teams</h2>
                        <button
                            className="create-team-btn"
                            onClick={() => setShowCreateTeam(!showCreateTeam)}
                        >
                            {showCreateTeam ? 'Cancel' : '+ Create Team'}
                        </button>
                    </div>

                    {showCreateTeam && (
                        <div className="create-team-form">
                            <h3>Create New Team</h3>
                            <input
                                type="text"
                                placeholder="Team Name"
                                value={newTeam.name}
                                onChange={(e) => setNewTeam({...newTeam, name: e.target.value})}
                            />
                            <textarea
                                placeholder="Team Description"
                                value={newTeam.description}
                                onChange={(e) => setNewTeam({...newTeam, description: e.target.value})}
                            />
                            <select
                                value={newTeam.challengeId}
                                onChange={(e) => setNewTeam({...newTeam, challengeId: e.target.value})}
                            >
                                <option value="">Select Challenge</option>
                                {challenges.map(challenge => (
                                    <option key={challenge.id} value={challenge.id}>
                                        {challenge.title}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="number"
                                placeholder="Max Members"
                                min="2"
                                max="10"
                                value={newTeam.maxMembers}
                                onChange={(e) => setNewTeam({...newTeam, maxMembers: parseInt(e.target.value)})}
                            />
                            <button className="submit-btn" onClick={createTeam}>
                                Create Team
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Leaderboard */}
            <div className="leaderboard-section">
                <h2>🏅 Challenge Leaderboard</h2>
                <div className="leaderboard">
                    <div className="leaderboard-header">
                        <span>Rank</span>
                        <span>Team/Player</span>
                        <span>Score</span>
                        <span>Reward</span>
                    </div>
                    {leaderboard.length > 0 ? (
                        leaderboard.map((entry, index) => (
                            <div key={entry.userId || index} className="leaderboard-row">
                                <span className={`rank ${index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : ''}`}>
                                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '#'} {index + 1}
                                </span>
                                <span>{entry.userName || entry.name || 'Anonymous'}</span>
                                <span>{entry.totalScore || entry.score || 0} pts</span>
                                <span>
                                    {index === 0 ? '₹1000 Voucher' :
                                     index === 1 ? '₹750 Voucher' :
                                     index === 2 ? '₹500 Voucher' : 'Participation Badge'}
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="no-leaderboard-data">
                            <p>No leaderboard data available yet. Join challenges to start competing!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Challenge Details Modal */}
            {activeChallenge && (
                <div className="challenge-modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{activeChallenge.title}</h2>
                            <button
                                className="close-btn"
                                onClick={() => setActiveChallenge(null)}
                            >
                                ✕
                            </button>
                        </div>

                        <div className="modal-body">
                            <p>{activeChallenge.description}</p>

                            <div className="challenge-stats">
                                <div className="stat">
                                    <span className="stat-label">Duration:</span>
                                    <span className="stat-value">{activeChallenge.duration} minutes</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-label">Questions:</span>
                                    <span className="stat-value">{activeChallenge.questions}</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-label">Participants:</span>
                                    <span className="stat-value">{activeChallenge.participants}</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-label">Reward:</span>
                                    <span className="stat-value">{activeChallenge.reward}</span>
                                </div>
                            </div>

                            <div className="challenge-timer">
                                <h3>⏰ Challenge Starts In:</h3>
                                <div className="countdown">
                                    {/* Countdown timer would be implemented here */}
                                    <span>Starts soon!</span>
                                </div>
                            </div>

                            <div className="modal-actions">
                                <button className="join-btn">Join Challenge</button>
                                <button
                                    className="share-btn"
                                    onClick={() => shareChallenge(activeChallenge)}
                                >
                                    Share with Friends
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SocialChallenges;
