import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import exams from '../data/exams';
import './Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <header className="header">
            <nav className="navbar">
                <div className="nav-container">
                    <div className="logo">
                        <h2>OJAS JEE CLASSES </h2>
                        <span>Quality Education</span>
                    </div>
                    <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                        <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
                        <li><a href="#about" onClick={() => setIsMenuOpen(false)}>About</a></li>
                        <li><a href="#courses" onClick={() => setIsMenuOpen(false)}>Courses</a></li>
                        <li><a href="#faculty" onClick={() => setIsMenuOpen(false)}>Faculty</a></li>
                        <li><Link to="/premium" onClick={() => setIsMenuOpen(false)}>Premium</Link></li>
                        <li><Link to="/forum" onClick={() => setIsMenuOpen(false)}>Forum</Link></li>
                        <li><Link to="/gamification" onClick={() => setIsMenuOpen(false)}>Achievements</Link></li>
                        <li><Link to="/social-challenges" onClick={() => setIsMenuOpen(false)}>Challenges</Link></li>
                        <li><Link to="/blog" onClick={() => setIsMenuOpen(false)}>Blog</Link></li>
                        <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
                    </ul>
                    <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <ul className="exam-menu">
                    {exams.map(exam => (
                        <li key={exam.id}><Link to={`/exam/${exam.id}`}>{exam.name}</Link></li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
