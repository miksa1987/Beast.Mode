const supertest   = require('supertest')
const mongoose    = require('mongoose')
const app         = require('../app')
const config      = require('../util/config')
const dates       = require('../util/dates')
const helper      = require('../util/testhelper')
const api         = supertest(app)
const DoneWorkout = require('../models/DoneWorkout')

let token = null

describe('done workouts collection is empty in the beginning', () => {
  beforeAll(async () => {
    await helper.createOneUser('Miksa')
    await DoneWorkout.deleteMany({})

    const response = await api
      .post('/login')
      .send({ username: 'Miksa', password: 'secret' })
    
    token = `Bearer ${response.body.token}`
  })

  test('Zero posts are returned', async () => {
    const response = await api
      .get('/doneworkouts/all')
      .expect(200)

    expect(response.body.length).toBe(0)
  })

  test('Done workout can be added', async () => {
    const postToAdd = {
      content: 'TEHTY',
      image: 'tässäonkuva',
      type: 'doneworkout',
      likes: 0
    }

    const response = await api
      .post('/doneworkouts/new')
      .send(postToAdd)
      .set({ Authorization: token })
      .expect(201)
  })

  test('One workout returned after posting', async () => {
    const response = await api
      .get('/doneworkouts/all')
      .expect(200)

    expect(response.body.length).toBe(1)
    expect(response.body[0].content).toEqual('TEHTY')
  })

  test('Done workout can be returned with id', async () => {
    let response = await api.get('/doneworkouts/all')

    const id = response.body[0]._id

    response = await api
      .get(`/doneworkouts/${id}`)
      .expect(200)

    expect(response.body.content).toEqual('TEHTY')
  })

  test('Done workout can be returned with date', async () => {
    const dateString = dates.getDateString(new Date())
    
    const response = await api
      .get(`/doneworkouts/byfriends/${dateString}`)
      .set({ Authorization: token })
      .expect(200)
    
    //expect(response.body.content).toEqual('TEHTY')
  })

  test('Done workout can be updated', async () => {
    let response = await api.get('/doneworkouts/all')

    const id = response.body[0]._id

    await api
      .put(`/doneworkouts/${id}`)
      .send({ content: 'MODDED' })
      .set({ Authorization: token })
      .expect(200)

    response = await api.get('/doneworkouts/all')

    expect(response.body[0].content).toEqual('MODDED')
  })
})