const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/User')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const pwHash = await bcrypt.hash('secret', 10)
  const user = new User({
    username: 'Miksa',
    passwordHash: pwHash,
    picture: '',
    pictures: [],
    info: 'TERO TESTIKÄYTTÄJÄ',
    age: 31,
    activity: [],
    postCount: 0,
    workoutCount: 0,
    doneWorkoutCount: 0,
    friends: [],
    posts: [],
    workouts: [],
    doneWorkouts: []
  })
  await user.save()
})

test('Users are returned', async () => {
  const response = await api
    .get('/users/nonexisting')
    .expect(404)
})

afterAll(() => {
  mongoose.connection.close()
})