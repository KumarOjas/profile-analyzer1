import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { ref, onValue, push, set } from 'firebase/database';
import './DostBatch.css';

const DostBatch = () => {
    const [audioList, setAudioList] = useState([]);
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [videoList, setVideoList] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    const [quizAnswers, setQuizAnswers] = useState({});
    const [quizScore, setQuizScore] = useState(0);
    const [showQuizResults, setShowQuizResults] = useState(false);

    // Sample data for demonstration
    const sampleAudio = [
        {
            id: '1',
            title: 'Daily Current Affairs - March 15, 2024',
            url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Placeholder URL
            duration: '15:30',
            description: 'Latest updates on national and international news.'
        }
    ];

    const sampleQuiz = [
        {
            id: '1',
            question: 'What is the capital of India?',
            options: ['Delhi', 'Mumbai', 'Kolkata', 'Chennai'],
            correctAnswer: 'Delhi'
        },
        {
            id: '2',
            question: 'Who is the current Prime Minister of India?',
            options: ['Narendra Modi', 'Rahul Gandhi', 'Amit Shah', 'Sonia Gandhi'],
            correctAnswer: 'Narendra Modi'
        }
    ];

    const sampleVideos = [
        {
            id: '1',
            title: 'Topper Strategy: How to Crack JEE in 6 Months',
            url: 'https://www.w3schools.com/html/mov_bbb.mp4', // Placeholder URL
            thumbnail: 'https://via.placeholder.com/300x200?text=Topper+Video',
            description: 'Learn from the top scorer\'s preparation strategy.'
        }
    ];

    useEffect(() => {
        // Initialize sample data in Firebase if not exists
        const audioRef = ref(db, 'dostBatch/audio');
        onValue(audioRef, (snapshot) => {
            const data = snapshot.val();
            if (!data) {
                sampleAudio.forEach(audio => {
                    const newAudioRef = push(audioRef);
                    set(newAudioRef, audio);
                });
                setAudioList(sampleAudio);
            } else {
                const audioArray = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value
                }));
                setAudioList(audioArray);
            }
        });

        const quizRef = ref(db, 'dostBatch/quiz');
        onValue(quizRef, (snapshot) => {
            const data = snapshot.val();
            if (!data) {
                sampleQuiz.forEach(question => {
                    const newQuizRef = push(quizRef);
                    set(newQuizRef, question);
                });
                setQuizQuestions(sampleQuiz);
            } else {
                const quizArray = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value
                }));
                setQuizQuestions(quizArray);
            }
        });

        const videoRef = ref(db, 'dostBatch/videos');
        onValue(videoRef, (snapshot) => {
            const data = snapshot.val();
            if (!data) {
                sampleVideos.forEach(video => {
                    const newVideoRef = push(videoRef);
                    set(newVideoRef, video);
                });
                setVideoList(sampleVideos);
            } else {
                const videoArray = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value
                }));
                setVideoList(videoArray);
            }
        });

        // Get current user
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });

        return () => unsubscribe();
    }, []);

    const handleQuizSubmit = () => {
        let score = 0;
        quizQuestions.forEach(question => {
            if (quizAnswers[question.id] === question.correctAnswer) {
                score++;
            }
        });
        setQuizScore(score);
        setShowQuizResults(true);
    };

    const shareOnWhatsApp = (type, item) => {
        let shareText = '';
        let shareUrl = window.location.origin + '/dost-batch';

        switch (type) {
            case 'audio':
                shareText = `🎧 Listen to today's current affairs audio: ${item.title} on OJAS JEE Classes! ${shareUrl}`;
                break;
            case 'quiz':
                shareText = `🧠 Test your knowledge with this quiz: ${item.question} on OJAS JEE Classes! ${shareUrl}`;
                break;
            case 'video':
                shareText = `🎥 Watch this topper video: ${item.title} on OJAS JEE Classes! ${shareUrl}`;
                break;
            default:
                shareText = `Check out the latest on OJAS Dost Batch! ${shareUrl}`;
        }

        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="dost-batch">
            <div className="batch-header">
                <h1>📚 Dost Batch</h1>
                <p>Your daily dose of current affairs, quizzes, and topper insights!</p>
            </div>

            {/* Daily Audio Current Affairs */}
            <div className="audio-section">
                <h2>🎧 Daily Audio Current Affairs</h2>
                <div className="audio-list">
                    {audioList.map(audio => (
                        <div key={audio.id} className="audio-card">
                            <div className="audio-info">
                                <h3>{audio.title}</h3>
                                <p>{audio.description}</p>
                                <span className="duration">⏱️ {audio.duration}</span>
                            </div>
                            <div className="audio-controls">
                                <audio controls>
                                    <source src={audio.url} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </audio>
                                <button
                                    className="share-btn"
                                    onClick={() => shareOnWhatsApp('audio', audio)}
                                >
                                    📤 Share on WhatsApp
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* WhatsApp Quiz */}
            <div className="quiz-section">
                <h2>🧠 WhatsApp Quiz</h2>
                {!showQuizResults ? (
                    <div className="quiz-questions">
                        {quizQuestions.map(question => (
                            <div key={question.id} className="quiz-question">
                                <h3>{question.question}</h3>
                                <div className="quiz-options">
                                    {question.options.map(option => (
                                        <label key={option} className="quiz-option">
                                            <input
                                                type="radio"
                                                name={question.id}
                                                value={option}
                                                onChange={(e) => setQuizAnswers({
                                                    ...quizAnswers,
                                                    [question.id]: e.target.value
                                                })}
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <button className="submit-quiz-btn" onClick={handleQuizSubmit}>
                            Submit Quiz
                        </button>
                    </div>
                ) : (
                    <div className="quiz-results">
                        <h3>Quiz Results</h3>
                        <p>You scored {quizScore} out of {quizQuestions.length}!</p>
                        <button
                            className="share-results-btn"
                            onClick={() => shareOnWhatsApp('quiz', { question: 'Quiz Results' })}
                        >
                            📤 Share Results on WhatsApp
                        </button>
                        <button
                            className="retake-quiz-btn"
                            onClick={() => {
                                setQuizAnswers({});
                                setShowQuizResults(false);
                                setQuizScore(0);
                            }}
                        >
                            Retake Quiz
                        </button>
                    </div>
                )}
            </div>

            {/* Topper Short Videos */}
            <div className="video-section">
                <h2>🎥 Topper Short Videos</h2>
                <div className="video-list">
                    {videoList.map(video => (
                        <div key={video.id} className="video-card">
                            <div className="video-info">
                                <h3>{video.title}</h3>
                                <p>{video.description}</p>
                            </div>
                            <div className="video-player">
                                <video controls poster={video.thumbnail}>
                                    <source src={video.url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <button
                                className="share-btn"
                                onClick={() => shareOnWhatsApp('video', video)}
                            >
                                📤 Share on WhatsApp
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DostBatch;
