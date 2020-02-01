
import { 
  initCurrentWorkout, 
  setCurrentWorkoutExercises, 
  setCurrentWorkoutExerciseDone,
  setCurrentWorkoutExerciseUndone,
  setCurrentWorkoutDone,
  commentWorkout,
  likeWorkout } from '../currentWorkout'
import { 
  mockWorkout, 
  mockExercises, 
  mockExercisesOneDone, 
  mockWorkoutExerciseDone,
  doneWorkout,
  workout } from './mockedWorkouts'
import communicationService from '../../service/communication'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])
const store = mockStore({ currentUser: { id: '1' }})

jest.mock('../../service/communication')

beforeEach(() => {
  store.clearActions()
})

describe('currentWorkout actions', () => {
  it('initCurrentWorkout', async () => {
    const mockData = { content: '5x5 test\n5x10 test'}

    communicationService.get.mockResolvedValue(mockData)
    
    const expectedActions = [
      { type: 'SET_CURRENT_WORKOUT', data: mockWorkout }
    ]

    await store.dispatch(initCurrentWorkout('124'))

    expect(store.getActions()).toEqual(expectedActions)
  })

  it('setCurrentWorkoutExercises', async () => {
    const expectedActions = [
      { type: 'SET_CURRENT_WORKOUT_EXERCISES', data: mockExercises }
    ]

    await store.dispatch(setCurrentWorkoutExercises(mockExercises))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('setCurrentWorkoutExerciseDone', async () => {
    const dispatch = jest.fn()
    const getState = jest.fn(() => {
      return { currentWorkout: { exercises: mockExercises }}
    })
    
    await setCurrentWorkoutExerciseUndone(0, 0)(dispatch, getState)

    expect(dispatch).toBeCalledWith({ type: 'SET_CURRENT_WORKOUT_EXERCISES', data: mockExercises })
  })

  it('setCurrentWorkoutExerciseUndone', async () => {
    const dispatch = jest.fn()
    const getState = jest.fn(() => {
      return { currentWorkout: { exercises: mockExercisesOneDone }}
    })
    
    await setCurrentWorkoutExerciseUndone(0, 0)(dispatch, getState)

    expect(dispatch).toBeCalledWith({ type: 'SET_CURRENT_WORKOUT_EXERCISES', data: mockExercisesOneDone })
  })

  it('setCurrentWorkoutDone', async () => {
    const mockState = {
      currentUser: {
        username: 'Miksa',
        id: '1',
        activity: []
      }
    }
    communicationService.post.mockResolvedValue(doneWorkout)
    const dispatch = jest.fn()
    const getState = jest.fn(() => mockState)

    await setCurrentWorkoutDone(doneWorkout)(dispatch, getState)

    // MORE TO EXPECT!
    expect(dispatch).toBeCalledWith({ type: 'ADD_NEW_TO_FEED', data: doneWorkout })
    expect(dispatch).toBeCalledWith({ type: 'SET_CURRENT_WORKOUT_DONE' })
  })

  it('commentWorkout', async () => {
    const mockState = { currentWorkout: workout }
    const changedWorkout = { ...workout, comments: [ 'TEST' ]}
    communicationService.post.mockResolvedValue(changedWorkout)

    const dispatch = jest.fn()
    const getState = jest.fn(() => mockState)

    await commentWorkout('TEST', '1')(dispatch, getState)

    expect(dispatch).toBeCalledWith({ type: 'SET_CURRENT_WORKOUT', data: changedWorkout }) // Y U NO DISPATCH NEW DATA?!?!
  })

  it('commentWorkout', async () => {
    const mockState = { currentWorkout: workout }
    const changedWorkout = { ...workout, likes: [ '1' ]}
    communicationService.post.mockResolvedValue(changedWorkout)

    const dispatch = jest.fn()
    const getState = jest.fn(() => mockState)

    await likeWorkout('TEST', '1')(dispatch, getState)

    expect(dispatch).toBeCalledWith({ type: 'SET_CURRENT_WORKOUT', data: changedWorkout }) 
  })
})