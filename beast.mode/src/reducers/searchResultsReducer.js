import communicationService from '../service/communication'
import moment from 'moment'
import uniqWith from 'lodash/uniqWith'
import isEqual from 'lodash/isEqual'

const initialState = {
  results: [],
  loadedUntil: 0,
  loading: true,
  end: false
}

const searchResultReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_SEARCH_RESULTS':
    const newResults = state.results.concat(action.data)
    const filteredResults = uniqWith(newResults, isEqual)
    return { ...state, results: filteredResults }
  case 'EMPTY_SEARCH_RESULTS':
    return initialState
  case 'SET_SEARCH_LOADING':
    return { ...state, loading: action.data }
  case 'SET_SEARCH_LOADED_UNTIL':
    return { ...state, loadedUntil: action.data }
  case 'SET_SEARCH_END':
    return { ...state, end: action.data }
  default:
    return state
  }
}

export const emptySearchResults = () => {
  return dispatch => {
    dispatch({ type: 'EMPTY_SEARCH_RESULTS' })
  }
}

export const setSearchResults = (keyword, type) => {
  return async (dispatch, getState) => {
    dispatch({ type: 'EMPTY_SEARCH_RESULTS' })
    dispatch({ type: 'SET_SEARCH_LOADING', data: true })
    
    if (type === 'user') {
      const results = await communicationService.post('/search', { keyword, type })
      
      dispatch({ type: 'SET_SEARCH_RESULTS', data: results })
      dispatch({ type: 'SET_SEARCH_LOADING', data: false })
      return
    }
    let date = moment().add(-24, 'hours').format('YYYY-M-D-H-m')

    let search = { results: [] }

    do {
      search = await communicationService.post(`/search/${date}`, { keyword, type })

      if (search.end) {
        dispatch({ type: 'SET_SEARCH_END', data: true })
      }
      date = moment(date, 'YYYY-M-D-H-m').add(-24, 'hours').format('YYYY-M-D-H-m')
      dispatch({ type: 'SET_SEARCH_RESULTS', data: search.results })
    } while (!getState().search.end) 
    dispatch({ type: 'SET_SEARCH_LOADED_UNTIL', data: search.startdate })
    dispatch({ type: 'SET_SEARCH_LOADING', data: false })
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