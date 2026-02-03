import React from 'react';
import './Courses.css';

const Courses = () => {
    return (
        <section id="courses" className="courses">
            <div className="container">
                <h2>Our Courses</h2>
                <div className="courses-grid">
                    <div className="course-category">
                        <h3>Foundation Years (Nursery - Class 5)</h3>
                        <div className="course-list">
                            <div className="course-item">
                                <h4>Nursery & KG</h4>
                                <p>Fun learning activities, basic concepts</p>
                            </div>
                            <div className="course-item">
                                <h4>Class 1-2</h4>
                                <p>Building strong fundamentals</p>
                            </div>
                            <div className="course-item">
                                <h4>Class 3-5</h4>
                                <p>Concept development & skill building</p>
                            </div>
                        </div>
                    </div>
                    <div className="course-category">
                        <h3>Middle School (Class 6-8)</h3>
                        <div className="course-list">
                            <div className="course-item">
                                <h4>Mathematics</h4>
                                <p>Advanced concepts & problem solving</p>
                            </div>
                            <div className="course-item">
                                <h4>Science</h4>
                                <p>Physics, Chemistry, Biology fundamentals</p>
                            </div>
                            <div className="course-item">
                                <h4>English & Hindi</h4>
                                <p>Language skills development</p>
                            </div>
                        </div>
                    </div>
                    <div className="course-category">
                        <h3>High School (Class 9-12)</h3>
                        <div className="course-list">
                            <div className="course-item">
                                <h4>Class 9-10 (CBSE/ICSE)</h4>
                                <p>Board exam preparation</p>
                            </div>
                            <div className="course-item">
                                <h4>Class 11-12 (PCM)</h4>
                                <p>JEE Main & Advanced preparation</p>
                            </div>
                            <div className="course-item">
                                <h4>Class 11-12 (PCB)</h4>
                                <p>NEET & Medical entrance preparation</p>
                            </div>
                        </div>
                    </div>
                    <div className="course-category">
                        <h3>Special Programs</h3>
                        <div className="course-list">
                            <div className="course-item">
                                <h4>Olympiad Preparation</h4>
                                <p>NTSE, NSO, IMO, etc.</p>
                            </div>
                            <div className="course-item">
                                <h4>Crash Courses</h4>
                                <p>Quick revision programs</p>
                            </div>
                            <div className="course-item">
                                <h4>Doubt Sessions</h4>
                                <p>Personalized doubt clearing</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Courses;
