const Post              = require('../models/Post')
const DoneWorkout       = require('../models/DoneWorkout')
const Workout           = require('../models/Workout')

let oldestPost        = ''
let oldestWorkout     = ''
let oldestDoneWorkout = ''

const setOldest = async () => {
  const post = await Post.findOne().sort({ _id: 1 }).limit(1)
  const workout = await Workout.findOne().sort({ _id: 1 }).limit(1)
  const doneworkout = await DoneWorkout.findOne().sort({ _id: 1 }).limit(1)

  oldestPost = post.date
  oldestWorkout = workout.date
  oldestDoneWorkout = doneworkout.date

  console.log(typeof oldestPost)
  console.log(oldestPost.getFullYear())
  console.log(oldestDoneWorkout)
  console.log(oldestWorkout)
}

const getOldestPost = () => oldestPost
const getOldestWorkout = () => oldestWorkout
const getOldestDoneWorkout = () => oldestDoneWorkout

module.exports = { setOldest, getOldestPost, getOldestWorkout, getOldestDoneWorkout }