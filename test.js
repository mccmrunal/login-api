const request = require('supertest');
const app = require('./app');

describe('POST /login', () => {
  it('should return 400 if missing username or password', async () => {
    const res = await request(app).post('/login').send({ username: 'admin' });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Missing username or password' });
  });

  it('should return 401 if invalid username', async () => {
    const res = await request(app).post('/login').send({ username: 'invalid', password: 'password' });
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: 'Invalid username' });
  });

  it('should return 401 if invalid password', async () => {
    const res = await request(app).post('/login').send({ username: 'admin', password: 'wrongpassword' });
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: 'Invalid password' });
  });

  it('should return 200 and success message if valid username and password', async () => {
    const res = await request(app).post('/login').send({ username: 'admin', password: 'password' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Login successful' });
  });
});
