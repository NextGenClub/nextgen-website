export const validateIdeaSubmission = (data) => {
    const errors = {};
    
    if (!data.title || data.title.trim() === '') {
        errors.title = 'Title is required';
    }

    if (!data.description || data.description.trim() === '') {
        errors.description = 'Description is required';
    }

    if (data.document && !data.document.name.endsWith('.pdf')) {
        errors.document = 'Only PDF files are allowed';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

export const validateVote = (userId, ideaId) => {
    const errors = {};

    if (!userId) {
        errors.userId = 'User must be authenticated to vote';
    }

    if (!ideaId) {
        errors.ideaId = 'Idea ID is required to vote';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};