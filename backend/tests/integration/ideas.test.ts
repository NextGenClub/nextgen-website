import request from 'supertest';
import app from '../../src/app'; // Adjust the path as necessary
import { Idea } from '../../src/models/idea.model'; // Adjust the path as necessary

describe('Ideas Integration Tests', () => {
    beforeAll(async () => {
        // Setup code to run before all tests, e.g., connecting to the database
    });

    afterAll(async () => {
        // Cleanup code to run after all tests, e.g., disconnecting from the database
    });

    it('should create a new idea', async () => {
        const response = await request(app)
            .post('/ideas')
            .send({
                title: 'New Idea',
                description: 'This is a test idea.'
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('New Idea');
    });

    it('should retrieve all ideas', async () => {
        const response = await request(app).get('/ideas');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should vote for an idea', async () => {
        const idea = await Idea.create({
            title: 'Vote Test Idea',
            description: 'This idea is for voting test.'
        });

        const response = await request(app)
            .post(`/ideas/${idea.id}/vote`)
            .send({ userId: 'test-user-id' }); // Replace with a valid user ID

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Vote cast successfully');
    });

    it('should not allow duplicate votes', async () => {
        const idea = await Idea.create({
            title: 'Duplicate Vote Test Idea',
            description: 'This idea is for duplicate voting test.'
        });

        await request(app)
            .post(`/ideas/${idea.id}/vote`)
            .send({ userId: 'test-user-id' }); // Replace with a valid user ID

        const response = await request(app)
            .post(`/ideas/${idea.id}/vote`)
            .send({ userId: 'test-user-id' }); // Replace with a valid user ID

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'User has already voted for this idea');
    });
});