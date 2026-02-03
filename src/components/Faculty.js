import React from 'react';
import './Faculty.css';

const Faculty = () => {
    return (
        <section id="faculty" className="faculty">
            <div className="container">
                <h2>Our Expert Faculty</h2>
                <div className="faculty-grid">
                    <div className="faculty-card">
                        <img src="Ojas.jpeg" alt="Faculty Member" />
                        <h4>Kumar Ojas</h4>
                        <p>Expert in all subjects</p>
                        <p>Dedicated to student success with years of experience</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Faculty;
