import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, onValue, push, set, update, remove } from 'firebase/database';
import './Blog.css';

const Blog = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [blogPosts, setBlogPosts] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [showAddPost, setShowAddPost] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [newQuestion, setNewQuestion] = useState('');
    const [newPost, setNewPost] = useState({
        title: '',
        category: 'tips',
        excerpt: '',
        image: '',
        readTime: '5 min read',
        author: ''
    });

    const categories = ['all', 'upsc', 'jee', 'neet', 'ssc', 'banking', 'tips'];

    // Check if user is authorized (mentor or founder)
    const isAuthorized = () => {
        return userRole === 'mentor' || userRole === 'founder';
    };



    // Authentication and data fetching
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            if (user) {
                // Check user role in database
                const userRef = ref(db, `users/${user.uid}`);
                onValue(userRef, (snapshot) => {
                    const userData = snapshot.val();
                    setUserRole(userData?.role || 'student');
                });
            } else {
                setUserRole(null);
            }
        });

        return () => unsubscribe();
    }, []);

    // Fetch blog posts from Firebase
    useEffect(() => {
        const postsRef = ref(db, 'blogPosts');
        const unsubscribe = onValue(postsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const postsArray = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value
                }));
                setBlogPosts(postsArray);
            } else {
                // If no posts in Firebase, use default posts
                const defaultPosts = [
                    {
                        id: '1',
                        title: 'UPSC Prelims 2024: Last Minute Preparation Tips',
                        category: 'upsc',
                        excerpt: 'Ace your UPSC prelims with these proven strategies and time management techniques.',
                        image: 'https://via.placeholder.com/400x250?text=UPSC+Tips',
                        date: '2024-04-15',
                        readTime: '5 min read',
                        author: 'ExamExpert'
                    },
                    {
                        id: '2',
                        title: 'JEE Main 2024: Chapter-wise Weightage Analysis',
                        category: 'jee',
                        excerpt: 'Understand the importance of each chapter and prioritize your preparation accordingly.',
                        image: 'https://via.placeholder.com/400x250?text=JEE+Analysis',
                        date: '2024-04-12',
                        readTime: '7 min read',
                        author: 'PhysicsWallah'
                    },
                    {
                        id: '3',
                        title: 'NEET Biology: Must-Know Diagrams and Flowcharts',
                        category: 'neet',
                        excerpt: 'Master these essential diagrams to score maximum marks in NEET Biology.',
                        image: 'https://via.placeholder.com/400x250?text=NEET+Biology',
                        date: '2024-04-10',
                        readTime: '6 min read',
                        author: 'MedPrep'
                    },
                    {
                        id: '4',
                        title: 'SSC CGL 2024: Quantitative Aptitude Shortcuts',
                        category: 'ssc',
                        excerpt: 'Learn time-saving shortcuts for SSC quantitative aptitude questions.',
                        image: 'https://via.placeholder.com/400x250?text=SSC+Shortcuts',
                        date: '2024-04-08',
                        readTime: '8 min read',
                        author: 'QuantMaster'
                    },
                    {
                        id: '5',
                        title: 'IBPS PO 2024: Interview Preparation Guide',
                        category: 'banking',
                        excerpt: 'Complete guide to crack IBPS PO interview with confidence.',
                        image: 'https://via.placeholder.com/400x250?text=IBPS+Interview',
                        date: '2024-04-05',
                        readTime: '10 min read',
                        author: 'BankingExpert'
                    },
                    {
                        id: '6',
                        title: 'Study Smart: 10 Habits of Successful Students',
                        category: 'tips',
                        excerpt: 'Develop these habits to maximize your learning potential and exam performance.',
                        image: 'https://via.placeholder.com/400x250?text=Study+Habits',
                        date: '2024-04-03',
                        readTime: '4 min read',
                        author: 'SuccessCoach'
                    }
                ];
                setBlogPosts(defaultPosts);
            }
        });

        return () => unsubscribe();
    }, []);

    // Fetch questions from Firebase
    useEffect(() => {
        const questionsRef = ref(db, 'questions');
        const unsubscribe = onValue(questionsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const questionsArray = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value
                }));
                setQuestions(questionsArray);
            } else {
                setQuestions([]);
            }
        });

        return () => unsubscribe();
    }, []);

    // Blog post CRUD functions
    const addBlogPost = async () => {
        if (!isAuthorized()) return;

        const postData = {
            ...newPost,
            date: new Date().toISOString().split('T')[0],
            author: currentUser?.displayName || currentUser?.email || 'Anonymous'
        };

        try {
            const postsRef = ref(db, 'blogPosts');
            const newPostRef = push(postsRef);
            await set(newPostRef, postData);

            setNewPost({
                title: '',
                category: 'tips',
                excerpt: '',
                image: '',
                readTime: '5 min read',
                author: ''
            });
            setShowAddPost(false);
        } catch (error) {
            console.error('Error adding post:', error);
        }
    };

    const updateBlogPost = async (postId) => {
        if (!isAuthorized()) return;

        try {
            const postRef = ref(db, `blogPosts/${postId}`);
            await update(postRef, editingPost);
            setEditingPost(null);
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    const deleteBlogPost = async (postId) => {
        if (!isAuthorized()) return;

        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                const postRef = ref(db, `blogPosts/${postId}`);
                await remove(postRef);
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    };

    // Q&A functions
    const submitQuestion = async () => {
        if (!newQuestion.trim()) return;

        const questionData = {
            question: newQuestion,
            author: currentUser?.displayName || currentUser?.email || 'Anonymous',
            date: new Date().toISOString(),
            answered: false,
            answer: ''
        };

        try {
            const questionsRef = ref(db, 'questions');
            const newQuestionRef = push(questionsRef);
            await set(newQuestionRef, questionData);
            setNewQuestion('');
        } catch (error) {
            console.error('Error submitting question:', error);
        }
    };

    const answerQuestion = async (questionId, answer) => {
        if (!isAuthorized()) return;

        try {
            const questionRef = ref(db, `questions/${questionId}`);
            await update(questionRef, {
                answer: answer,
                answered: true,
                answeredBy: currentUser?.displayName || currentUser?.email || 'Anonymous',
                answeredDate: new Date().toISOString()
            });
        } catch (error) {
            console.error('Error answering question:', error);
        }
    };

    const filteredPosts = selectedCategory === 'all'
        ? blogPosts
        : blogPosts.filter(post => post.category === selectedCategory);

    return (
        <div className="blog">
            <div className="blog-header">
                <h1>Exam Preparation Blog</h1>
                <p>Expert tips, strategies, and insights to help you ace your exams</p>
            </div>

            <div className="blog-categories">
                {categories.map(category => (
                    <button
                        key={category}
                        className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                ))}
            </div>

            {/* Admin Panel for Authorized Users */}
            {isAuthorized() && (
                <div className="admin-panel">
                    <h2>Admin Panel</h2>
                    <div className="admin-controls">
                        <button
                            className="admin-btn add-btn"
                            onClick={() => setShowAddPost(!showAddPost)}
                        >
                            {showAddPost ? 'Cancel' : 'Add New Post'}
                        </button>
                    </div>

                    {showAddPost && (
                        <div className="add-post-form">
                            <h3>Add New Blog Post</h3>
                            <input
                                type="text"
                                placeholder="Post Title"
                                value={newPost.title}
                                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                            />
                            <select
                                value={newPost.category}
                                onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                            >
                                {categories.filter(cat => cat !== 'all').map(category => (
                                    <option key={category} value={category}>
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </option>
                                ))}
                            </select>
                            <textarea
                                placeholder="Post Excerpt"
                                value={newPost.excerpt}
                                onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                            />
                            <input
                                type="text"
                                placeholder="Image URL"
                                value={newPost.image}
                                onChange={(e) => setNewPost({...newPost, image: e.target.value})}
                            />
                            <input
                                type="text"
                                placeholder="Read Time (e.g., 5 min read)"
                                value={newPost.readTime}
                                onChange={(e) => setNewPost({...newPost, readTime: e.target.value})}
                            />
                            <button className="submit-btn" onClick={addBlogPost}>Add Post</button>
                        </div>
                    )}
                </div>
            )}

            <div className="blog-posts">
                {filteredPosts.map(post => (
                    <div key={post.id} className="blog-post">
                        <div className="post-image">
                            <img src={post.image} alt={post.title} />
                        </div>
                        <div className="post-content">
                            <span className="post-category">{post.category.toUpperCase()}</span>
                            <h2>{post.title}</h2>
                            <p className="post-excerpt">{post.excerpt}</p>
                            <div className="post-meta">
                                <span>By {post.author}</span>
                                <span>{new Date(post.date).toLocaleDateString()}</span>
                                <span>{post.readTime}</span>
                            </div>
                            <button className="read-more-btn">Read More</button>

                            {/* Admin controls for each post */}
                            {isAuthorized() && (
                                <div className="post-admin-controls">
                                    <button
                                        className="edit-btn"
                                        onClick={() => setEditingPost(post)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteBlogPost(post.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Post Modal */}
            {editingPost && (
                <div className="edit-modal">
                    <div className="modal-content">
                        <h3>Edit Blog Post</h3>
                        <input
                            type="text"
                            value={editingPost.title}
                            onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
                        />
                        <select
                            value={editingPost.category}
                            onChange={(e) => setEditingPost({...editingPost, category: e.target.value})}
                        >
                            {categories.filter(cat => cat !== 'all').map(category => (
                                <option key={category} value={category}>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </option>
                            ))}
                        </select>
                        <textarea
                            value={editingPost.excerpt}
                            onChange={(e) => setEditingPost({...editingPost, excerpt: e.target.value})}
                        />
                        <input
                            type="text"
                            value={editingPost.image}
                            onChange={(e) => setEditingPost({...editingPost, image: e.target.value})}
                        />
                        <input
                            type="text"
                            value={editingPost.readTime}
                            onChange={(e) => setEditingPost({...editingPost, readTime: e.target.value})}
                        />
                        <div className="modal-buttons">
                            <button className="submit-btn" onClick={() => updateBlogPost(editingPost.id)}>Update</button>
                            <button className="cancel-btn" onClick={() => setEditingPost(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Q&A Section */}
            <div className="qa-section">
                <h2>Exam Questions & Answers</h2>
                <p>Have questions about exams? Ask our mentors and get expert answers!</p>

                {/* Submit Question Form */}
                <div className="submit-question">
                    <textarea
                        placeholder="Ask your exam-related question here..."
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        rows="3"
                    />
                    <button className="submit-btn" onClick={submitQuestion}>Submit Question</button>
                </div>

                {/* Questions List */}
                <div className="questions-list">
                    {questions.map(question => (
                        <div key={question.id} className="question-item">
                            <div className="question-content">
                                <p className="question-text"><strong>Q:</strong> {question.question}</p>
                                <p className="question-meta">
                                    Asked by {question.author} on {new Date(question.date).toLocaleDateString()}
                                </p>
                            </div>

                            {question.answered ? (
                                <div className="answer-content">
                                    <p className="answer-text"><strong>A:</strong> {question.answer}</p>
                                    <p className="answer-meta">
                                        Answered by {question.answeredBy} on {new Date(question.answeredDate).toLocaleDateString()}
                                    </p>
                                </div>
                            ) : (
                                isAuthorized() && (
                                    <div className="answer-form">
                                        <textarea
                                            placeholder="Provide your answer..."
                                            onChange={(e) => {
                                                // Store answer temporarily
                                                question.tempAnswer = e.target.value;
                                            }}
                                        />
                                        <button
                                            className="answer-btn"
                                            onClick={() => answerQuestion(question.id, question.tempAnswer)}
                                        >
                                            Answer
                                        </button>
                                    </div>
                                )
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="newsletter-signup">
                <h2>Stay Updated with Latest Exam News</h2>
                <p>Subscribe to our newsletter for exam updates, tips, and exclusive content.</p>
                <div className="newsletter-form">
                    <input type="email" placeholder="Enter your email" />
                    <button>Subscribe</button>
                </div>
            </div>
        </div>
    );
};

export default Blog;
