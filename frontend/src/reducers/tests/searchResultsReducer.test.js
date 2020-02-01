import searchResultsReducer from '../searchResultsReducer'

const initialState = {
  results: [],
  loadedUntil: 0,
  loading: true,
  end: false
}

const someState = {
  results: [ '1', '2' ],
  loadedUntil: 0,
  loading: true,
  end: false
}

describe('searchResultsReducer', () => {
  it('Returns initial state', () => {
    expect(searchResultsReducer(undefined, {}))
      .toEqual(initialState)
  })

  it('SET_SEARCH_RESULTS', () => {
    expect(searchResultsReducer(initialState, { type: 'SET_SEARCH_RESULTS', data: [ '1', '2' ] }))
      .toEqual({ ...initialState, results: [ '1', '2' ]})
  })

  it('SET_SEARCH_RESULTS with many equal results', () => {
    expect(searchResultsReducer(initialState, { type: 'SET_SEARCH_RESULTS', data: [ '1', '2', '2', '2' ] }))
      .toEqual({ ...initialState, results: [ '1', '2' ]})
  })

  it('EMPTY_SEARCH_RESULTS', () => {
    expect(searchResultsReducer(someState, { type: 'EMPTY_SEARCH_RESULTS' }))
      .toEqual(initialState)
  })

  it('SET_SEARCH_LOADING', () => {
    expect(searchResultsReducer(undefined, { type: 'SET_SEARCH_LOADING', data: true }))
      .toEqual({ ...initialState, loading: true })
  })

  it('SET_SEARCH_LOADED_UNTIL', () => {
    expect(searchResultsReducer(undefined, { type: 'SET_SEARCH_LOADED_UNTIL', data: '2019-8-12' }))
      .toEqual({ ...initialState, loadedUntil: '2019-8-12' })
  })

  it('SET_SEARCH_END', () => {
    expect(searchResultsReducer(undefined, { type: 'SET_SEARCH_END', data: true }))
      .toEqual({ ...initialState, end: true })
  })
})