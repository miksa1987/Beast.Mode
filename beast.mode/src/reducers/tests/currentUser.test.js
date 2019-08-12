import currentUserReducer from '../currentUser'

const testUser = {
  username: 'miksa',
  id: '1234'
}

describe('currentUserReducer', () => {
  it('Returns null on initial state', () => {
    expect(currentUserReducer(undefined, {})).toEqual(null)
  })

  it('SET_USER, no initial state', () => {
    expect(currentUserReducer(undefined, { type: 'SET_USER', data: testUser })).toEqual(testUser)
  })

  it('SET_USER, initial state', () => {
    expect(currentUserReducer({ username: 'jokumuu' }, { type: 'SET_USER', data: testUser })).toEqual(testUser)
  })
})