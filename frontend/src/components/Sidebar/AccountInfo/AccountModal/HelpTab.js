import React, { useState } from 'react';
import './HelpTab.css';

const HelpTab = () => {
    const [feedback, setFeedback] = useState("");
    const [feedbackList, setFeedbackList] = useState([]);

    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    };

    const handleFeedbackSubmit = () => {
        if (feedback.trim()) {
            setFeedbackList([...feedbackList, feedback]);
            setFeedback("");
        }
    };

    return (
        <div className="help-tab-container">
            <div className="help-tab-content">
                <h3 className="help-title">Help & Support</h3>
                <p>If you need assistance, please contact our support team at <strong>support@example.com</strong>.</p>
                <p>You can also visit our <a href="/faq">FAQ page</a> for more information.</p>

                <div className="feedback-section">
                    <h4 className="feedback-title">Leave a Feedback</h4>
                    <textarea
                        value={feedback}
                        onChange={handleFeedbackChange}
                        placeholder="Leave your feedback here..."
                        rows="4"
                        className="feedback-input"
                    />
                    <button onClick={handleFeedbackSubmit} className="submit-feedback-btn">Submit Feedback</button>

                    {feedbackList.length > 0 && (
                        <div className="feedback-list">
                            <h4>Recent Feedback</h4>
                            <ul>
                                {feedbackList.map((item, index) => (
                                    <li key={index} className="feedback-item">{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HelpTab;