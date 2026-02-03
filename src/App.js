
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Courses from './components/Courses';
import Faculty from './components/Faculty';
import Contact from './components/Contact';
import ExamPage from './components/ExamPage';
import Premium from './components/Premium';
import Forum from './components/Forum';
import Gamification from './components/Gamification';
import Blog from './components/Blog';
import Mentor from './components/Mentor';
import CareerMap from './components/CareerMap';
import AIExamStrategy from './components/AIExamStrategy';
import DigitalDoubtMarket from './components/DigitalDoubtMarket';
import LiveRankPrediction from './components/LiveRankPrediction';
import ReferralSystem from './components/ReferralSystem';
import SocialChallenges from './components/SocialChallenges';

import DostBatch from './components/DostBatch';
import OfflineExamBox from './components/OfflineExamBox';
import MicroCredentials from './components/MicroCredentials';
import StreakCounter from './components/StreakCounter';
import DarkModeToggle from './components/DarkModeToggle';
import MotivationalQuotes from './components/MotivationalQuotes';
import PomodoroTimer from './components/PomodoroTimer';
import ShareableProgressCard from './components/ShareableProgressCard';

import PerformanceChart from './components/PerformanceChart';
import SimpleLeaderboard from './components/SimpleLeaderboard';
import ExamDayChecklist from './components/ExamDayChecklist';
import FamilySharingMode from './components/FamilySharingMode';
import SaveQuestionForLater from './components/SaveQuestionForLater';
import QuestionOfTheDay from './components/QuestionOfTheDay';
import WeakTopicReminder from './components/WeakTopicReminder';
import './App.css';
const App = () => {
    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={
                        <>
                            <Hero />
                            <StreakCounter />
                            <DarkModeToggle />
                            <MotivationalQuotes />
                            <PomodoroTimer />
                            <ShareableProgressCard />

                            <PerformanceChart />
                            <SimpleLeaderboard />
                            <ExamDayChecklist />
                            <FamilySharingMode />
                            <SaveQuestionForLater />
                            <WeakTopicReminder />
                            <About />
                            <Courses />
                            <Faculty />
                            <Contact />
                        </>
                    } />
                    <Route path="/exam/:examId" element={<ExamPage />} />
                    <Route path="/premium" element={<Premium />} />
                    <Route path="/forum" element={<Forum />} />
                    <Route path="/gamification" element={<Gamification />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/mentor" element={<Mentor />} />
                    <Route path="/career-map" element={<CareerMap />} />
                    <Route path="/ai-strategy" element={<AIExamStrategy />} />
                    <Route path="/doubt-market" element={<DigitalDoubtMarket />} />
                    <Route path="/rank-prediction" element={<LiveRankPrediction />} />
                    <Route path="/referral" element={<ReferralSystem />} />
                    <Route path="/social-challenges" element={<SocialChallenges />} />
                    <Route path="/dost-batch" element={<DostBatch />} />
                    <Route path="/offline-exam-box" element={<OfflineExamBox />} />
                    <Route path="/micro-credentials" element={<MicroCredentials />} />
                    <Route path="/streak-counter" element={<StreakCounter />} />
                    <Route path="/dark-mode" element={<DarkModeToggle />} />
                    <Route path="/motivational-quotes" element={<MotivationalQuotes />} />
                    <Route path="/pomodoro-timer" element={<PomodoroTimer />} />
                    <Route path="/progress-card" element={<ShareableProgressCard />} />

                    <Route path="/performance-chart" element={<PerformanceChart />} />
                    <Route path="/leaderboard" element={<SimpleLeaderboard />} />
                    <Route path="/exam-checklist" element={<ExamDayChecklist />} />
                    <Route path="/family-sharing" element={<FamilySharingMode />} />
                    <Route path="/question-of-the-day" element={<QuestionOfTheDay />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
