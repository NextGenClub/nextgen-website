import User from '../models/user.model';
import Idea from '../models/idea.model';
import Project from '../models/project.model';
import Task from '../models/task.model';
import bcrypt from 'bcrypt';

const seedDatabase = async () => {
    try {
        // Create dummy users
        const users = await User.bulkCreate([
            {
                username: 'johndev',
                name: 'John Developer',
                email: 'john@example.com',
                password: await bcrypt.hash('password123', 10),
                bio: 'Full-stack developer with 5 years of experience',
                position: 'Senior Developer',
                skills: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
                showInTeam: true,
                socialLinks: {
                    github: 'https://github.com/johndev',
                    linkedin: 'https://linkedin.com/in/johndev'
                }
            },
            {
                username: 'sarahdesign',
                name: 'Sarah Designer',
                email: 'sarah@example.com',
                password: await bcrypt.hash('password123', 10),
                bio: 'UI/UX designer passionate about creating beautiful interfaces',
                position: 'Lead Designer',
                skills: ['Figma', 'Adobe XD', 'UI Design', 'UX Research'],
                showInTeam: true,
                socialLinks: {
                    dribbble: 'https://dribbble.com/sarahdesign',
                    linkedin: 'https://linkedin.com/in/sarahdesign'
                }
            },
            {
                username: 'mikemanager',
                name: 'Mike Manager',
                email: 'mike@example.com',
                password: await bcrypt.hash('password123', 10),
                bio: 'Project manager with expertise in agile methodologies',
                position: 'Project Manager',
                skills: ['Agile', 'Scrum', 'Project Management', 'Team Leadership'],
                showInTeam: true,
                socialLinks: {
                    linkedin: 'https://linkedin.com/in/mikemanager'
                }
            },
            {
                username: 'emmatest',
                name: 'Emma Tester',
                email: 'emma@example.com',
                password: await bcrypt.hash('password123', 10),
                bio: 'QA engineer focused on delivering high-quality software',
                position: 'QA Engineer',
                skills: ['Testing', 'Automation', 'Quality Assurance', 'Bug Tracking'],
                showInTeam: true,
                socialLinks: {
                    github: 'https://github.com/emmatest',
                    linkedin: 'https://linkedin.com/in/emmatest'
                }
            }
        ]);

        // Create dummy ideas
        const ideas = await Idea.bulkCreate([
            {
                title: 'AI-Powered Code Review Assistant',
                description: 'Develop an AI tool that helps review code and suggest improvements',
                submittedby: users[0].id,
                status: 'approved',
                documentUrl: 'https://example.com/docs/ai-code-review.pdf'
            },
            {
                title: 'Smart Project Management Dashboard',
                description: 'Create an intelligent dashboard that predicts project timelines and risks',
                submittedby: users[1].id,
                status: 'approved',
                documentUrl: 'https://example.com/docs/smart-pm-dashboard.pdf'
            },
            {
                title: 'Automated Testing Framework',
                description: 'Build a comprehensive testing framework for our applications',
                submittedby: users[3].id,
                status: 'approved',
                documentUrl: 'https://example.com/docs/auto-testing.pdf'
            }
        ]);

        // Create dummy projects
        const projects = await Project.bulkCreate([
            {
                name: 'NextGen Platform Development',
                description: 'Building the next generation of our platform',
                managerid: users[2].id,
                ideaid: ideas[0].id
            },
            {
                name: 'UI/UX Redesign',
                description: 'Modernizing the user interface and experience',
                managerid: users[2].id,
                ideaid: ideas[1].id
            }
        ]);

        // Create dummy tasks
        await Task.bulkCreate([
            {
                title: 'Implement AI Code Review Algorithm',
                description: 'Develop the core algorithm for code review suggestions',
                projectid: projects[0].id,
                assignedto: users[0].id,
                priority: 'high',
                iscomplete: false,
                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
            },
            {
                title: 'Design New Dashboard Layout',
                description: 'Create wireframes for the new project management dashboard',
                projectid: projects[1].id,
                assignedto: users[1].id,
                priority: 'medium',
                iscomplete: false,
                dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) // 5 days from now
            },
            {
                title: 'Write Test Cases',
                description: 'Create comprehensive test cases for the new features',
                projectid: projects[0].id,
                assignedto: users[3].id,
                priority: 'medium',
                iscomplete: false,
                dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days from now
            }
        ]);

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

export default seedDatabase; 