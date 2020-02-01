import doneWorkoutsReducer from '../doneWorkoutsReducer'

const doneWorkouts = [
  'tehtytreeni',
  'toinentehtytreeni'
]

describe('doneWorkoutsReducer', () => {
  it('Returns initial state', () => {
    expect(doneWorkoutsReducer(undefined, {})).toEqual([])
  })

  it('INIT_DONE_WORKOUTS', () => {
    expect(doneWorkoutsReducer([], { type: 'INIT_DONE_WORKOUTS', data: doneWorkouts }))
      .toEqual(doneWorkouts)
  })

  it('ADD_DONE_WORKOUT', () => {
    expect(doneWorkoutsReducer(doneWorkouts, { type: 'ADD_DONE_WORKOUT', data: 'JEEE' }))
      .toEqual([ ...doneWorkouts, 'JEEE'])
  })
})