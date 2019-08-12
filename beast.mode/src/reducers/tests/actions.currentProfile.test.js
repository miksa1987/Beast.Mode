import { initCurrentProfile } from '../currentProfile'
import communicationService from '../../service/communication'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])
const store = mockStore({})

jest.mock('../../service/communication')

beforeEach(() => {
  store.clearActions()
})

describe('currentProfile actions', () => {
  it('initCurrentProfile', async () => {
    const mockData = { id: '1', username: 'Miksa' }

    communicationService.get.mockResolvedValue(mockData)

    const expectedActions = [
      { type: 'INIT_CURRENT_PROFILE', data: mockData }
    ]
    
    await store.dispatch(initCurrentProfile('1'))

    expect(store.getActions()).toEqual(expectedActions)
  })
})