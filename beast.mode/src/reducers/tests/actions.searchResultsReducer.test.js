import {
  emptySearchResults,
  setSearchResults,
  setSearchLoadedUntil,
  setSearchEnd
} from '../searchResultsReducer'
import communicationService from '../../service/communication'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])
const store = mockStore()

jest.mock('../../service/communication')

beforeEach(() => {
  store.clearActions()
})

describe('searchResultsReducer', () => {
  it('emptySearchResults', async () => {
    const expectedActions = [
      { type: 'EMPTY_SEARCH_RESULTS' }
    ]

    await store.dispatch(emptySearchResults())
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('setSearchLoadedUntil', async () => {
    const expectedActions = [
      { type: 'SET_SEARCH_LOADED_UNTIL', data: '2019-1-8' }
    ]

    await store.dispatch(setSearchLoadedUntil('2019-1-8'))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('setSearchEnd', async () => {
    const expectedActions = [
      { type: 'SET_SEARCH_END', data: true }
    ]

    await store.dispatch(setSearchEnd(true))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('setSearchResults all', async () => {
    const mockState = {
      search: {
        results: [],
        loadedUntil: 0,
        loading: true,
        end: true
      }
    }
    const mockData = {
      startdate: '0',
      enddate: '1',
      end: true,
      results: [ '1', '2' ]
    }
    const dispatch = jest.fn()
    const getState = jest.fn(() => mockState)
    communicationService.post.mockResolvedValue(mockData)

    await setSearchResults('12', 'all')(dispatch, getState)

    expect(dispatch).toHaveBeenCalledWith({ type: 'SET_SEARCH_LOADING', data: true })
    expect(dispatch).toHaveBeenCalledWith({ type: 'SET_SEARCH_RESULTS', data: [ '1', '2' ] })
    expect(dispatch).toHaveBeenCalledWith({ type: 'SET_SEARCH_LOADED_UNTIL', data: '0' })
    expect(dispatch).toHaveBeenCalledWith({ type: 'SET_SEARCH_LOADING', data: false })
  })

  it('setSearchResults user', async () => {
    const expectedActions = [
      { type: 'EMPTY_SEARCH_RESULTS' },
      { type: 'SET_SEARCH_LOADING', data: true},
      { type: 'SET_SEARCH_RESULTS', data: [ '1', '2' ]},
      { type: 'SET_SEARCH_LOADING', data: false}
    ]

    communicationService.post.mockResolvedValue([ '1', '2' ])

    await store.dispatch(setSearchResults('12', 'user'))

    expect(store.getActions()).toEqual(expectedActions)
  })
})