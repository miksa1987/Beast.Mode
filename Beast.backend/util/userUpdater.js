const User = require('../models/User')

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

module.exports = { addToPictures, addToPosts, addToWorkouts }