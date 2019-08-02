const supertest = require('supertest')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const app = require('../app')
const config = require('../util/config')
const helper = require('../util/testhelper')
const api = supertest(app)

const User = require('../models/User')
const Post = require('../models/Post')
const Workout = require('../models/Workout')
const DoneWorkout = require('../models/DoneWorkout')

let token = null
let userid0 = null
let userid1 = null

describe('Nothing on database at start', () => {
  beforeAll(async () => {
    userid0 = await helper.createOneUser('Miksa')
    userid1 = await helper.createOneUser('Miksa1')
    await Post.deleteMany({})
    await Workout.deleteMany({})
    await DoneWorkout.deleteMany({})

    const response = await api
      .post('/login')
      .send({ username: 'Miksa', password: 'secret' })
    
    token = `Bearer ${response.body.token}` 
  })

  test('User can add friend', async () => {
    await api
      .post('/users/addfriend')
      .send({ newfriend: userid1 })
      .set({ Authorization: token })
      .expect(200)
    
    const response = await api 
      .get(`/users/${userid0}`)
      .expect(200)
  })
}) 