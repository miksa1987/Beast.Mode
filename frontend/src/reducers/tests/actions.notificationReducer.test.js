import { setNotification } from '../notificationReducer'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])
const store = mockStore({ currentUser: { id: '1' }})

jest.useFakeTimers()

beforeEach(() => {
  store.clearActions()
})

describe('notification action', () => {
  it('setNotification', async () => {
    const expectedActions = [
      { type: 'SET_NOTIFICATION_MESSAGE', data: 'test' },
    ]

    await store.dispatch(setNotification('test', 0.001)) // Small delay only
    
    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(store.getActions()).toEqual(expectedActions)
  })
})