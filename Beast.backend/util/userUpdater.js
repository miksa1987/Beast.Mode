const User        = require('../models/User')
const Post        = require('../models/Post')
const DoneWorkout = require('../models/DoneWorkout')

const addToPictures = async (id, uri) => {
  const user = await User.findById(id)
  if (user === null) return

  const newPictures = user.pictures.concat(uri)

  const userToUpdate = {
    ...user.toObject(),
    pictures: newPictures
  }

  const updatedUser = await User.findByIdAndUpdate(id, userToUpdate, { new: true })
  return updatedUser
}

const addToPosts = async (id, postid) => {
  const user = await User.findById(id)
  if (user === null) return

  const newPosts = user.posts.concat(postid)

  const userToUpdate = {
    ...user.toObject(),    
    posts: newPosts
}

  const updatedUser = await User.findByIdAndUpdate(id, userToUpdate, { new: true })
  return updatedUser
}

const addToWorkouts = async (id, workoutid) => {
  const user = await User.findById(id)
  if (user === null) return

  const newWorkouts = user.workouts.concat(workoutid)

  const userToUpdate = {
    ...user.toObject(),
    workouts: newWorkouts
  }

  const updatedUser = await User.findByIdAndUpdate(id, userToUpdate, { new: true })
  return updatedUser
}

const addToDoneWorkouts = async (id, doneworkoutid) => {
  const user = await User.findById(id)
  if (user === null) return

  const newDoneWorkouts = user.doneWorkouts.concat(doneworkoutid)

  const userToUpdate = {
    ...user.toObject(),
    doneWorkouts: newDoneWorkouts
  }

  const updatedUser = await User.findByIdAndUpdate(id, userToUpdate, { new: true })
  return updatedUser
}

const calculateFetchInterval = async (user) => {
  const friendsPostCount = await Post.countDocuments({ user: { $in: user.friends }})
  const friendsDoneworkoutCount = await DoneWorkout.countDocuments({ user: { $in: user.friends }})
  const total = friendsPostCount + friendsDoneworkoutCount + user.posts.length + user.doneWorkouts.length
    
  if (total < 50) return -384
  if (total < 150 && total > 50) return -192
  if (total < 300 && total > 150) return -96
  if (total < 1000 && total > 300) return -24
  if (total < 1500 && total > 1000) return -12
  if (total < 2500 && total > 1500) return -6
  if (total > 2500) return -4

}

module.exports = { addToPictures, addToPosts, addToWorkouts, addToDoneWorkouts, calculateFetchInterval }