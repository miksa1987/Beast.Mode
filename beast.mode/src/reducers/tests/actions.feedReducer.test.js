import {
  emptyFeed,
  initFeed,
  loadMorePosts,
  addNewToFeed,
  addToFeed,
  removeFromFeed,
  setEndDate,
  addComment,
  like
} from '../feedReducer'
import communicationService from '../../service/communication'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])
const store = mockStore({ currentUser: { id: '1' }})

jest.mock('../../service/communication')

beforeEach(() => {
  store.clearActions()
})

describe('feed actions', () => {
  it('emptyFeed', async () => {
    const expectedActions = [{ type: 'EMPTY_FEED' }]
    await store.dispatch(emptyFeed())
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('initFeed, no data', async () => {
    const mockState = {
      currentUser: { username: 'Miksa', id: '1', friends: [], posts: [], doneworkouts: [] },
      feed: { endDate: '2019-1-11' }
    }
    const dispatch = jest.fn()
    const getState = jest.fn(() => mockState)

    await initFeed()(dispatch, getState)

    expect(dispatch).toBeCalledWith({ type: 'SET_FEED_LOADED_UNTIL_TO', data: '2019-1-11' })
    expect(dispatch).toBeCalledWith({ type: 'SET_FEED_END', data: true })
    expect(dispatch).toBeCalledWith({ type: 'SET_FEED_LOADING_TO', data: false })
  })

  if('initFeed with data, end', async () => {
    const mockState = {
      currentUser: { username: 'Miksa', id: '1', friends: [], posts: [], doneworkouts: [] },
      feed: { endDate: '2019-1-11' }
    }
    const mockData = { posts: [], doneworkouts: [], startdate: '0', enddate: '1', end: true}
    const dispatch = jest.fn()
    const getState = jest.fn(() => mockState)
    communicationService.get.mockResolvedValue(mockData)
    
    await initFeed()(dispatch, getState)

    expect(dispatch).toBeCalledWith({ type: 'SET_FEED_LOADING_TO', data: true })
    expect(dispatch).toBeCalledWith({ type: 'SET_FEED_END', data: true })
    expect(dispatch).toBeCalledWith({ type: 'SET_FEED_LOADING_TO', data: false })
    expect(dispatch).toBeCalledWith({ type: 'SET_FEED_LOADED_UNTIL_TO', data: '1' })
    expect(dispatch).toBeCalledWith({ type: 'ADD_TOFEED', data: [ '0', '1', '0', '1' ] })
  })

  it('loadMorePosts with no data', async () => {
    const mockState = {
      currentUser: { username: 'Miksa', id: '1', friends: [], posts: [], doneworkouts: [] },
      feed: { endDate: '2019-1-11' }
    }
    const mockData = { posts: [], doneworkouts: [], startdate: '0', enddate: '1', end: false}
    const dispatch = jest.fn()
    const getState = jest.fn(() => mockState)
    communicationService.get.mockResolvedValue(mockData)

    await loadMorePosts()(dispatch, getState)

    expect(dispatch).toBeCalledWith({ type: 'SET_FEED_LOADED_UNTIL_TO', data: '2019-1-11' })
    expect(dispatch).toBeCalledWith({ type: 'SET_FEED_END', data: true })
  })

  it('loadMorePosts with data, no end', async () => {
    const mockState = {
      currentUser: { username: 'Miksa', id: '1', friends: [ '1' ], posts: [], doneworkouts: [] },
      feed: { endDate: '2019-1-11' }
    }
    const mockData = { posts: [ '0' ], doneworkouts: [ '1' ], startdate: '1', enddate: '2', end: false}
    const dispatch = jest.fn()
    const getState = jest.fn(() => mockState)
    communicationService.get.mockResolvedValue(mockData)

    await loadMorePosts()(dispatch, getState)

    expect(dispatch).toBeCalledWith({ type: 'SET_FEED_LOADING_TO', data: true })
    expect(dispatch).toBeCalledWith({ type: 'SET_FEED_LOADING_TO', data: false })
    expect(dispatch).toBeCalledWith({ type: 'SET_FEED_LOADED_UNTIL_TO', data: '1' })
    expect(dispatch).toBeCalledWith({ type: 'ADD_TOFEED', data: [ '0', '1', '0', '1' ] })
  })

  it('loadMorePosts with data, end', async () => {
    const mockState = {
      currentUser: { username: 'Miksa', id: '1', friends: [ '1' ], posts: [], doneworkouts: [] },
      feed: { endDate: '2019-1-11' }
    }
    const mockData = { posts: [ '0' ], doneworkouts: [ '1' ], startdate: '1', enddate: '2', end: true}
    const dispatch = jest.fn()
    const getState = jest.fn(() => mockState)
    communicationService.get.mockResolvedValue(mockData)

    await loadMorePosts()(dispatch, getState)

    expect(dispatch).toBeCalledWith({ type: 'SET_FEED_LOADING_TO', data: true })
    expect(dispatch).toBeCalledWith({ type: 'SET_FEED_END', data: true })
    expect(dispatch).toBeCalledWith({ type: 'SET_FEED_LOADING_TO', data: false })
    expect(dispatch).toBeCalledWith({ type: 'SET_FEED_LOADED_UNTIL_TO', data: '1' })
    expect(dispatch).toBeCalledWith({ type: 'ADD_TOFEED', data: [ '0', '1', '0', '1' ] })
  })

  it('addNewToFeed', async () => {
    const mockData = { content: 'post', type: 'post' }
    communicationService.post.mockResolvedValue(mockData)

    const expectedActions = [
      { type: 'ADD_NEW_TO_FEED', data: mockData }
    ]

    await store.dispatch(addNewToFeed(mockData))

    expect(store.getActions()).toEqual(expectedActions)
  })

  it('addToFeed', async () => {
    const mockData = { content: 'test', type: 'post' }
    const expectedActions = [
      { type: 'ADD_NEW_TO_FEED', data: mockData }
    ]

    await store.dispatch(addToFeed(mockData))

    expect(store.getActions()).toEqual(expectedActions)
  })

  it('removeFromFeed', async () => {
    const expectedActions = [
      { type: 'REMOVE_FROMFEED', data: '1' }
    ]

    communicationService.destroy.mockResolvedValue(null)

    await store.dispatch(removeFromFeed({ _id: '1' }))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('setEndDate', async () => {
    const mockData = {
      oldest: '2019-7-1'
    }
    communicationService.get.mockResolvedValue(mockData)

    const expectedActions = [
      { type: 'SET_FEED_END_DATE', data: mockData.oldest }
    ]

    await store.dispatch(setEndDate())
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('addComment', async () => {
    const mockData = {
      content: 'test',
      _id: '1',
      type: 'post',
      comments: [ 'test' ],
      likes: []
    }
    communicationService.post.mockResolvedValue(mockData)

    const expectedActions = [
      { type: 'EDIT_POST_ON_FEED', data: mockData }
    ]

    await store.dispatch(addComment('post', '1', 'test'))
    console.log(store.getActions())
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('like', async () => {
    const mockData = {
      content: 'test',
      _id: '1',
      type: 'post',
      comments: [],
      likes: [ '1' ]
    }
    communicationService.post.mockResolvedValue(mockData)

    const expectedActions = [
      { type: 'EDIT_POST_ON_FEED', data: mockData }
    ]

    await store.dispatch(like('post', '1'))
    expect(store.getActions()).toEqual(expectedActions)
  })
})