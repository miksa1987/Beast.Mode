const moment            = require('moment')
const dates             = require('./dates')
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
}

const getOldestPost = () => oldestPost
const getOldestWorkout = () => oldestWorkout
const getOldestDoneWorkout = () => oldestDoneWorkout

const getOldest = () => {
  const post = dates.getDateString(oldestPost)
  const workout = dates.getDateString(oldestWorkout)
  const doneworkout = dates.getDateString(oldestDoneWorkout)

  if (moment(post, 'YYYY-M-D-H-m').isBefore(moment(workout, 'YYYY-M-D-H-m')) &&
  moment(post, 'YYYY-M-D-H-m').isBefore(moment(doneworkout, 'YYYY-M-D-H-m'))) {
    return oldestPost
  }

  if (moment(workout, 'YYYY-M-D-H-m').isBefore(moment(post, 'YYYY-M-D-H-m')) &&
  moment(workout, 'YYYY-M-D-H-m').isBefore(moment(doneworkout, 'YYYY-M-D-H-m'))) {
    return oldestWorkout
  }

  return oldestDoneWorkout
}

module.exports = { setOldest, getOldestPost, getOldestWorkout, getOldestDoneWorkout, getOldest }