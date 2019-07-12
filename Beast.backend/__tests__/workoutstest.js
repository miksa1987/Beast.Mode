const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const config = require('../util/config')
const helper = require('../util/testhelper')
const api = supertest(app)

const Workout = require('../models/Workout')

let token = null

describe('workouts collection is empty in the beginning', () => {
  beforeAll(async () => {
    await helper.createOneUser()
    await Workout.deleteMany({})

    const response = await api
      .post('/login')
      .send({ username: 'Miksa', password: 'secret' })
    
    token = `Bearer ${response.body.token}`
  })

  test('Zero posts are returned', async () => {
    const response = await api
      .get('/workouts/all')
      .expect(200)

    expect(response.body.length).toBe(0)
  })

  test('Workout can be added', async () => {
    console.log(token)
    const postToAdd = {
      content: 'POST',
      image: 'tässäonkuva',
      type: 'workout',
      likes: 0
    }

    const response = await api
      .post('/workouts/new')
      .send(postToAdd)
      .set({ Authorization: token })
      .expect(201)
  })

  test('One workout returned after posting', async () => {
    const response = await api
      .get('/workouts/all')
      .expect(200)

    expect(response.body.length).toBe(1)
    expect(response.body[0].content).toEqual('POST')
  })

  test('Workout can be returned with id', async () => {
    let response = await api.get('/workouts/all')

    const id = response.body[0]._id

    response = await api
      .get(`/workouts/${id}`)
      .expect(200)

    expect(response.body.content).toEqual('POST')
  })

  test('Workout can be updated', async () => {
    let response = await api.get('/workouts/all')

    const id = response.body[0]._id

    await api
      .put(`/workouts/${id}`)
      .send({ content: 'MODDED' })
      .set({ Authorization: token })
      .expect(200)

    response = await api.get('/workouts/all')

    expect(response.body[0].content).toEqual('MODDED')
  })
})