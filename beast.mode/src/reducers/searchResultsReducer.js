import communicationService from '../service/communication'

const initialState = {
  results: [],
  loadedUntil: 0,
  loading: false,
  end: false
}

const searchResultReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SEARCH_RESULTS':
      return { ...state, results: action.data }
    case 'EMPTY_SEARCH_RESULTS':
      return { ...state, results: [] }
    case 'SET_SEARCH_LOADED_UNTIL':
      return { ...state, loadedUntil: action.data }
    case 'SET_SEARCH_END':
      return { ...state, end: action.data }
    default:
      return state
  }
}

export const emptySearchItems = () => {
  return dispatch => {
    dispatch({ type: 'EMPTY_SEARCH_RESULTS' })
  }
}

export const setSearchItems = (searchterm, type) => {
  return async dispatch => {
    const searchResult = await communicationService.post('/search', { search: searchterm, type })
    dispatch({ type: 'SET_SEARCH_RESULTS', data: searchResult })
  }
}

export const setSearchLoadedUntil = (date) => {
  return dispatch => {
    dispatch({ type: 'SET_SEARCH_LOADED_UNTIL', data: date })
  }
}

export const setSearchEnd = (end) => {
  return dispatch => {
    dispatch({ type: 'SET_SEARCH_END', data: end })
  }
}

export default searchResultReducer