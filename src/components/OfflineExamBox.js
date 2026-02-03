import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { ref, onValue, set } from 'firebase/database';
import exams from '../data/exams';
import './OfflineExamBox.css';

const OfflineExamBox = () => {
  const [availableExams, setAvailableExams] = useState([]);
  const [downloadedExams, setDownloadedExams] = useState([]);
  const [currentExam, setCurrentExam] = useState(null);
  const [examAnswers, setExamAnswers] = useState({});
  const [examResults, setExamResults] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  // const [familyMembers, setFamilyMembers] = useState([]); // unused for now

  // Sample questions for demonstration (replace with real data later)
  const sampleQuestions = [
    {
      id: '1',
      question: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: '4',
    },
    {
      id: '2',
      question: 'What is the square root of 16?',
      options: ['2', '4', '6', '8'],
      correctAnswer: '4',
    },
    {
      id: '3',
      question: 'What is 10 divided by 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: '5',
    },
  ];

  useEffect(() => {
    // Set available exams from exams.js
    setAvailableExams(exams.slice(0, 5)); // Take first 5 exams for demo

    // Load downloaded exams from localStorage
    const savedExams = localStorage.getItem('downloadedExams');
    if (savedExams) {
      setDownloadedExams(JSON.parse(savedExams));
    }

    // Load exam results from localStorage
    const savedResults = localStorage.getItem('examResults');
    if (savedResults) {
      setExamResults(JSON.parse(savedResults));
    }

    // Get current user
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    // Monitor online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      unsubscribe();
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const downloadExam = (exam) => {
    const examWithQuestions = {
      ...exam,
      questions: sampleQuestions, // In real implementation → fetch real questions
      downloadedAt: new Date().toISOString(),
      score: null,
    };

    const updatedDownloaded = [...downloadedExams, examWithQuestions];
    setDownloadedExams(updatedDownloaded);
    localStorage.setItem('downloadedExams', JSON.stringify(updatedDownloaded));
  };

  const startExam = (exam) => {
    setCurrentExam(exam);
    setExamAnswers({});
  };

  const submitExam = () => {
    if (!currentExam) return;

    let score = 0;
    currentExam.questions.forEach((question) => {
      if (examAnswers[question.id] === question.correctAnswer) {
        score++;
      }
    });

    const result = {
      examId: currentExam.id,
      examName: currentExam.name,
      score,
      totalQuestions: currentExam.questions.length,
      percentage: Math.round((score / currentExam.questions.length) * 100),
      completedAt: new Date().toISOString(),
      userId: currentUser?.uid || 'anonymous',
    };

    // Update local results
    const updatedResults = [...examResults, result];
    setExamResults(updatedResults);
    localStorage.setItem('examResults', JSON.stringify(updatedResults));

    // Update downloaded exam score
    const updatedDownloaded = downloadedExams.map((exam) =>
      exam.id === currentExam.id ? { ...exam, score } : exam
    );
    setDownloadedExams(updatedDownloaded);
    localStorage.setItem('downloadedExams', JSON.stringify(updatedDownloaded));

    // Sync to Firebase if online
    if (isOnline && currentUser) {
      syncResults([result]);
    }

    setCurrentExam(null);
  };

  const syncResults = async (results) => {
    if (!currentUser) return;

    try {
      const resultsRef = ref(db, `examResults/${currentUser.uid}`);
      const snapshot = await new Promise((resolve) => {
        onValue(resultsRef, resolve, { onlyOnce: true });
      });
      const existingResults = snapshot.val() || [];

      const updatedResults = [...existingResults, ...results];
      await set(resultsRef, updatedResults);
    } catch (error) {
      console.error('Error syncing results:', error);
    }
  };

  const shareWithFamily = (exam) => {
    const shareText = `📚 Check out this exam: ${exam.name} on OJAS JEE Classes! Practice together! ${window.location.origin}/offline-exam-box`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
  };

  const isExamDownloaded = (examId) => {
    return downloadedExams.some((exam) => exam.id === examId);
  };

  return (
    <div className="offline-exam-box">
      <div className="exam-box-header">
        <h1>📦 Offline Exam in a Box</h1>
        <p>Download exams, practice offline, and share with your family!</p>
        {!isOnline && (
          <div className="offline-indicator">
            🔴 You are currently offline. Results will sync when back online.
          </div>
        )}
      </div>

      {/* Available Exams */}
      <div className="available-exams-section">
        <h2>📚 Available Exams</h2>
        <div className="exams-grid">
          {availableExams.map((exam) => (
            <div key={exam.id} className="exam-card">
              <div className="exam-header">
                <span className="exam-icon">{exam.icon}</span>
                <h3>{exam.name}</h3>
              </div>
              <p className="exam-description">{exam.description}</p>
              <div className="exam-details">
                <span>📅 {exam.examDates}</span>
                <span>💰 {exam.applicationFee}</span>
              </div>
              <button
                className="download-btn"
                onClick={() => downloadExam(exam)}
                disabled={isExamDownloaded(exam.id)}
              >
                {isExamDownloaded(exam.id) ? '✅ Downloaded' : '⬇️ Download for Offline'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Downloaded Exams */}
      <div className="downloaded-exams-section">
        <h2>📁 Downloaded Exams</h2>
        <div className="downloaded-exams-list">
          {downloadedExams.map((exam) => (
            <div key={exam.id} className="downloaded-exam-card">
              <div className="exam-info">
                <h3>{exam.name}</h3>
                <p>Downloaded: {new Date(exam.downloadedAt).toLocaleDateString()}</p>
                {exam.score !== null && (
                  <span className="exam-score">
                    Score: {exam.score}/{exam.questions.length} (
                    {Math.round((exam.score / exam.questions.length) * 100)}%)
                  </span>
                )}
              </div>
              <div className="exam-actions">
                <button className="start-exam-btn" onClick={() => startExam(exam)}>
                  {exam.score !== null ? '🔄 Retake Exam' : '▶️ Start Exam'}
                </button>
                <button className="share-family-btn" onClick={() => shareWithFamily(exam)}>
                  👨‍👩‍👧‍👦 Share with Family
                </button>
              </div>
            </div>
          ))}
          {downloadedExams.length === 0 && (
            <p style={{ textAlign: 'center', color: '#666' }}>
              No exams downloaded yet. Download some exams above to get started!
            </p>
          )}
        </div>
      </div>

      {/* Exam Interface */}
      {currentExam && (
        <div className="exam-interface">
          <div className="exam-header">
            <h2>{currentExam.name}</h2>
            <button className="close-exam-btn" onClick={() => setCurrentExam(null)}>
              ✕
            </button>
          </div>

          <div className="questions-container">
            {currentExam.questions.map((question, index) => (
              <div key={question.id} className="question-card">
                <h3>
                  Question {index + 1}: {question.question}
                </h3>
                <div className="options">
                  {question.options.map((option, optionIndex) => (
                    <label
                      key={`${question.id}-${optionIndex}`}
                      className="option"
                    >
                      <input
                        type="radio"
                        name={question.id}
                        value={option}
                        checked={examAnswers[question.id] === option}
                        onChange={(e) =>
                          setExamAnswers((prev) => ({
                            ...prev,
                            [question.id]: e.target.value,
                          }))
                        }
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="exam-footer">
            <button
              className="submit-exam-btn"
              onClick={submitExam}
              disabled={Object.keys(examAnswers).length !== currentExam.questions.length}
            >
              Submit Exam
            </button>
          </div>
        </div>
      )}

      {/* Results Section */}
      <div className="results-section">
        <h2>📊 Your Results</h2>
        <div className="results-list">
          {examResults.map((result, index) => (
            <div key={index} className="result-card">
              <h3>{result.examName}</h3>
              <div className="result-details">
                <span>
                  Score: {result.score}/{result.totalQuestions}
                </span>
                <span>Percentage: {result.percentage}%</span>
                <span>Completed: {new Date(result.completedAt).toLocaleString()}</span>
              </div>
            </div>
          ))}
          {examResults.length === 0 && (
            <p style={{ textAlign: 'center', color: '#666' }}>
              No results yet. Take some exams to see your progress!
            </p>
          )}
        </div>

        {examResults.length > 0 && !isOnline && (
          <button
            className="sync-results-btn"
            onClick={() => syncResults(examResults)}
            disabled={!isOnline}
          >
            🔄 Sync Results to Cloud
          </button>
        )}
      </div>
    </div>
  );
};

export default OfflineExamBox;