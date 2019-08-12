import currentProfileReducer from '../currentProfile'

const testprofile = {
  username: 'mniksa',
  id: '1234',
  posts: []
}

describe('currentProfileReducer', () => {
  it('Returns initial state', () => {
    expect(currentProfileReducer(undefined, {})).toEqual({})
  })

  it('INIT_CURRENT_PROFILE, no initial state', () => {
    expect(currentProfileReducer(undefined, { type: 'INIT_CURRENT_PROFILE', data: testprofile }))
      .toEqual(testprofile)
  })

  it('INIT_CURRENT_PROFILE, initial state', () => {
    expect(currentProfileReducer({ username: 'jokumuu' }, { type: 'INIT_CURRENT_PROFILE', data: testprofile }))
      .toEqual(testprofile)
  })
})