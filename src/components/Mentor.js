import React from 'react';
import './Mentor.css';

const Mentor = () => {
    const mentors = [
        {
            id: 1,
            name: 'Dr. Rajesh Kumar',
            role: 'UPSC Mentor',
            experience: '15+ years',
            successRate: '95%',
            image: 'https://via.placeholder.com/300x300?text=Dr.+Rajesh+Kumar',
            specialization: 'Civil Services Preparation',
            achievements: ['500+ successful candidates', 'AIR 1 in 2018', 'Author of 5 best-selling books']
        },
        {
            id: 2,
            name: 'Prof. Priya Sharma',
            role: 'JEE Advanced Mentor',
            experience: '12+ years',
            successRate: '92%',
            image: 'https://via.placeholder.com/300x300?text=Prof.+Priya+Sharma',
            specialization: 'Engineering Entrance Exams',
            achievements: ['1000+ IIT admissions', 'IIT Delhi Alumni', 'Physics Olympiad Coach']
        },
        {
            id: 3,
            name: 'Dr. Amit Singh',
            role: 'NEET Mentor',
            experience: '10+ years',
            successRate: '88%',
            image: 'https://via.placeholder.com/300x300?text=Dr.+Amit+Singh',
            specialization: 'Medical Entrance Exams',
            achievements: ['800+ medical admissions', 'AIIMS Faculty', 'Research publications in NEJM']
        },
        {
            id: 4,
            name: 'CA Vikram Mehta',
            role: 'Banking Exams Mentor',
            experience: '8+ years',
            successRate: '90%',
            image: 'https://via.placeholder.com/300x300?text=CA+Vikram+Mehta',
            specialization: 'Banking & Finance Exams',
            achievements: ['600+ banking job placements', 'Former SBI PO', 'Financial Analyst Certification']
        }
    ];

    const pastSuccessStories = [
        {
            id: 1,
            name: 'Ananya Gupta',
            exam: 'UPSC Civil Services',
            rank: 'AIR 5',
            year: '2023',
            mentor: 'Dr. Rajesh Kumar',
            story: 'From a small town to IAS officer - my journey with OJAS mentors was transformative.',
            image: 'https://via.placeholder.com/200x200?text=Ananya+Gupta'
        },
        {
            id: 2,
            name: 'Rahul Verma',
            exam: 'JEE Advanced',
            rank: 'AIR 15',
            year: '2023',
            mentor: 'Prof. Priya Sharma',
            story: 'OJAS mentorship helped me secure admission to IIT Bombay. The personalized guidance was exceptional.',
            image: 'https://via.placeholder.com/200x200?text=Rahul+Verma'
        },
        {
            id: 3,
            name: 'Sneha Patel',
            exam: 'NEET',
            rank: 'AIR 50',
            year: '2023',
            mentor: 'Dr. Amit Singh',
            story: 'Thanks to OJAS mentors, I fulfilled my dream of becoming a doctor at AIIMS Delhi.',
            image: 'https://via.placeholder.com/200x200?text=Sneha+Patel'
        }
    ];

    return (
        <div className="mentor">
            <div className="mentor-header">
                <h1>Our Expert Mentors</h1>
                <p>Learn from the best - experienced mentors who have guided thousands to success</p>
            </div>

            <div className="mentors-grid">
                {mentors.map(mentor => (
                    <div key={mentor.id} className="mentor-card">
                        <div className="mentor-image">
                            <img src={mentor.image} alt={mentor.name} />
                        </div>
                        <div className="mentor-info">
                            <h3>{mentor.name}</h3>
                            <p className="mentor-role">{mentor.role}</p>
                            <p className="mentor-exp">Experience: {mentor.experience}</p>
                            <p className="mentor-success">Success Rate: {mentor.successRate}</p>
                            <p className="mentor-spec">{mentor.specialization}</p>
                            <div className="mentor-achievements">
                                <h4>Achievements:</h4>
                                <ul>
                                    {mentor.achievements.map((achievement, index) => (
                                        <li key={index}>{achievement}</li>
                                    ))}
                                </ul>
                            </div>
                            <button className="book-session-btn">Book a Session</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="success-stories">
                <h2>Success Stories from Our Past Students</h2>
                <div className="stories-grid">
                    {pastSuccessStories.map(story => (
                        <div key={story.id} className="story-card">
                            <div className="story-image">
                                <img src={story.image} alt={story.name} />
                            </div>
                            <div className="story-content">
                                <h3>{story.name}</h3>
                                <p className="story-exam">{story.exam} - {story.rank} ({story.year})</p>
                                <p className="story-mentor">Mentored by: {story.mentor}</p>
                                <p className="story-text">"{story.story}"</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mentorship-program">
                <h2>Our Mentorship Program</h2>
                <div className="program-features">
                    <div className="feature">
                        <h3>Personalized Guidance</h3>
                        <p>One-on-one sessions tailored to your needs and learning style.</p>
                    </div>
                    <div className="feature">
                        <h3>Regular Progress Tracking</h3>
                        <p>Weekly assessments and feedback to ensure continuous improvement.</p>
                    </div>
                    <div className="feature">
                        <h3>Doubt Clearing Sessions</h3>
                        <p>Instant clarification of concepts through live interactive sessions.</p>
                    </div>
                    <div className="feature">
                        <h3>Study Plan Customization</h3>
                        <p>Custom study schedules designed based on your strengths and weaknesses.</p>
                    </div>
                </div>
                <div className="program-cta">
                    <h3>Ready to Accelerate Your Success?</h3>
                    <p>Join our mentorship program and get expert guidance from top mentors.</p>
                    <button className="enroll-btn">Enroll Now</button>
                </div>
            </div>
        </div>
    );
};

export default Mentor;
