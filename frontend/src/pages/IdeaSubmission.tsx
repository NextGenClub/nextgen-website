import React, { useState } from 'react';
import IdeaForm from '../components/Ideas/IdeaForm';
import './IdeaSubmission.css';

const IdeaSubmission: React.FC = () => {
    const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);

    const handleSubmissionSuccess = () => {
        setSubmissionStatus('success');
    };

    const handleSubmissionError = () => {
        setSubmissionStatus('error');
    };

    return (
        <div className="idea-submission-page container">
            <h1>Submit Your Idea</h1>
            <p>
                Have an idea for a project? Submit it here, and our community members will vote on it!
            </p>
            {submissionStatus === 'success' && (
                <div className="success-message">Your idea was submitted successfully!</div>
            )}
            {submissionStatus === 'error' && (
                <div className="error-message">There was an error submitting your idea. Please try again.</div>
            )}
            <IdeaForm />
        </div>
    );
};

export default IdeaSubmission;