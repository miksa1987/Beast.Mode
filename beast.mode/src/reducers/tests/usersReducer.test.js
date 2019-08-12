import usersReducer from '../usersReducer'

describe('usersReducer', () => {
  it('Returns initial state', () => {
    expect(usersReducer(undefined, {}))
      .toEqual([])
  })

  it('INIT_USERS', () => {
    expect(usersReducer(undefined, { type: 'INIT_USERS', data: [ '1', '2' ] }))
      .toEqual([ '1', '2' ])
  })
})