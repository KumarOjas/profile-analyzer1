import React, { useState, useEffect } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        class: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [inquiries, setInquiries] = useState([]);

    useEffect(() => {
        // Load previous inquiries from localStorage
        const savedInquiries = JSON.parse(localStorage.getItem('contactInquiries') || '[]');
        setInquiries(savedInquiries);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage('');

        try {
            // Validate form
            if (!formData.name || !formData.email || !formData.message) {
                throw new Error('Please fill in all required fields');
            }

            // Create inquiry object
            const inquiry = {
                id: Date.now(),
                ...formData,
                timestamp: new Date().toISOString(),
                status: 'pending'
            };

            // Save to localStorage
            const updatedInquiries = [inquiry, ...inquiries];
            localStorage.setItem('contactInquiries', JSON.stringify(updatedInquiries));
            setInquiries(updatedInquiries);

            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                class: '',
                message: ''
            });

            setSubmitMessage('Thank you! Your message has been sent successfully. We will get back to you within 24 hours.');

            // Clear success message after 5 seconds
            setTimeout(() => setSubmitMessage(''), 5000);

        } catch (error) {
            setSubmitMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getTotalInquiries = () => inquiries.length;
    const getPendingInquiries = () => inquiries.filter(i => i.status === 'pending').length;
    const getTodayInquiries = () => {
        const today = new Date().toDateString();
        return inquiries.filter(i => new Date(i.timestamp).toDateString() === today).length;
    };

    return (
        <section id="contact" className="contact">
            <div className="container">
                <h2>Contact Us</h2>
                <div className="contact-content">
                    <div className="contact-info">
                        <h3>Get in Touch</h3>
                        <p><i className="fas fa-clock"></i> Mon-Sun: 11:00 AM - 8:00 PM</p>
                       

                        <div className="contact-stats">
                            <div className="stat">
                                <span className="stat-number">{getTotalInquiries()}</span>
                                <span className="stat-label">Total Inquiries</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">{getPendingInquiries()}</span>
                                <span className="stat-label">Pending</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">{getTodayInquiries()}</span>
                                <span className="stat-label">Today</span>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name *"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email *"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Your Phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                            <select
                                name="class"
                                value={formData.class}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Class</option>
                                <option value="nursery">Nursery/KG</option>
                                <option value="1-5">Class 1-5</option>
                                <option value="6-8">Class 6-8</option>
                                <option value="9-10">Class 9-10</option>
                                <option value="11-12">Class 11-12</option>
                                <option value="jee">JEE Preparation</option>
                                <option value="neet">NEET Preparation</option>
                                <option value="other">Other</option>
                            </select>
                            <textarea
                                name="message"
                                placeholder="Your Message *"
                                rows="5"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                            ></textarea>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>

                        {submitMessage && (
                            <div className={`submit-message ${submitMessage.includes('Thank you') ? 'success' : 'error'}`}>
                                {submitMessage}
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Inquiries Section (for admin view) */}
                {inquiries.length > 0 && (
                    <div className="recent-inquiries">
                        <h3>Recent Inquiries</h3>
                        <div className="inquiries-list">
                            {inquiries.slice(0, 5).map((inquiry) => (
                                <div key={inquiry.id} className="inquiry-item">
                                    <div className="inquiry-header">
                                        <span className="inquiry-name">{inquiry.name}</span>
                                        <span className="inquiry-class">{inquiry.class}</span>
                                        <span className="inquiry-status">{inquiry.status}</span>
                                    </div>
                                    <p className="inquiry-message">{inquiry.message.substring(0, 100)}...</p>
                                    <small className="inquiry-time">
                                        {new Date(inquiry.timestamp).toLocaleString()}
                                    </small>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Contact;
