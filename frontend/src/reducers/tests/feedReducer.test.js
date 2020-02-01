import feedReducer from '../feedReducer'

const initialState = {
  feed: [],
  loadedUntil: 0,
  loading: true,
  endDate: 0,
  end: false
}

const someState = {
  feed: [ '1', '2', '3' ],
  loadedUntil: 0,
  loading: true,
  endDate: 0,
  end: false
}

const someOtherState = {
  feed: [
    { _id: '1', content: 'test' },
    { _id: '2', content: 'test' }
  ],
  loadedUntil: 0,
  loading: true,
  endDate: 0,
  end: false
}

describe('feedReducer', () => {
  it('Returns initial state', () => {
    expect(feedReducer(undefined, {})).toEqual(initialState)
  })

  it('EMPTY_FEED', () => {
    expect(feedReducer(someState, { type: 'EMPTY_FEED' }))
      .toEqual(initialState)
  })

  it('INIT_FEED', () => {
    expect(feedReducer(undefined, { type: 'INIT_FEED', data: [ '1', '2' ] }))
      .toEqual({ ...initialState, feed: [ '1', '2' ] })
  })

  it('ADD_NEW_TO_FEED', () => {
    expect(feedReducer(someState, { type: 'ADD_NEW_TO_FEED', data: '0' }))
      .toEqual({ ...someState, feed: [ '0', '1', '2', '3' ] })
  })

  it('ADD_TOFEED', () => {
    expect(feedReducer(someState, { type: 'ADD_TOFEED', data: '4' }))
      .toEqual({ ...someState, feed: [ '1', '2', '3', '4' ] })
  })

  it('REMOVE_FROMFEED', () => {
    expect(feedReducer(someOtherState, { type: 'REMOVE_FROMFEED', data: '1' }))
      .toEqual({ ...someOtherState, feed: [
        { _id: '2', content: 'test' }
      ] })
  })

  it('EDIT_POST_ON_FEED', () => {
    expect(feedReducer(someOtherState, { type: 'EDIT_POST_ON_FEED', data: { _id: '1', content: 'modded' } }))
      .toEqual({ ...someOtherState, feed: [
        { _id: '1', content: 'modded' },
        { _id: '2', content: 'test' }
      ] })
  })

  it('SET_FEED_LOADING_TO', () => {
    expect(feedReducer(initialState, { type: 'SET_FEED_LOADING_TO', data: true }))
      .toEqual({ ...initialState, loading: true})
  })

  it('SET_FEED_LOADED_UNTIL_TO', () => {
    expect(feedReducer(initialState, { type: 'SET_FEED_LOADED_UNTIL_TO', data: '2019-8-12' }))
      .toEqual({ ...initialState, loadedUntil: '2019-8-12' })
  })

  it('SET_FEED_END', () => {
    expect(feedReducer(initialState, { type: 'SET_FEED_END', data: true }))
      .toEqual({ ...initialState, end: true })
  })
})