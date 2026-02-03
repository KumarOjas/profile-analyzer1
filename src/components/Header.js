import React from 'react';
import { Link } from 'react-router-dom';
import exams from '../data/exams';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <nav className="navbar">
                <div className="nav-container">
                    <div className="logo">
                        <h2>OJAS JEE CLASSES </h2>
                        <span>Quality Education</span>
                    </div>
                    <ul className="nav-menu">
                        <li><Link to="/">Home</Link></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#courses">Courses</a></li>
                        <li><a href="#faculty">Faculty</a></li>
                        <li><Link to="/premium">Premium</Link></li>
                        <li><Link to="/forum">Forum</Link></li>
                        <li><Link to="/gamification">Achievements</Link></li>
                        <li><Link to="/social-challenges">Challenges</Link></li>
                        <li><Link to="/blog">Blog</Link></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                    <div className="hamburger">
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
