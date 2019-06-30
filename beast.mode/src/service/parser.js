const regex0 = /\d\d?x\d\d?\s+\D+/
const regex1 = /\d\d?\s+\D+/

const isWorkout = (post) => {
  if(regex0.exec(post) || regex1.exec(post)) {
    return true
  }

  return false
}

const getExercisesFrom = (post) => {
  const lines = post.split('\n')
  let exercises = []
  lines.forEach(line => {
    if(regex0.exec(line) || regex1.exec(line)) {
      const exercise = line.substring(line.indexOf(' '))
      exercises = exercises.concat(exercise)
    }
  })

  return exercises
}

export default { isWorkout, getExercisesFrom }