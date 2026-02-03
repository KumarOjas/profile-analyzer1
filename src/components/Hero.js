import React from 'react';
import { Link } from 'react-router-dom';
import exams from '../data/exams';
import './Hero.css';

const Hero = () => {
  const governmentExams = exams;

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Welcome to OJAS Jee Classes</h1>
        <p>From School to GATE, CAT, UPSC & Government Jobs</p>
      </div>

      <h2 className="section-title">📚 All Government Exams</h2>

      <div className="exams-grid">
        {governmentExams.map(exam => (
          <Link key={exam.id} to={`/exam/${exam.id}`} className="exam-card">
            <span className="exam-icon">{exam.icon}</span>
            <span className="exam-name">{exam.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Hero;