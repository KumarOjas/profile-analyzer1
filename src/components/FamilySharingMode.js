import React, { useState, useEffect } from 'react';
import './FamilySharingMode.css';

const FamilySharingMode = () => {
    const [familyMembers, setFamilyMembers] = useState([]);
    const [currentMember, setCurrentMember] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newMember, setNewMember] = useState({ name: '', relation: '', avatar: '👨‍👩‍👧‍👦' });

    useEffect(() => {
        loadFamilyMembers();
    }, []);

    const loadFamilyMembers = () => {
        const saved = JSON.parse(localStorage.getItem('familyMembers') || '[]');
        if (saved.length === 0) {
            // Add default member "Me"
            const defaultMember = {
                id: 1,
                name: 'Me',
                relation: 'Self',
                avatar: '👤',
                progress: {
                    examsTaken: 0,
                    averageScore: 0,
                    studyStreak: 0,
                    totalQuestions: 0
                }
            };
            setFamilyMembers([defaultMember]);
            setCurrentMember(defaultMember);
            localStorage.setItem('familyMembers', JSON.stringify([defaultMember]));
        } else {
            setFamilyMembers(saved);
            const current = saved.find(m => m.id === parseInt(localStorage.getItem('currentMemberId') || '1'));
            setCurrentMember(current || saved[0]);
        }
    };

    const switchMember = (member) => {
        setCurrentMember(member);
        localStorage.setItem('currentMemberId', member.id.toString());

        // Load member's progress
        const memberKey = `member_${member.id}_progress`;
        const progress = JSON.parse(localStorage.getItem(memberKey) || '{}');

        // Update global progress keys temporarily
        localStorage.setItem('examsTaken', progress.examsTaken || '0');
        localStorage.setItem('averageScore', progress.averageScore || '0');
        localStorage.setItem('studyStreak', progress.studyStreak || '0');
        localStorage.setItem('totalQuestionsAnswered', progress.totalQuestions || '0');
    };

    const addMember = () => {
        if (!newMember.name.trim()) return;

        const member = {
            id: Date.now(),
            name: newMember.name,
            relation: newMember.relation,
            avatar: newMember.avatar,
            progress: {
                examsTaken: 0,
                averageScore: 0,
                studyStreak: 0,
                totalQuestions: 0
            }
        };

        const updatedMembers = [...familyMembers, member];
        setFamilyMembers(updatedMembers);
        localStorage.setItem('familyMembers', JSON.stringify(updatedMembers));

        setNewMember({ name: '', relation: '', avatar: '👨‍👩‍👧‍👦' });
        setShowAddForm(false);
    };

    const removeMember = (id) => {
        if (familyMembers.length <= 1) return; // Keep at least one member

        const updatedMembers = familyMembers.filter(m => m.id !== id);
        setFamilyMembers(updatedMembers);
        localStorage.setItem('familyMembers', JSON.stringify(updatedMembers));

        if (currentMember.id === id) {
            switchMember(updatedMembers[0]);
        }
    };

    const avatars = ['👤', '👨‍🎓', '👩‍🎓', '👨‍👩‍👧‍👦', '👨‍👩‍👧', '👨‍👩‍👦', '👨‍👨‍👧‍👦', '👩‍👩‍👧‍👦', '👨‍💼', '👩‍💼'];

    return (
        <div className="family-sharing">
            <div className="family-header">
                <h3>👨‍👩‍👧‍👦 Family Sharing Mode</h3>
                <p>Track progress for multiple family members</p>
            </div>

            <div className="current-member">
                <h4>Current User: {currentMember?.name}</h4>
                <p>Relation: {currentMember?.relation}</p>
            </div>

            <div className="family-members">
                <h4>Family Members:</h4>
                <div className="members-grid">
                    {familyMembers.map((member) => (
                        <div
                            key={member.id}
                            className={`member-card ${currentMember?.id === member.id ? 'active' : ''}`}
                            onClick={() => switchMember(member)}
                        >
                            <div className="member-avatar">{member.avatar}</div>
                            <div className="member-info">
                                <h5>{member.name}</h5>
                                <p>{member.relation}</p>
                            </div>
                            <div className="member-stats">
                                <small>Exams: {member.progress.examsTaken}</small>
                                <small>Streak: {member.progress.studyStreak}</small>
                            </div>
                            {familyMembers.length > 1 && (
                                <button
                                    className="remove-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeMember(member.id);
                                    }}
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    ))}

                    <div className="add-member-card" onClick={() => setShowAddForm(true)}>
                        <div className="add-icon">+</div>
                        <p>Add Member</p>
                    </div>
                </div>
            </div>

            {showAddForm && (
                <div className="add-member-form">
                    <h4>Add Family Member</h4>
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            value={newMember.name}
                            onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                            placeholder="Enter name"
                        />
                    </div>
                    <div className="form-group">
                        <label>Relation:</label>
                        <select
                            value={newMember.relation}
                            onChange={(e) => setNewMember({...newMember, relation: e.target.value})}
                        >
                            <option value="">Select relation</option>
                            <option value="Parent">Parent</option>
                            <option value="Sibling">Sibling</option>
                            <option value="Child">Child</option>
                            <option value="Spouse">Spouse</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Avatar:</label>
                        <div className="avatar-selector">
                            {avatars.map((avatar) => (
                                <span
                                    key={avatar}
                                    className={`avatar-option ${newMember.avatar === avatar ? 'selected' : ''}`}
                                    onClick={() => setNewMember({...newMember, avatar})}
                                >
                                    {avatar}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="form-actions">
                        <button onClick={addMember}>Add Member</button>
                        <button onClick={() => setShowAddForm(false)}>Cancel</button>
                    </div>
                </div>
            )}

            <div className="family-tips">
                <h4>💡 Family Study Tips:</h4>
                <ul>
                    <li>Create a dedicated study space for each member</li>
                    <li>Set family study goals and celebrate achievements together</li>
                    <li>Share study techniques and learn from each other</li>
                    <li>Maintain a healthy study-life balance for everyone</li>
                </ul>
            </div>
        </div>
    );
};

export default FamilySharingMode;
