import React, { useState } from 'react';
import './Forum.css';

const Forum = () => {
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: 'Tips for UPSC Prelims 2024',
            author: 'Aspirant123',
            content: 'What are the best resources for UPSC prelims?',
            replies: 5,
            likes: 12,
            timestamp: '2 hours ago'
        },
        {
            id: 2,
            title: 'JEE Main 2024 Strategy',
            author: 'FutureEngineer',
            content: 'How to balance board exams and JEE preparation?',
            replies: 8,
            likes: 15,
            timestamp: '4 hours ago'
        }
    ]);

    const [newPost, setNewPost] = useState({ title: '', content: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPost.title && newPost.content) {
            const post = {
                id: posts.length + 1,
                title: newPost.title,
                author: 'CurrentUser',
                content: newPost.content,
                replies: 0,
                likes: 0,
                timestamp: 'Just now'
            };
            setPosts([post, ...posts]);
            setNewPost({ title: '', content: '' });
        }
    };

    return (
        <div className="forum">
            <h1>Exam Discussion Forum</h1>
            <p>Connect with fellow aspirants, share tips, and get answers to your questions.</p>

            <form className="new-post-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Post title..."
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    required
                />
                <textarea
                    placeholder="Share your thoughts..."
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    required
                ></textarea>
                <button type="submit">Post</button>
            </form>

            <div className="posts-list">
                {posts.map(post => (
                    <div key={post.id} className="post-card">
                        <h3>{post.title}</h3>
                        <p className="post-content">{post.content}</p>
                        <div className="post-meta">
                            <span>By {post.author}</span>
                            <span>{post.timestamp}</span>
                            <span>{post.replies} replies</span>
                            <span>{post.likes} likes</span>
                        </div>
                        <div className="post-actions">
                            <button>Reply</button>
                            <button>Like</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Forum;
