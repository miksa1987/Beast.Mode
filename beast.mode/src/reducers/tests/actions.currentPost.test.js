import { initCurrentPost, commentCurrentPost, likeCurrentPost } from '../currentPost'
import communicationService from '../../service/communication'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])
const store = mockStore({})

jest.mock('../../service/communication')

beforeEach(() => {
  store.clearActions()
})

describe('currentPost actions', () => {
  it('initCurrentPost', async () => {
    const mockData = { _id: '1', content: 'TEST' }

    communicationService.get.mockResolvedValue(mockData)

    const expectedActions = [
      { type: 'LOAD_CURRENT_POST', data: mockData }
    ]

    await store.dispatch(initCurrentPost('post', '1'))

    expect(store.getActions()).toEqual(expectedActions)
  })

  it('commentCurrentPost', async () => {
    const mockData = { _id: '1', content: 'TEST', comment: 'TEST' }

    communicationService.post.mockResolvedValue(mockData)

    const expectedActions = [
      { type: 'LOAD_CURRENT_POST', data: mockData }
    ]

    await store.dispatch(commentCurrentPost('post', '1', 'TEST'))
    
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('likeCurrentPost', async () => {
    const mockData = { _id: '1', content: 'TEST', likes: [ '12344' ] }

    communicationService.post.mockResolvedValue(mockData)

    const expectedActions = [
      { type: 'LOAD_CURRENT_POST', data: mockData }
    ]

    await store.dispatch(likeCurrentPost('post', '1'))
    
    expect(store.getActions()).toEqual(expectedActions)
  })
})