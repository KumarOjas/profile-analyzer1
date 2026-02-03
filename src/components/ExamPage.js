import React from 'react';
import { useParams, Link } from 'react-router-dom';
import exams from '../data/exams';
import './ExamPage.css';

const ExamPage = () => {
    const { examId } = useParams();
    const exam = exams.find(e => e.id === examId);

    if (!exam) {
        return (
            <div className="exam-page">
                <div className="exam-header">
                    <h1>Exam Not Found</h1>
                    <p>The exam you're looking for doesn't exist.</p>
                    <Link to="/" className="official-link">Back to Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="exam-page">
            <div className="exam-header">
                <div className="exam-icon">{exam.icon}</div>
                <h1>{exam.name}</h1>
            </div>

            <div className="exam-content">
                <div className="exam-section">
                    <h2>Description</h2>
                    <p>{exam.description}</p>
                </div>

                <div className="exam-section">
                    <h2>Eligibility Criteria</h2>
                    <p>{exam.eligibility}</p>
                </div>

                <div className="exam-section">
                    <h2>Syllabus</h2>
                    <ul>
                        {exam.syllabus.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div className="exam-section">
                    <h2>Exam Dates</h2>
                    <p>{exam.examDates}</p>
                </div>

                <div className="exam-section">
                    <h2>Application Fee</h2>
                    <p>{exam.applicationFee}</p>
                </div>

                <div className="exam-section">
                    <h2>Official Website</h2>
                    <a href={exam.officialWebsite} target="_blank" rel="noopener noreferrer" className="official-link">
                        Visit Official Website
                    </a>
                </div>

                {exam.pwFeatures && (
                    <div className="exam-section">
                        <h2>PW-Style Resources</h2>
                        <ul>
                            {exam.pwFeatures.map((feature, index) => (
                                <li key={index}>
                                    <a href={feature.link} target="_blank" rel="noopener noreferrer" className="official-link">
                                        {feature.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <Link to="/" className="official-link">Back to Home</Link>
            </div>
        </div>
    );
};

export default ExamPage;
