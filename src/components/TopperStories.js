import React, { useState, useEffect } from 'react';
import './TopperStories.css';

const defaultStories = [
    {
        id: 1,
        name: 'Rahul Sharma',
        rank: 'AIR 45',
        photo: 'https://via.placeholder.com/120x120?text=Rahul',
        story: 'Started with just 60% in 11th, but consistent practice and OJAS study material helped me crack JEE Advanced. The key was daily problem-solving and understanding concepts deeply.',
        tips: [
            'Solve at least 50 problems daily',
            'Focus on understanding over memorization',
            'Take mock tests regularly',
            'Stay consistent with study hours'
        ]
    },
    {
        id: 2,
        name: 'Priya Singh',
        rank: 'AIR 78',
        photo: 'https://via.placeholder.com/120x120?text=Priya',
        story: 'As a girl from a small town, I faced many challenges. But OJAS online classes made quality education accessible. Self-discipline and smart study techniques got me here.',
        tips: [
            'Create a distraction-free study environment',
            'Take short breaks between study sessions',
            'Join study groups for motivation',
            'Believe in yourself always'
        ]
    },
    {
        id: 3,
        name: 'Amit Kumar',
        rank: 'AIR 123',
        photo: 'https://via.placeholder.com/120x120?text=Amit',
        story: 'Failed JEE once, but learned from mistakes. OJAS mentorship program helped me identify weak areas and improve systematically. Second attempt success!',
        tips: [
            'Analyze your mistakes thoroughly',
            'Seek help when stuck',
            'Maintain a positive mindset',
            'Learn from toppers but follow your strategy'
        ]
    },
    {
        id: 4,
        name: 'Sneha Patel',
        rank: 'AIR 156',
        photo: 'https://via.placeholder.com/120x120?text=Sneha',
        story: 'Balancing school and JEE prep was tough, but OJAS flexible schedule helped. Started late but caught up with intensive preparation and smart time management.',
        tips: [
            'Make a realistic study timetable',
            'Prioritize important topics',
            'Take care of health and sleep',
            'Practice previous year questions'
        ]
    }
];

const TopperStories = () => {
    const [stories, setStories] = useState(defaultStories);
    const [currentStory, setCurrentStory] = useState(0);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newStory, setNewStory] = useState({
        name: '',
        rank: '',
        story: '',
        tips: ['']
    });

    useEffect(() => {
        // Load user-added stories from localStorage
        const savedStories = JSON.parse(localStorage.getItem('userTopperStories') || '[]');
        setStories([...defaultStories, ...savedStories]);

        const timer = setInterval(() => {
            setCurrentStory((prev) => (prev + 1) % stories.length);
        }, 8000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentStory((prev) => (prev + 1) % stories.length);
        }, 8000);

        return () => clearInterval(timer);
    }, [stories.length]);

    const nextStory = () => {
        setCurrentStory((prev) => (prev + 1) % stories.length);
    };

    const prevStory = () => {
        setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length);
    };

    const goToStory = (index) => {
        setCurrentStory(index);
    };

    const addStory = () => {
        if (!newStory.name || !newStory.rank || !newStory.story) return;

        const story = {
            id: Date.now(),
            ...newStory,
            photo: `https://via.placeholder.com/120x120?text=${newStory.name.split(' ')[0]}`,
            tips: newStory.tips.filter(tip => tip.trim())
        };

        const updatedStories = [...stories, story];
        setStories(updatedStories);

        // Save to localStorage
        const userStories = JSON.parse(localStorage.getItem('userTopperStories') || '[]');
        userStories.push(story);
        localStorage.setItem('userTopperStories', JSON.stringify(userStories));

        setNewStory({
            name: '',
            rank: '',
            story: '',
            tips: ['']
        });
        setShowAddForm(false);
    };

    const addTip = () => {
        setNewStory({...newStory, tips: [...newStory.tips, '']});
    };

    const updateTip = (index, value) => {
        const updatedTips = [...newStory.tips];
        updatedTips[index] = value;
        setNewStory({...newStory, tips: updatedTips});
    };

    const current = stories[currentStory];

    return (
        <div className="topper-stories">
            <div className="stories-header">
                <h3>🏆 Topper Stories</h3>
                <p>Inspiring journeys of JEE success</p>
                <button className="add-story-btn" onClick={() => setShowAddForm(true)}>
                    ➕ Share Your Story
                </button>
            </div>

            {showAddForm && (
                <div className="add-story-form">
                    <h4>Add Your Success Story</h4>
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            value={newStory.name}
                            onChange={(e) => setNewStory({...newStory, name: e.target.value})}
                            placeholder="Your name"
                        />
                    </div>
                    <div className="form-group">
                        <label>Rank:</label>
                        <input
                            type="text"
                            value={newStory.rank}
                            onChange={(e) => setNewStory({...newStory, rank: e.target.value})}
                            placeholder="e.g., AIR 150"
                        />
                    </div>
                    <div className="form-group">
                        <label>Your Story:</label>
                        <textarea
                            value={newStory.story}
                            onChange={(e) => setNewStory({...newStory, story: e.target.value})}
                            placeholder="Share your journey..."
                            rows="4"
                        />
                    </div>
                    <div className="form-group">
                        <label>Tips for others:</label>
                        {newStory.tips.map((tip, index) => (
                            <input
                                key={index}
                                type="text"
                                value={tip}
                                onChange={(e) => updateTip(index, e.target.value)}
                                placeholder={`Tip ${index + 1}`}
                            />
                        ))}
                        <button type="button" onClick={addTip}>Add Another Tip</button>
                    </div>
                    <div className="form-actions">
                        <button onClick={addStory}>Share Story</button>
                        <button onClick={() => setShowAddForm(false)}>Cancel</button>
                    </div>
                </div>
            )}

            <div className="story-card">
                <div className="story-photo">
                    <img src={current.photo} alt={current.name} />
                    <div className="rank-badge">{current.rank}</div>
                </div>

                <div className="story-content">
                    <h4>{current.name}</h4>
                    <p className="story-text">"{current.story}"</p>

                    <div className="story-tips">
                        <h5>💡 Key Tips:</h5>
                        <ul>
                            {current.tips.map((tip, index) => (
                                <li key={index}>{tip}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="story-navigation">
                <button className="nav-btn" onClick={prevStory}>‹</button>

                <div className="story-indicators">
                    {stories.map((_, index) => (
                        <div
                            key={index}
                            className={`indicator ${index === currentStory ? 'active' : ''}`}
                            onClick={() => goToStory(index)}
                        ></div>
                    ))}
                </div>

                <button className="nav-btn" onClick={nextStory}>›</button>
            </div>

            <div className="story-motivation">
                <p>🌟 <strong>Remember:</strong> Every topper was once a beginner. Your dedication and hard work will lead to success!</p>
                <p>📖 <strong>Share your story:</strong> Inspire others by sharing your journey!</p>
            </div>
        </div>
    );
};

export default TopperStories;
