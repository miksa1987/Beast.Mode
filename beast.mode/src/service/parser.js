const regex0 = /\d\d?x\d\d?\s+\D+/
const regex1 = /^\d\d?\s+\D+/
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

const parseWorkout = (post) => {
  if (post !== '') {
    let workout = { exercises: [], rounds: 0 }
    const lines = post.split('\n')

    lines.forEach(line => {
      if (isWorkout(line) && !(line.includes('rounds'))) {
        workout.exercises.push(line)
        workout.rounds 
      }
    })

    if (exercises.length > 0) {
      console.log('workout parsing')
      if (parser.match0(exercises[0])) {
        console.log('type 0')
        setParsedWorkout(doWorkoutType0(exercises))
        console.log(parsedWorkout)
      }
      if (parser.match1(exercises[0])) {
        console.log('type 1')
        const rounds = lines.find(line => parser.matchRounds(line))
        setParsedWorkout(doWorkoutType1(exercises, rounds))
      }
    }
  }
}

// Example: 5 pullups. Returns null if fails.
const getRepsAndExercise = (text) => {
  if (!match1(text)) return null

  const whereToSplit = text.indexOf(' ')
  const reps = Number(text.substring(0, whereToSplit))

  if (typeof reps !== 'number') return null

  const exercise = text.substring((whereToSplit + 1), (text.length - whereToSplit))

  return { exercise, reps, done: false }
}

// Example: 5x5 pullups. Returns null if fails.
const getRepsSetsAndExercise = (text) => {
  if (!match0(text)) return null
  const whereToSplit = text.indexOf('x')
  const sets = Number(text.substring(0, whereToSplit))
  if (typeof sets !== 'number') return null
  const repsExercise = text.substring((whereToSplit + 1), (text.length - whereToSplit))

  let setsRepsExercises = []
  for (let i = 0; i < sets; i++) setsRepsExercises.push(getRepsAndExercise(repsExercise))

  console.log(setsRepsExercises)
  return setsRepsExercises
}

const doWorkoutType0 = (exercises) => {
  let readyWorkout = { type: '0', exercises: [] }

  exercises.forEach(line => {
    const splits = line.split('x')
    let sets = []
    if(splits.length === 2) {
      for (let i = 0; i < Number(splits[0]); i++) {
        sets.push(splits[1])
      }
    }
    console.log(`sets ${sets}`)
    sets = sets.map((set, i) => <Exercise key={i} exercise={set} />)
    readyWorkout.exercises.push(sets)
  })
  console.log(readyWorkout)
  return readyWorkout
}

// Thought this was going to be longer but....
const doWorkoutType1 = (exercises, rounds) => {
  let readyWorkout = { type: '1', exercises, rounds }
  readyWorkout.exercises = readyWorkout.exercises.map((ex, i) => <OneSetExercise key={i} exercise={ex} />)
  return readyWorkout
}

export default { isWorkout, match0, match1, matchRounds, getExercisesFrom, parseWorkout }