import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { ref, onValue, push, set, update } from 'firebase/database';
import './ReferralSystem.css';

const ReferralSystem = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [referralCode, setReferralCode] = useState('');
    const [referrals, setReferrals] = useState([]);
    const [rewards, setRewards] = useState([]);
    const [totalEarnings, setTotalEarnings] = useState(0);
    const [leaderboard, setLeaderboard] = useState([]);
    const [showRedeemModal, setShowRedeemModal] = useState(false);
    const [selectedReward, setSelectedReward] = useState(null);

    // Available rewards
    const availableRewards = [
        { id: '1', name: '₹500 Amazon Voucher', cost: 500, icon: '🎁', category: 'voucher' },
        { id: '2', name: 'SSC Test Series Access', cost: 300, icon: '📚', category: 'course' },
        { id: '3', name: '1-on-1 Mentorship Session', cost: 800, icon: '👨‍🏫', category: 'mentorship' },
        { id: '4', name: 'Premium Features (1 Month)', cost: 200, icon: '⭐', category: 'premium' },
        { id: '5', name: 'JEE Study Materials', cost: 400, icon: '📖', category: 'materials' },
        { id: '6', name: 'Exam Fee Reimbursement (₹1000)', cost: 1000, icon: '💰', category: 'reimbursement' }
    ];

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            if (user) {
                generateReferralCode(user);
                loadUserData(user.uid);
            }
        });

        loadLeaderboard();

        return () => unsubscribe();
    }, []);

    const generateReferralCode = (user) => {
        // Generate a unique referral code based on user ID
        const code = `OJAS${user.uid.substring(0, 6).toUpperCase()}`;
        setReferralCode(code);

        // Store referral code in database
        const userRef = ref(db, `users/${user.uid}`);
        update(userRef, { referralCode: code });
    };

    const loadUserData = (userId) => {
        // Load referrals
        const referralsRef = ref(db, `referrals/${userId}`);
        onValue(referralsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const referralsArray = Object.values(data);
                setReferrals(referralsArray);

                // Calculate total earnings
                const earnings = referralsArray.reduce((sum, referral) => sum + (referral.earnings || 0), 0);
                setTotalEarnings(earnings);
            }
        });

        // Load rewards history
        const rewardsRef = ref(db, `userRewards/${userId}`);
        onValue(rewardsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setRewards(Object.values(data));
            }
        });
    };

    const loadLeaderboard = () => {
        const leaderboardRef = ref(db, 'referralLeaderboard');
        onValue(leaderboardRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const sortedLeaderboard = Object.values(data)
                    .sort((a, b) => b.totalReferrals - a.totalReferrals)
                    .slice(0, 10);
                setLeaderboard(sortedLeaderboard);
            }
        });
    };

    const copyReferralCode = () => {
        navigator.clipboard.writeText(referralCode);
        alert('Referral code copied to clipboard!');
    };

    const shareReferralLink = () => {
        const referralLink = `${window.location.origin}/signup?ref=${referralCode}`;
        const shareText = `🚀 Join OJAS JEE Classes with my referral and get ₹200 off! Use code: ${referralCode}\n\n${referralLink}`;

        if (navigator.share) {
            navigator.share({
                title: 'Join OJAS JEE Classes',
                text: shareText,
                url: referralLink
            });
        } else {
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
            window.open(whatsappUrl, '_blank');
        }
    };

    const redeemReward = (reward) => {
        if (totalEarnings < reward.cost) {
            alert('Insufficient points!');
            return;
        }

        setSelectedReward(reward);
        setShowRedeemModal(true);
    };

    const confirmRedemption = async () => {
        if (!currentUser || !selectedReward) return;

        try {
            // Deduct points
            const newEarnings = totalEarnings - selectedReward.cost;

            // Add to rewards history
            const rewardsRef = ref(db, `userRewards/${currentUser.uid}`);
            const newRewardRef = push(rewardsRef);
            await set(newRewardRef, {
                rewardId: selectedReward.id,
                rewardName: selectedReward.name,
                cost: selectedReward.cost,
                redeemedAt: new Date().toISOString(),
                status: 'pending'
            });

            // Update user's earnings
            const userRef = ref(db, `users/${currentUser.uid}`);
            await update(userRef, { referralEarnings: newEarnings });

            setTotalEarnings(newEarnings);
            setShowRedeemModal(false);
            setSelectedReward(null);

            alert('Reward redeemed successfully! Our team will process it within 24 hours.');
        } catch (error) {
            console.error('Error redeeming reward:', error);
            alert('Error redeeming reward. Please try again.');
        }
    };

    const getReferralBonus = (level) => {
        switch (level) {
            case 1: return 200; // Direct referral
            case 2: return 100; // Second level
            case 3: return 50;  // Third level
            default: return 0;
        }
    };

    return (
        <div className="referral-system">
            <div className="referral-header">
                <h1>🎯 Referral & Rewards Program</h1>
                <p>Earn rewards by referring friends to OJAS JEE Classes!</p>
            </div>

            {/* Referral Code Section */}
            <div className="referral-code-section">
                <h2>Your Referral Code</h2>
                <div className="code-display">
                    <span className="code">{referralCode}</span>
                    <button className="copy-btn" onClick={copyReferralCode}>📋 Copy</button>
                </div>
                <div className="referral-actions">
                    <button className="share-btn" onClick={shareReferralLink}>
                        📤 Share Referral Link
                    </button>
                </div>
            </div>

            {/* Stats Dashboard */}
            <div className="stats-dashboard">
                <div className="stat-card">
                    <h3>{referrals.length}</h3>
                    <p>Total Referrals</p>
                </div>
                <div className="stat-card">
                    <h3>₹{totalEarnings}</h3>
                    <p>Total Earnings</p>
                </div>
                <div className="stat-card">
                    <h3>{referrals.filter(r => r.status === 'active').length}</h3>
                    <p>Active Referrals</p>
                </div>
                <div className="stat-card">
                    <h3>{rewards.length}</h3>
                    <p>Rewards Redeemed</p>
                </div>
            </div>

            {/* Referral History */}
            <div className="referral-history">
                <h2>📊 Your Referrals</h2>
                {referrals.length > 0 ? (
                    <div className="referrals-list">
                        {referrals.map((referral, index) => (
                            <div key={index} className="referral-item">
                                <div className="referral-info">
                                    <h4>{referral.name || 'Anonymous User'}</h4>
                                    <p>Joined: {new Date(referral.joinedAt).toLocaleDateString()}</p>
                                    <span className={`status ${referral.status}`}>
                                        {referral.status}
                                    </span>
                                </div>
                                <div className="referral-earnings">
                                    <span className="earnings">+₹{referral.earnings || 0}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-referrals">
                        <p>No referrals yet. Share your code to start earning!</p>
                    </div>
                )}
            </div>

            {/* Rewards Shop */}
            <div className="rewards-shop">
                <h2>🛍️ Rewards Shop</h2>
                <div className="rewards-grid">
                    {availableRewards.map(reward => (
                        <div key={reward.id} className="reward-card">
                            <div className="reward-icon">{reward.icon}</div>
                            <h3>{reward.name}</h3>
                            <p className="reward-cost">₹{reward.cost}</p>
                            <button
                                className={`redeem-btn ${totalEarnings >= reward.cost ? 'available' : 'disabled'}`}
                                onClick={() => redeemReward(reward)}
                                disabled={totalEarnings < reward.cost}
                            >
                                {totalEarnings >= reward.cost ? 'Redeem' : 'Not Enough Points'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Leaderboard */}
            <div className="leaderboard-section">
                <h2>🏆 Top Referrers</h2>
                <div className="leaderboard">
                    {leaderboard.map((user, index) => (
                        <div key={index} className="leaderboard-item">
                            <span className="rank">#{index + 1}</span>
                            <span className="name">{user.name || 'Anonymous'}</span>
                            <span className="referrals">{user.totalReferrals} referrals</span>
                            <span className="earnings">₹{user.totalEarnings}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Referral Program Info */}
            <div className="program-info">
                <h2>📋 How It Works</h2>
                <div className="info-grid">
                    <div className="info-card">
                        <h3>🎯 Step 1: Share Your Code</h3>
                        <p>Share your unique referral code with friends and family interested in government exams.</p>
                    </div>
                    <div className="info-card">
                        <h3>💰 Step 2: Earn Rewards</h3>
                        <p>Get ₹200 for each direct referral who signs up and ₹100/₹50 for second/third level referrals.</p>
                    </div>
                    <div className="info-card">
                        <h3>🎁 Step 3: Redeem Rewards</h3>
                        <p>Use your earnings to get vouchers, courses, mentorship sessions, and more!</p>
                    </div>
                </div>
            </div>

            {/* Redeem Modal */}
            {showRedeemModal && selectedReward && (
                <div className="redeem-modal">
                    <div className="modal-content">
                        <h2>Confirm Redemption</h2>
                        <div className="reward-details">
                            <div className="reward-icon">{selectedReward.icon}</div>
                            <h3>{selectedReward.name}</h3>
                            <p className="cost">Cost: ₹{selectedReward.cost}</p>
                            <p className="balance">Your Balance: ₹{totalEarnings}</p>
                        </div>
                        <div className="modal-actions">
                            <button className="confirm-btn" onClick={confirmRedemption}>
                                Confirm Redemption
                            </button>
                            <button className="cancel-btn" onClick={() => setShowRedeemModal(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReferralSystem;
