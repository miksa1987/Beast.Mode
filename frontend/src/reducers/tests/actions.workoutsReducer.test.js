import {
  initAllWorkouts,
  initWorkouts,
  initNewestWorkouts,
  initRandomWorkouts,
  initFriendWorkouts,
  initMostLikedWorkouts,
  addWorkout
} from '../workoutsReducer'
import communicationService from '../../service/communication'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])
const store = mockStore()

jest.mock('../../service/communication')

beforeEach(() => {
  store.clearActions()
})

describe('workouts actions', () => {
  it('initAllWorkouts', async () => {
    const expectedActions = [
      { type: 'INIT_WORKOUTS', data: [ '1', '2' ]}
    ]
    communicationService.get.mockResolvedValue([ '1', '2' ])

    await store.dispatch(initAllWorkouts())
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('initWorkouts', async () => {
    const expectedActions = [
      { type: 'INIT_WORKOUTS', data: [ '1', '2' ]}
    ]
    communicationService.get.mockResolvedValue([ '1', '2' ])

    await store.dispatch(initWorkouts('1'))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('initNewestWorkouts', async () => {
    const expectedActions = [
      { type: 'INIT_WORKOUTS', data: [ '1', '2' ]}
    ]
    communicationService.get.mockResolvedValue([ '1', '2' ])

    await store.dispatch(initNewestWorkouts())
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('initRandomWorkouts', async () => {
    const expectedActions = [
      { type: 'INIT_WORKOUTS', data: [ '1', '2' ]}
    ]
    communicationService.get.mockResolvedValue([ '1', '2' ])

    await store.dispatch(initRandomWorkouts())
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('initFriendWorkouts', async () => {
    const expectedActions = [
      { type: 'INIT_WORKOUTS', data: [ '1', '2' ]}
    ]
    communicationService.get.mockResolvedValue([ '1', '2' ])

    await store.dispatch(initFriendWorkouts())
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('initMostLikedWorkouts', async () => {
    const expectedActions = [
      { type: 'INIT_WORKOUTS', data: [ '1', '2' ]}
    ]
    communicationService.get.mockResolvedValue([ '1', '2' ])

    await store.dispatch(initMostLikedWorkouts())
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('addWorkout', async () => {
    const expectedActions = [
      { type: 'ADD_WORKOUT', data: '1' }
    ]

    await store.dispatch(addWorkout('1'))
    expect(store.getActions()).toEqual(expectedActions)
  })
})