import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { ref, onValue, push, set, update } from 'firebase/database';
import './MicroCredentials.css';

const MicroCredentials = () => {
    const [credentials, setCredentials] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newCredential, setNewCredential] = useState({
        title: '',
        description: '',
        skills: [],
        issuer: 'OJAS JEE Classes',
        type: 'achievement',
        expiryDate: ''
    });
    const [selectedCredential, setSelectedCredential] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });

        loadCredentials();

        return () => unsubscribe();
    }, []);

    const loadCredentials = () => {
        const credentialsRef = ref(db, 'credentials');
        onValue(credentialsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const credentialsArray = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value
                }));
                setCredentials(credentialsArray);
            }
        });
    };

    const createCredential = async () => {
        if (!currentUser) return;

        const credentialData = {
            ...newCredential,
            userId: currentUser.uid,
            userName: currentUser.displayName || currentUser.email,
            issuedDate: new Date().toISOString(),
            blockchainHash: generateBlockchainHash(), // Mock blockchain hash
            verificationUrl: `https://verify.ojasjee.com/${Date.now()}`,
            status: 'active'
        };

        try {
            const credentialsRef = ref(db, 'credentials');
            const newCredentialRef = push(credentialsRef);
            await set(newCredentialRef, credentialData);

            // Also add to user's credentials
            const userCredentialsRef = ref(db, `userCredentials/${currentUser.uid}`);
            const userCredentialRef = push(userCredentialsRef);
            await set(userCredentialRef, {
                credentialId: newCredentialRef.key,
                issuedDate: credentialData.issuedDate
            });

            setNewCredential({
                title: '',
                description: '',
                skills: [],
                issuer: 'OJAS JEE Classes',
                type: 'achievement',
                expiryDate: ''
            });
            setShowCreateForm(false);
        } catch (error) {
            console.error('Error creating credential:', error);
        }
    };

    const generateBlockchainHash = () => {
        // Mock blockchain hash generation
        return '0x' + Math.random().toString(16).substr(2, 64);
    };

    const shareCredential = (credential) => {
        const shareText = `🚀 I earned a new micro-credential: ${credential.title} from ${credential.issuer}! #OJASCredentials #JEESuccess`;
        const shareUrl = credential.verificationUrl;

        if (navigator.share) {
            navigator.share({
                title: credential.title,
                text: shareText,
                url: shareUrl
            });
        } else {
            const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
            window.open(linkedinUrl, '_blank');
        }
    };

    const verifyCredential = (credential) => {
        // In real implementation, verify against blockchain
        alert(`Credential verified! Blockchain hash: ${credential.blockchainHash}`);
    };

    return (
        <div className="micro-credentials">
            <div className="credentials-header">
                <h1>🎖️ AI-Generated Micro-Credentials</h1>
                <p>Earn and share blockchain-verified credentials for your achievements!</p>
            </div>

            {currentUser && (
                <div className="credentials-actions">
                    <button
                        className="create-credential-btn"
                        onClick={() => setShowCreateForm(!showCreateForm)}
                    >
                        + Create New Credential
                    </button>
                </div>
            )}

            {/* Create Credential Form */}
            {showCreateForm && currentUser && (
                <div className="create-credential-form">
                    <h3>Create New Micro-Credential</h3>
                    <input
                        type="text"
                        placeholder="Credential Title"
                        value={newCredential.title}
                        onChange={(e) => setNewCredential({...newCredential, title: e.target.value})}
                    />
                    <textarea
                        placeholder="Description"
                        value={newCredential.description}
                        onChange={(e) => setNewCredential({...newCredential, description: e.target.value})}
                    />
                    <div className="skills-input">
                        <label>Skills Demonstrated:</label>
                        <select
                            multiple
                            value={newCredential.skills}
                            onChange={(e) => setNewCredential({
                                ...newCredential,
                                skills: Array.from(e.target.selectedOptions, option => option.value)
                            })}
                        >
                            <option value="problem-solving">Problem Solving</option>
                            <option value="time-management">Time Management</option>
                            <option value="analytical-thinking">Analytical Thinking</option>
                            <option value="physics">Physics</option>
                            <option value="chemistry">Chemistry</option>
                            <option value="mathematics">Mathematics</option>
                        </select>
                    </div>
                    <select
                        value={newCredential.type}
                        onChange={(e) => setNewCredential({...newCredential, type: e.target.value})}
                    >
                        <option value="achievement">Achievement</option>
                        <option value="skill">Skill</option>
                        <option value="course">Course Completion</option>
                        <option value="certification">Certification</option>
                    </select>
                    <input
                        type="date"
                        placeholder="Expiry Date (optional)"
                        value={newCredential.expiryDate}
                        onChange={(e) => setNewCredential({...newCredential, expiryDate: e.target.value})}
                    />
                    <button className="submit-btn" onClick={createCredential}>
                        Generate Credential
                    </button>
                </div>
            )}

            {/* Credentials Gallery */}
            <div className="credentials-gallery">
                <h2>Your Micro-Credentials</h2>
                <div className="credentials-grid">
                    {credentials.filter(cred => cred.userId === currentUser?.uid).map(credential => (
                        <div key={credential.id} className="credential-card">
                            <div className="credential-header">
                                <h3>{credential.title}</h3>
                                <span className={`credential-type ${credential.type}`}>
                                    {credential.type.toUpperCase()}
                                </span>
                            </div>

                            <p className="credential-description">{credential.description}</p>

                            <div className="credential-details">
                                <div className="detail-item">
                                    <span className="label">Issuer:</span>
                                    <span className="value">{credential.issuer}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">Issued:</span>
                                    <span className="value">{new Date(credential.issuedDate).toLocaleDateString()}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">Skills:</span>
                                    <span className="value">{credential.skills.join(', ')}</span>
                                </div>
                            </div>

                            <div className="credential-verification">
                                <div className="blockchain-badge">
                                    <span className="blockchain-icon">🔗</span>
                                    <span>Blockchain Verified</span>
                                </div>
                                <button
                                    className="verify-btn"
                                    onClick={() => verifyCredential(credential)}
                                >
                                    Verify
                                </button>
                            </div>

                            <div className="credential-actions">
                                <button
                                    className="share-btn"
                                    onClick={() => shareCredential(credential)}
                                >
                                    📤 Share on LinkedIn
                                </button>
                                <button
                                    className="view-btn"
                                    onClick={() => setSelectedCredential(credential)}
                                >
                                    👁️ View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Credential Detail Modal */}
            {selectedCredential && (
                <div className="credential-modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{selectedCredential.title}</h2>
                            <button
                                className="close-btn"
                                onClick={() => setSelectedCredential(null)}
                            >
                                ✕
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="credential-preview">
                                <div className="preview-header">
                                    <h3>{selectedCredential.title}</h3>
                                    <p>Issued by {selectedCredential.issuer}</p>
                                </div>

                                <div className="preview-details">
                                    <p><strong>Description:</strong> {selectedCredential.description}</p>
                                    <p><strong>Skills:</strong> {selectedCredential.skills.join(', ')}</p>
                                    <p><strong>Issued Date:</strong> {new Date(selectedCredential.issuedDate).toLocaleDateString()}</p>
                                    {selectedCredential.expiryDate && (
                                        <p><strong>Expiry Date:</strong> {new Date(selectedCredential.expiryDate).toLocaleDateString()}</p>
                                    )}
                                </div>

                                <div className="blockchain-verification">
                                    <h4>🔗 Blockchain Verification</h4>
                                    <p><strong>Hash:</strong> {selectedCredential.blockchainHash}</p>
                                    <p><strong>Verification URL:</strong> <a href={selectedCredential.verificationUrl} target="_blank" rel="noopener noreferrer">{selectedCredential.verificationUrl}</a></p>
                                </div>

                                <div className="job-suggestions">
                                    <h4>💼 Suggested Job Applications</h4>
                                    <ul>
                                        <li>Research Assistant - Physics</li>
                                        <li>Data Analyst Intern</li>
                                        <li>Teaching Assistant</li>
                                        <li>Lab Technician</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="modal-actions">
                                <button
                                    className="share-btn"
                                    onClick={() => shareCredential(selectedCredential)}
                                >
                                    Share on LinkedIn
                                </button>
                                <button
                                    className="download-btn"
                                    onClick={() => alert('Download feature would be implemented here')}
                                >
                                    Download PDF
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MicroCredentials;
