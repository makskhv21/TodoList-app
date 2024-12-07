import React, { useState } from 'react';
import './HelpTab.css';

const HelpTab = () => {
    const [feedback, setFeedback] = useState("");
    const [status, setStatus] = useState({ message: "", type: "" });

    const handleFeedbackChange = (e) => setFeedback(e.target.value);

    const handleFeedbackSubmit = async () => {
        if (feedback.trim()) {
            try {
                const response = await fetch('http://localhost:5000/send-feedback', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ feedback }),
                });

                if (response.ok) {
                    setStatus({ message: 'Feedback sent successfully!', type: 'success' });
                    setFeedback('');
                } else {
                    setStatus({ message: 'Failed to send feedback. Please try again later.', type: 'error' });
                }
            } catch (error) {
                console.error('Error:', error);
                setStatus({ message: 'An error occurred. Please check your internet connection and try again.', type: 'error' });
            } finally {
                setTimeout(() => setStatus({ message: '', type: '' }), 3000);
            }
        }
    };

    const handleStatusDismiss = () => {
        setStatus({ message: '', type: '' });
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

                    {status.message && (
                        <div
                            className={`feedback-status ${status.type}`}
                            onMouseEnter={handleStatusDismiss}
                        >
                            {status.message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HelpTab;