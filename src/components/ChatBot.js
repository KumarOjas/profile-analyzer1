import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';

const ChatBot = () => {
    const [messages, setMessages] = useState([
        { text: "Hi! I'm your AI doubt solver. Ask me anything about your exams!", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate AI response (replace with actual API call)
        setTimeout(() => {
            const botResponse = generateResponse(input);
            setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
            setIsTyping(false);
        }, 1000);
    };

    const generateResponse = (query) => {
        // Simple response generator (replace with AI API)
        const responses = [
            "That's a great question! Let me explain...",
            "Based on the syllabus, you should focus on...",
            "Here's a quick tip: Practice regularly!",
            "I recommend checking the official website for updates.",
            "For this topic, refer to chapter X in your textbook."
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="chatbot">
            <div className="chat-header">
                <h3>AI Doubt Solver</h3>
                <span className="online-indicator">● Online</span>
            </div>

            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        <div className="message-content">
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="message bot">
                        <div className="message-content typing">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="chat-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask your doubt..."
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default ChatBot;
