const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)

const User = require('../models/User')

let token = null

describe('Initially there is one user in DB', () => {
  beforeAll(async () => {
    await User.deleteMany({})
    
    const pwHash = await bcrypt.hash('secret', 10)
    const user = new User({
      username: 'Miksa',
      passwordHash: pwHash,
      picture: 'NOPICTURE',
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

    const response = await api
      .post('/login')
      .send({ username: 'Miksa', password: 'secret' })
    
    token = `Bearer ${response.body.token}` // We have to be logged in for some tests.
  })

  test('One user will return', async () => {
    const response = await api.get('/users/all')

    expect(response.body.length).toBe(1)
    expect(response.body[0].username).toEqual('Miksa')
  })

  test('User can be added', async () => {
    const user = {
      username: 'Terppa',
      password: 'secret',
      info: 'TERO TESTIKÄYTTÄJÄ',
      email: 'terppa69@gmail.com'
    }

    await api
      .post('/users/new')
      .send(user)
      .expect(201)
    
    const response = await api.get('/users/all')

    expect(response.body.length).toBe(2)
    expect(response.body[1].username).toEqual('Terppa')
  })

  test('Single user can be returned', async () => {
    const allUsers = await api.get('/users/all')

    const response = await api
      .get(`/users/${allUsers.body[1].id}`)
      .expect(200)
    
    expect(response.body.username).toEqual('Terppa')
  })

  test('Request nonexisting user will return 404', async () => {
    await api
      .get('/users/xzibit')
      .expect(404)
  })

  test('User can add another user as friend', async () => {
    let users = await api.get('/users/all')
    const newFriendId = users.body[1].id

    await api
      .post('/users/addfriend')
      .send({ newfriend: newFriendId })
      .set({ Authorization: token })
      .expect(200)
    
      users = await api.get('/users/all')

      expect(users.body[0].friends[0]).toEqual(users.body[1].id)
      expect(users.body[1].friends[0]).toEqual(users.body[0].id)
  })
})

afterAll(() => {
  mongoose.connection.close()
})