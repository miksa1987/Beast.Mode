import currentWorkoutReducer from '../currentWorkout'

const emptyWorkout = {
  id: '',
  type: null,
  exercises: [],
  time: {
    time: 0,
    visible: false
  },
  textcontent: '',
  done: false,
  comments: [],
  likes: [],
  picture: ''
}

const someWorkout = {
  id: '123',
  type: 0,
  exercises: [ 'pull up' ],
  time: {
    time: 150,
    visible: false
  },
  textcontent: '',
  done: false,
  comments: [],
  likes: [],
  picture: ''
}

describe('currentWorkoutReducer', () => {
  it('returns initial state', () => {
    expect(currentWorkoutReducer(undefined, {})).toEqual(emptyWorkout)
  })

  it('SET_CURRENT_WORKOUT', () => {
    expect(currentWorkoutReducer(undefined, { type: 'SET_CURRENT_WORKOUT', data: someWorkout }))
      .toEqual(someWorkout)
  })

  it('SET_CURRENT_WORKOUT_EXERCISES', () => {
    expect(currentWorkoutReducer(emptyWorkout, { type: 'SET_CURRENT_WORKOUT_EXERCISES', data: [ 'pull up' ] }))
      .toEqual({ ...emptyWorkout, exercises: [ 'pull up' ]})
  })

  it('SET_CURRENT_WORKOUT_DONE', () => {
    expect(currentWorkoutReducer(emptyWorkout, { type: 'SET_CURRENT_WORKOUT_DONE' }))
      .toEqual({ ...emptyWorkout, done: true, posted: true })
  })
})