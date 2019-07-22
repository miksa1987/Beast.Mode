import communicationService from '../service/communication'

const searchResultReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SEARCH_ITEMS':
      return action.data
    case 'EMPTY_SEARCH_ITEMS':
      return []
    default:
      return state
  }
}

export const emptySearchItems = () => {
  return dispatch => {
    dispatch({ type: 'EMPTY_SEARCH_ITEMS' })
  }
}

export const setSearchItems = (searchterm, type) => {
  return async dispatch => {
    const searchResult = await communicationService.post('/search', { search: searchterm, type })
    dispatch({ type: 'SET_SEARCH_ITEMS', data: searchResult })
  }
}

export default searchResultReducer