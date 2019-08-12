import notificationReducer from '../notificationReducer'

describe('notificationReducer', () => {
  it('Returns initial state', () => {
    expect(notificationReducer(undefined, {}))
      .toEqual('')
  })

  it('SET_NOTIFICATION_MESSAGE', () => {
    expect(notificationReducer(undefined, { type: 'SET_NOTIFICATION_MESSAGE', data: 'test' }))
      .toEqual('test')
  })
})