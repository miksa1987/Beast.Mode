const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = require('../app')
const config = require('../util/config')
const helper = require('../util/testhelper')
const api = supertest(app)

const User = require('../models/User')

let token = null

describe('Initially there is one user in DB', () => {
  beforeAll(async () => {
    await helper.createOneUser()
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

  // This test also logs in the user at appropriate moment
  test('User can log in and token is valid', async () => {
    const users = await api.get('/users/all')
    const response = await api
      .post('/login')
      .send({ username: 'Miksa', password: 'secret' })

    token = `Bearer ${response.body.token}` // We have to be logged in for some tests.
    const decodedToken = await jwt.verify(response.body.token, config.SECRET)

    expect(decodedToken.id).toEqual(users.body[0].id)
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

  test('Request nonexisting users workouts fails', async () => {
    await api
      .get('/users/5d27680bt7f9f802870dbaf51/workouts')
      .expect(404)
  })

  test('Request nonexisting users posts fails', async () => {
    await api
      .get('/users/5d27680b7f9f802870dbaf51t/posts')
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

      expect(users.body[0].friends[0].id).toEqual(users.body[1].id)
      expect(users.body[1].friends[0].id).toEqual(users.body[0].id)
  })

  test('User can update his/her settings', async () => {
    const newValues = { password: 'secccret', info: 'Pera Peruskäyttäjä' }

    let response = await api
      .put('/users/me')
      .send(newValues)
      .set({ Authorization: token })
      .expect(200)
    
    expect(response.body.info).toEqual('Pera Peruskäyttäjä')
  })
})

afterAll(() => {
  mongoose.connection.close()
})