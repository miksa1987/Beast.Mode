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

describe('Create one user and test that search finds everything', () => {
  beforeAll(async () => {
    await helper.deleteUsers()
    await helper.createOneUser('Miksa')
    
    await Post.deleteMany({})
    await Workout.deleteMany({})
    await DoneWorkout.deleteMany({})

    const response = await api
      .post('/login')
      .send({ username: 'Miksa', password: 'secret' })
    
    token = `Bearer ${response.body.token}` 

    const post = { content: 'TEST', picture: '', type: 'post' }
    const workout = { content: 'TEST', picture: '', type: 'workout' }
    const doneworkout = { content: 'TEST', picture: '', type: 'doneworkout' }

    await api 
      .post('/posts/new')
      .send(post)
      .set({ Authorization: token })

    await api 
      .post('/workouts/new')
      .send(workout)
      .set({ Authorization: token })

    await api 
      .post('/doneworkouts/new')
      .send(doneworkout)
      .set({ Authorization: token })
  })

  test('Search finds user with exact case and search type', async () => {
    const search = { search: 'Miksa', type: 'user' }

    const response = await api
      .post('/search')
      .send(search)
      .set({ Authorization: token })
      .expect(200)

    expect(response.body.length).toBe(1)
    expect(response.body[0].username).toEqual('Miksa')
  })

  test('Search finds user with non-exact case and text and search type', async () => {
    const search = { search: 'iksa', type: 'use' }

    const response = await api
      .post('/search')
      .send(search)
      .set({ Authorization: token })
      .expect(200)

    expect(response.body.length).toBe(1)
    expect(response.body[0].username).toEqual('Miksa')
  })

  test('Search finds all items that include TEST', async () => {
    const search = { search: 'test', type: 'jotain' }
    
    const response = await api
      .post('/search')
      .send(search)
      .set({ Authorization: token })
      .expect(200)

    expect(response.body.length).toBe(3)
    expect(response.body[0].content).toEqual('TEST')
  })

  test('Search finds done workout that includes TEST', async () => {
    const search = { search: 'test', type: 'doneworkout' }
    
    const response = await api
      .post('/search')
      .send(search)
      .set({ Authorization: token })
      .expect(200)

    expect(response.body.length).toBe(1)
    expect(response.body[0].content).toEqual('TEST')
  })

  test('Search finds workout that includes TEST', async () => {
    const search = { search: 'test', type: 'workout' }
    
    const response = await api
      .post('/search')
      .send(search)
      .set({ Authorization: token })
      .expect(200)

    expect(response.body.length).toBe(1)
    expect(response.body[0].content).toEqual('TEST')
  })
  
  test('Search finds done post that includes TEST', async () => {
    const search = { search: 'test', type: 'post' }
    
    const response = await api
      .post('/search')
      .send(search)
      .set({ Authorization: token })
      .expect(200)

    expect(response.body.length).toBe(1)
    expect(response.body[0].content).toEqual('TEST')
  })

  
  test('Search finds all items that include TEST with incomplete keyword', async () => {
    const search = { search: 't', type: 'jotain' }
    
    const response = await api
      .post('/search')
      .send(search)
      .set({ Authorization: token })
      .expect(200)

    expect(response.body.length).toBe(3)
    expect(response.body[0].content).toEqual('TEST')
  })

  test('Search finds all items that include TEST with date', async () => {
    const search = { search: 'test', type: 'jotain' }
    const now = await moment().add(1, 'hours').format('YYYY-M-D-H-m')

    const response = await api
      .post(`/search/bydate/${now}`)
      .send(search)
      .set({ Authorization: token })
      .expect(200)

    expect(response.body.length).toBe(3)
    expect(response.body[0].content).toEqual('TEST')
  })

  test('Search finds all items that include TEST with date with incomplete keyword', async () => {
    const search = { search: 't', type: 'jotain' }
    const now = await moment().add(1, 'hours').format('YYYY-M-D-H-m')

    const response = await api
      .post(`/search/bydate/${now}`)
      .send(search)
      .set({ Authorization: token })
      .expect(200)

    expect(response.body.length).toBe(3)
    expect(response.body[0].content).toEqual('TEST')
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})