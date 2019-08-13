import { initDoneWorkouts, addDoneWorkout } from '../doneWorkoutsReducer'
import communicationService from '../../service/communication'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])
const store = mockStore()

jest.mock('../../service/communication')

beforeEach(() => {
  store.clearActions()
})

describe('doneWorkouts actions', () => {
  it('initDoneWorkouts', async () => {
    const mockData = [ '1', '2' ]
    communicationService.get.mockResolvedValue(mockData)

    const expectedActions = [
      { type: 'INIT_DONE_WORKOUTS', data: mockData }
    ]

    await store.dispatch(initDoneWorkouts())

    expect(store.getActions()).toEqual(expectedActions)
  })

  it('addDoneWorkout', async () => {
    communicationService.post.mockResolvedValue('1')

    const expectedActions = [
      { type: 'ADD_DONE_WORKOUT', data: '1' }
    ]

    await store.dispatch(addDoneWorkout('1'))

    expect(store.getActions()).toEqual(expectedActions)
  })
})