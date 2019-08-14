const regex0 = /^\d\d?x\d\d?[ ]+\D+/
const regex1 = /(?!\d+ rounds)(^\d\d?[ ]+\D+)/
const rounds = /^\d\d\s+rounds/

const isWorkout = (post) => {
  if (regex0.exec(post) || regex1.exec(post)) {
    return true
  }
  return false
}

const match0 = (text) => {
  if (regex0.exec(text)) return true
  return false
}

const match1 = (text) => {
  if (regex1.exec(text)) return true
  return false
}

const matchRounds = (text) => {
  if (rounds.exec(text)) return true
  return false
}

const getExercisesFrom = (post) => {
  const lines = post.split('\n')
  let exercises = []
  lines.forEach(line => {
    if (regex0.exec(line) || regex1.exec(line)) {
      const exercise = line.substring(line.indexOf(' '))
      exercises = exercises.concat(exercise)
    }
  })

  return exercises
}

// Example: 5 pullups. Returns null if fails.
const getRepsAndExercise = (text) => {
  if (!match1(text)) return null

  const whereToSplit = text.indexOf(' ')
  const reps = Number(text.substring(0, whereToSplit))

  if (typeof reps !== 'number') return null

  const exercise = text.substring((whereToSplit + 1), (text.length - whereToSplit + 2))

  return { exercise, reps, done: false, doneReps: 0 }
}

// Example: 5x5 pullups. Returns null if fails.
const getRepsSetsAndExercise = (text) => {
  if (!match0(text)) return null
  const whereToSplit = text.indexOf('x')
  const sets = Number(text.substring(0, whereToSplit))
  if (typeof sets !== 'number') return null
  const repsExercise = text.substring((whereToSplit + 1), (text.length - whereToSplit + 1))

  let setsRepsExercises = []
  for (let i = 0; i < sets; i++) setsRepsExercises.push(getRepsAndExercise(repsExercise))

  return setsRepsExercises
}

const getRounds = (text) => {
  const whereToSplit = text.indexOf(' ')
  return Number(text.substring(0, whereToSplit))
}

// Naming....
const doExercises = (type, text) => {
  const exercises = []
  const lines = text.split('\n')

  if (type === '0') {
    lines.forEach(line => {
      if(match0(line)) exercises.push(getRepsSetsAndExercise(line))
    })
  }
  if (type === '1') {
    lines.forEach(line => {
      if(match1(line) && !matchRounds(line)) exercises.push(getRepsAndExercise(line))
    })
  }

  return exercises
}

const doWorkout = (text) => {
  let workout = {
    type: 0,
    exercises: [],
    rounds: 0,
    done: false,
    time: {
      time: 0,
      visible: false
    },
    textcontent: text
  }

  if(/^\d\d?x\d\d?\s+\D+/gm.exec(text)) workout.type = '0'
  if(/^\d\d?\s+\D+/gm.exec(text)) workout.type = '1'

  workout.exercises = doExercises(workout.type, text)

  if (workout.type === '1') {
    const lines = text.split('\n')
    lines.forEach(line => {
      if (matchRounds(line)) workout.rounds = getRounds(line)
    })
  }

  return workout
}

export default { isWorkout, match0, match1, matchRounds, getExercisesFrom, doWorkout }