import { initUserPosts } from '../currentUserPosts'
import communicationService from '../../service/communication'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])
const store = mockStore({ currentUser: { id: '1' }})

jest.mock('../../service/communication')

beforeEach(() => {
  store.clearActions()
})

describe('currentUserPosts actions', () => {
  it('initUserPosts', async () => {
    const mockData = [ '1', '2', '3' ]

    communicationService.get.mockResolvedValue(mockData)

    const expectedActions = [
      { type: 'INIT_USER_POSTS', data: [] },
      { type: 'INIT_USER_POSTS', data: mockData}
    ]

    await store.dispatch(initUserPosts('123'))

    expect(store.getActions()).toEqual(expectedActions)
  })
})