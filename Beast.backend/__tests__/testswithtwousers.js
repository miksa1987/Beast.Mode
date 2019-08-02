const supertest = require('supertest')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const moment = require('moment')
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
    await helper.deleteUsers()
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

    expect(response.body.friends[0].id).toEqual(userid1)
  })

  test('User can remove friend', async () => {
    await api
      .post('/users/removefriend')
      .send({ friendToRemove: userid1 })
      .set({ Authorization: token })
      .expect(200)

    const response = await api 
      .get(`/users/${userid0}`)
      .expect(200)

    expect(response.body.friends.length).toBe(0)
  })

  test('Users post can be fetched with date', async () => {
    const post = { content: 'TEST', picture: '', type: 'post' }

    await api 
      .post('/posts/new')
      .send(post)
      .set({ Authorization: token })
      .expect(201)

    const now = await moment().add(1, 'hours').format('YYYY-M-D-H-m')
    const response = await api
      .get(`/users/${userid0}/posts/${now}`)
      .set({ Authorization: token })
      .expect(200)
    
      console.log(response.body)
  })

  test('Friends posts can be fetched with a date', async () => {
    await api
      .post('/users/addfriend')
      .send({ newfriend: userid1 })
      .set({ Authorization: token })
    
    const userLoginResponse = await api
      .post('/login')
      .send({ username: 'Miksa1', password: 'secret' })
    
    token = `Bearer ${userLoginResponse.body.token}`

    const now = await moment().add(1, 'hours').format('YYYY-M-D-H-m')
    const response = await api
      .get(`/posts/byfriends/${now}`)
      .set({ Authorization: token })
      .expect(200)
    
    expect(response.body.posts.length).toBe(1)
  })
}) 

afterAll(() => {
  mongoose.connection.close()
})