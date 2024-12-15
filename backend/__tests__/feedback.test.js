const request = require('supertest');
const app = require('../feedback');

let server;

beforeAll(() => {
  server = app.listen(5000);
});

afterAll((done) => {
  server.close(done);
});

jest.setTimeout(20000);

describe('POST /send-feedback', () => {
  it('should send feedback successfully', async () => {
    const feedback = 'Great app!';
    const response = await request(app)
      .post('/send-feedback')
      .send({ feedback });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Feedback sent successfully');
  });

  it('should return 400 if feedback is empty', async () => {
    const feedback = '';
    const response = await request(app)
      .post('/send-feedback')
      .send({ feedback });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Feedback cannot be empty');
  });

  it('should return 400 if feedback is missing', async () => {
    const response = await request(app).post('/send-feedback').send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Feedback cannot be empty');
  });

  it('should handle missing email configuration gracefully', async () => {
    delete process.env.EMAIL_USER;
    delete process.env.EMAIL_PASS;

    const feedback = 'Feedback without email config';
    const response = await request(app)
      .post('/send-feedback')
      .send({ feedback });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Failed to send feedback');

    process.env.EMAIL_USER = 'test@example.com';
    process.env.EMAIL_PASS = 'password';
  });
});
