import currentPostReducer from '../currentPost'

const testpost = {
  content: 'test',
  _id: '123',
  user: {
    username: 'miksa',
    id: '1234'
  }
}

describe('currentPostReducer', () => {
  it('Returns initial state', () => {
    expect(currentPostReducer(undefined, {})).toEqual({})
  })

  it('LOAD_CURRENT_POST when there is no state', () => {
    expect(currentPostReducer(undefined, {
      type: 'LOAD_CURRENT_POST',
      data: testpost
    })).toEqual(testpost)
  })

  it('LOAD_CURRENT_POST when there is state', () => {
    expect(currentPostReducer({ content: 'hölölöö' }, {
      type: 'LOAD_CURRENT_POST',
      data: testpost
    })).toEqual(testpost)
  })
})