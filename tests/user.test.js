const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); 
const User = require('../models/user');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close(); 
});

describe('User API Tests', () => {
  
  it('should create a new user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      mobile: '1234567890',
    };

    const res = await request(app) 
      .post('/api/users')
      .send(userData);

    expect(res.statusCode).toEqual(201); 
    expect(res.body).toHaveProperty('email', userData.email);
    expect(res.body).toHaveProperty('name', userData.name);
  });

  /** Test Case for Invalid User Data **/
  it('should return 400 for invalid user data', async () => {
    const invalidUserData = {
      name: '', // Invalid name (required field is empty)
      email: 'invalid-email', // Invalid email format
      mobile: '1234567890',
    };

    const res = await request(app) // Use 'app' instead of 'server'
      .post('/api/users')
      .send(invalidUserData);

    expect(res.statusCode).toEqual(400); 
    expect(res.body).toHaveProperty('error');
  });

  it('should retrieve user details by ID', async () => {
    // Create a user manually
    const newUser = new User({
      name: 'Jane Doe',
      email: 'jane@example.com',
      mobile: '0987654321',
    });
    await newUser.save();

    const res = await request(app) 
      .get(`/api/users/${newUser._id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Jane Doe');
    expect(res.body).toHaveProperty('email', 'jane@example.com');
  });

  
  it('should return 404 if user is not found', async () => {
    const nonExistentUserId = new mongoose.Types.ObjectId(); 

    const res = await request(app) 
      .get(`/api/users/${nonExistentUserId}`);

    expect(res.statusCode).toEqual(404); 
    expect(res.body).toHaveProperty('error', 'User not found');
  });

});
