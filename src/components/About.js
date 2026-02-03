import React from 'react';
import './About.css';

const About = () => {
    return (
        <section id="about" className="about">
            <div className="container">
                <h2>Why Choose OJAS JEE CLASSES?</h2>
                <div className="about-grid">
                    <div className="about-card">
                        <i className="fas fa-graduation-cap"></i>
                        <h3>Expert Faculty</h3>
                        <p>Highly qualified and experienced teachers dedicated to student success</p>
                    </div>
                    <div className="about-card">
                        <i className="fas fa-book"></i>
                        <h3>Comprehensive Curriculum</h3>
                        <p>Well-structured syllabus covering all boards and competitive exams</p>
                    </div>
                    <div className="about-card">
                        <i className="fas fa-chart-line"></i>
                        <h3>Proven Results</h3>
                        <p>Consistent track record of excellent academic performance</p>
                    </div>
                    <div className="about-card">
                        <i className="fas fa-users"></i>
                        <h3>Personal Attention</h3>
                        <p>Small batch sizes ensuring individual attention to every student</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
