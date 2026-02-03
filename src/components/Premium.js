import React, { useState } from 'react';
import './Premium.css';

const Premium = () => {
    const [selectedPlan] = useState(null);

    const plans = [
        {
            id: 'basic',
            name: 'Basic',
            price: 499,
            features: ['Access to PW Video Lectures', 'Study Materials', 'Basic Test Series']
        },
        {
            id: 'pro',
            name: 'Pro',
            price: 999,
            features: ['All Basic features', 'Advanced Mock Tests', 'Personalized Coaching', 'Doubt Clearing Sessions']
        },
        {
            id: 'premium',
            name: 'Premium',
            price: 1499,
            features: ['All Pro features', 'One-on-One Mentoring', 'Exclusive Study Groups', 'Career Guidance']
        }
    ];

    const handleSubscribe = (planId) => {
        // Integrate with payment gateway (e.g., Razorpay, Stripe)
        alert(`Subscribing to ${planId} plan. Payment integration needed.`);
    };

    return (
        <div className="premium">
            <h1>Unlock Premium Features</h1>
            <p>Get access to exclusive content and personalized coaching to ace your exams.</p>

            <div className="plans-grid">
                {plans.map(plan => (
                    <div key={plan.id} className={`plan-card ${selectedPlan === plan.id ? 'selected' : ''}`}>
                        <h2>{plan.name}</h2>
                        <p className="price">₹{plan.price}/month</p>
                        <ul>
                            {plan.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                        <button onClick={() => handleSubscribe(plan.id)}>Subscribe Now</button>
                    </div>
                ))}
            </div>

            <div className="benefits">
                <h2>Why Go Premium?</h2>
                <ul>
                    <li>Expert-curated study materials</li>
                    <li>Live doubt-clearing sessions</li>
                    <li>Performance analytics and insights</li>
                    <li>Priority support</li>
                </ul>
            </div>
        </div>
    );
};

export default Premium;
