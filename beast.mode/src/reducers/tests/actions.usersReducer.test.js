import { initUsers } from '../usersReducer'
import communicationService from '../../service/communication'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])
const store = mockStore()

jest.mock('../../service/communication')

beforeEach(() => {
  store.clearActions()
})

describe('users actions', () => {
  it('initUsers', async () => {
    const expectedActions = [
      { type: 'INIT_USERS', data: [ '1', '2' ]}
    ]
    communicationService.get.mockResolvedValue([ '1', '2' ])

    await store.dispatch(initUsers())
    expect(store.getActions()).toEqual(expectedActions)
  })
})