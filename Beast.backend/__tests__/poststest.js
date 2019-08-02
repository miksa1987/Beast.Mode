const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const config = require('../util/config')
const moment = require('moment')
const Post = require('../models/Post')
const helper = require('../util/testhelper')
const api = supertest(app)

let token = null

describe('Posts collection is empty in the beginning', () => {
  beforeAll(async () => {
    await helper.deleteUsers()
    await helper.createOneUser('Miksa')
    await Post.deleteMany({})

    const response = await api
      .post('/login')
      .send({ username: 'Miksa', password: 'secret' })
    
    token = `Bearer ${response.body.token}`
  })

  test('Zero posts are returned', async () => {
    const response = await api
      .get('/posts/all')
      .expect(200)

    expect(response.body.length).toBe(0)
  })

  test('Post can be added', async () => {
    const postToAdd = {
      content: 'POST',
      image: 'tässäonkuva',
      likes: 0
    }

    const response = await api
      .post('/posts/new')
      .send(postToAdd)
      .set({ Authorization: token })
      .expect(201)
  })

  test('One post returned after posting', async () => {
    const response = await api
      .get('/posts/all')
      .expect(200)

    expect(response.body.length).toBe(1)
    expect(response.body[0].content).toEqual('POST')
  })

  test('Post can be returned with id', async () => {
    let response = await api.get('/posts/all')

    const id = response.body[0]._id

    response = await api
      .get(`/posts/${id}`)
      .expect(200)

    expect(response.body.content).toEqual('POST')
  })

  test('Post can be updated', async () => {
    let response = await api.get('/posts/all')

    const id = response.body[0]._id

    await api
      .put(`/posts/${id}`)
      .send({ content: 'MODDED' })
      .set({ Authorization: token })
      .expect(200)

    response = await api.get('/posts/all')

    expect(response.body[0].content).toEqual('MODDED')
  })
})

afterAll(() => {
  mongoose.connection.close()
})