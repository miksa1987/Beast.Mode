import { loginUser, setUser, logoutUser, addFriend, removeFriend, updateUser } from '../currentUser'
import communicationService from '../../service/communication'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])
const store = mockStore({ currentUser: { id: '1' }})

jest.mock('../../service/communication')

beforeEach(() => {
  store.clearActions()
})

describe('currentUser actions', () => {
  it('loginUser', async () => {
    const mockData = { id: '1', username: 'Miksa', token: 'afaf' }

    communicationService.post.mockResolvedValue(mockData)
    communicationService.setToken.mockResolvedValue(mockData.token)

    const expectedActions = [
      { type: 'SET_USER', data: mockData },
      { type: 'SET_NOTIFICATION_MESSAGE', data: 'Miksa logged in' }
    ]

    await store.dispatch(loginUser(mockData))

    expect(store.getActions()).toEqual(expectedActions)
  })

  it('setUser', async () => {
    const mockData = { id: '1', username: 'Miksa', token: 'afaf' }

    communicationService.post.mockResolvedValue(mockData)
    communicationService.setToken.mockResolvedValue(mockData.token)

    const expectedActions = [
      { type: 'SET_USER', data: mockData }
    ]

    await store.dispatch(setUser(mockData))

    expect(store.getActions()).toEqual(expectedActions)
  })

  it('logoutUser', async () => {
    const expectedActions = [
      { type: 'SET_USER', data: null }
    ]

    await store.dispatch(logoutUser())

    expect(store.getActions()).toEqual(expectedActions)
  })

  it('addFriend', async () => {
    const mockData = { id: '1', username: 'Miksa', token: 'afaf', friends: [ '123' ] }

    communicationService.post.mockResolvedValue(mockData)

    const expectedActions = [
      { type: 'SET_USER', data: mockData }
    ]

    await store.dispatch(addFriend('123'))
    
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('addFriend', async () => {
    const mockData = { id: '1', username: 'Miksa', token: 'afaf', friends: [ '123' ] }

    communicationService.post.mockResolvedValue(mockData)

    const expectedActions = [
      { type: 'SET_USER', data: mockData }
    ]

    await store.dispatch(removeFriend('123'))
    
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('updateUser', async () => {
    const mockData = { id: '1', username: 'Miksa', token: 'afaf', friends: [ '123' ] }

    communicationService.update.mockResolvedValue(mockData)

    const expectedActions = [
      { type: 'SET_USER', data: mockData }
    ]

    await store.dispatch(updateUser(mockData))
    
    expect(store.getActions()).toEqual(expectedActions)
  })
})

