import communicationService from '../service/communication'
import moment from 'moment'

const initialState = {
  keyword: '',
  type: '',
  results: [],
  loadedUntil: 0,
  loading: false,
  end: false
}

const searchResultReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SEARCH_RESULTS':
      return { ...state, results: state.results.concat(action.data) }
    case 'EMPTY_SEARCH_RESULTS':
      return { ...state, results: [] }
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
    let date = moment().add(-24, 'hours').format('YYYY-M-D-H-m')
    dispatch({ type: 'EMPTY_SEARCH_RESULTS' })
    dispatch({ type: 'SET_SEARCH_KEYWORD', data: keyword})
    dispatch({ type: 'SET_SEARCH_TYPE', data: type })
    dispatch({ type: 'SET_SEARCH_LOADING', data: true })
    
    let search = { results: [] }
    console.log('start search')

    while (!getState().search.end) {
      console.log('while')
      search = await communicationService.post(`/search/${date}`, { keyword, type })

      if (search.end) {
        dispatch({ type: 'SET_SEARCH_END', data: true })
      }
      date = moment(date, 'YYYY-M-D-H-m').add(-24, 'hours').format('YYYY-M-D-H-m')
      console.log(date)
      dispatch({ type: 'SET_SEARCH_RESULTS', data: search.results })
    }
    dispatch({ type: 'SET_SEARCH_LOADED_UNTIL', data: search.startdate })
    dispatch({ type: 'SET_SEARCH_LOADING', data: false })
  }
}


export const loadMoreResults = () => {
  return async (dispatch, getState) => {
    let date = getState().search.loadedUntil

    dispatch({ type: 'SET_LOADING', data: true })
    let search = { results: [] }

    while (search.results.length === 0 && !getState().search.end) {
      search = await communicationService.post(`/search/${date}`, { 
        keyword: getState().search.keyword, 
        type: getState().search.type 
      })

      if (search.end) {
        dispatch({ type: 'SET_SEARCH_END', data: true })
      }

      date = moment(date, 'YYYY-M-D-H-m').add(-24, 'hours').format('YYYY-M-D-H-m')
      console.log(date)
    }
    dispatch({ type: 'SET_SEARCH_RESULTS', data: search.results })
    dispatch({ type: 'SET_SEARCH_LOADED_UNTIL', data: search.startdate })
    dispatch({ type: 'SET_LOADING', data: false })
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