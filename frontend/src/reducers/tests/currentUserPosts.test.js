import currentUserPostsReducer from '../currentUserPosts'

const testPosts = [
  'test',
  'test2',
  'test3'
]

describe('currentUserPostsReducer', () => {
  it('Returns null on initial state', () => {
    expect(currentUserPostsReducer(undefined, {})).toEqual([])
  })

  it('INIT_USER_POSTS, no initial state', () => {
    expect(currentUserPostsReducer(undefined, { type: 'INIT_USER_POSTS', data: testPosts }))
      .toEqual(testPosts)
  })

  it('INIT_USER_POSTS, initial state', () => {
    expect(currentUserPostsReducer([ 'testiposti' ], { type: 'INIT_USER_POSTS', data: testPosts }))
      .toEqual(testPosts)
  })
})