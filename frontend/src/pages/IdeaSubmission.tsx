import React, { useState } from 'react';
import { IdeaForm } from '../components/Ideas/IdeaForm';

const IdeaSubmission: React.FC = () => {
    const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);

    const handleSubmission = (status: string) => {
        setSubmissionStatus(status);
    };

    return (
        <div>
            <h1>Submit Your Idea</h1>
            <IdeaForm onSubmit={handleSubmission} />
            {submissionStatus && <p>{submissionStatus}</p>}
        </div>
    );
};

export default IdeaSubmission;