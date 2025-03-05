import React, { useState } from 'react';
import { Idea } from '../../../types/idea.types';
import { submitIdea } from '../../../services/ideas';

const IdeaForm: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [document, setDocument] = useState<File | null>(null);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (!title || !description) {
            setError('Title and description are required.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        if (document) {
            formData.append('document', document);
        }

        try {
            await submitIdea(formData);
            setSuccess(true);
            setTitle('');
            setDescription('');
            setDocument(null);
        } catch (err) {
            setError('Failed to submit idea. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Submit Your Idea</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">Idea submitted successfully!</p>}
            <div>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="document">Upload Document (PDF only):</label>
                <input
                    type="file"
                    id="document"
                    accept=".pdf"
                    onChange={(e) => setDocument(e.target.files?.[0] || null)}
                />
            </div>
            <button type="submit">Submit Idea</button>
        </form>
    );
};

export default IdeaForm;