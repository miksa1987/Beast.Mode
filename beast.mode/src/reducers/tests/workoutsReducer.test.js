import workoutsReducer from '../workoutsReducer'

describe('workoutsReducer', () => {
  it('Returns initial state', () => {
    expect(workoutsReducer(undefined, {}))
      .toEqual([])
  })

  it('INIT_WORKOUTS', () => {
    expect(workoutsReducer(undefined, { type: 'INIT_WORKOUTS', data: [ '1', '2' ]}))
      .toEqual([ '1', '2' ])
  })

  it('ADD_WORKOUT', () => {
    expect(workoutsReducer([ '1', '2' ], { type: 'ADD_WORKOUT', data: '3' }))
      .toEqual([ '1', '2', '3' ])
  })

  it('EMPTY_WORKOUTS', () => {
    expect(workoutsReducer([ '1', '2' ], { type: 'EMPTY_WORKOUTS' }))
      .toEqual([])
  })
})