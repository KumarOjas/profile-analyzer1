import { ref, onValue, push, set, update } from 'firebase/database';
import { db } from '../firebase';

export const initializeAchievements = () => {
    const achievementsRef = ref(db, 'achievements');
    onValue(achievementsRef, (snapshot) => {
        const data = snapshot.val();
        if (!data) {
            // Initialize with sample achievements if none exist
            const sampleAchievements = [
                {
                    id: 'first_test',
                    title: 'First Test Taken',
                    description: 'Complete your first mock test',
                    icon: '🎯',
                    points: 10,
                    unlocked: false
                },
                {
                    id: 'perfect_score',
                    title: 'Perfect Score',
                    description: 'Score 100% in any test',
                    icon: '⭐',
                    points: 50,
                    unlocked: false
                },
                {
                    id: 'streak_7',
                    title: 'Week Warrior',
                    description: 'Maintain a 7-day study streak',
                    icon: '🔥',
                    points: 25,
                    unlocked: false
                }
            ];

            sampleAchievements.forEach(achievement => {
                const newAchievementRef = push(achievementsRef);
                set(newAchievementRef, achievement);
            });
        }
    });
};

export const getUserAchievements = (userId, callback) => {
    const userAchievementsRef = ref(db, `userAchievements/${userId}`);
    onValue(userAchievementsRef, (snapshot) => {
        const data = snapshot.val();
        callback(data || {});
    });
};

export const unlockAchievement = (userId, achievementId) => {
    const userAchievementRef = ref(db, `userAchievements/${userId}/${achievementId}`);
    update(userAchievementRef, {
        unlocked: true,
        unlockedAt: new Date().toISOString()
    });
};

export const getLeaderboardData = (callback) => {
    const leaderboardRef = ref(db, 'leaderboard');
    onValue(leaderboardRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            const leaderboardArray = Object.entries(data)
                .map(([userId, userData]) => ({
                    userId,
                    ...userData
                }))
                .sort((a, b) => b.totalScore - a.totalScore)
                .slice(0, 50); // Top 50 users
            callback(leaderboardArray);
        } else {
            callback([]);
        }
    });
};

export const updateUserScore = (userId, userName, score, testType) => {
    const userRef = ref(db, `leaderboard/${userId}`);
    const updates = {};
    updates[`leaderboard/${userId}`] = {
        userName: userName,
        totalScore: score,
        lastTestDate: new Date().toISOString(),
        testType: testType,
        testsTaken: 1 // This would be incremented in real implementation
    };
    update(ref(db), updates);
};
