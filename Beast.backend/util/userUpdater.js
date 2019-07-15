const User = require('../models/User')

const addToPictures = async (id, uri) => {
  const user = await User.findById(id)
  if (user === null) return

  const newPictures = user.pictures.concat(uri)

  const userToUpdate = {
    username: user.username,
    passwordHash: user.passwordHash,
    picture: user.picture,
    pictures: newPictures,
    info: user.info,
    age: user.age,
    activity: user.activity,
    postCount: user.postCount,
    workoutCount: user.workoutCount,
    doneWorkoutCount: user.doneWorkoutCount,
    friends: user.friends,
    posts: user.posts,
    workouts: user.workouts,
    doneWorkouts: user.doneWorkouts
  }

  const updatedUser = await User.findByIdAndUpdate(id, userToUpdate, { new: true })

  return updatedUser
}

const addToPosts = async (id, postid) => {
  const user = await User.findById(id)
  if (user === null) return

  const newPosts = user.posts.concat(postid)

  const userToUpdate = {
    username: user.username,
    passwordHash: user.passwordHash,
    picture: user.picture,
    pictures: user.pictures,
    info: user.info,
    age: user.age,
    activity: user.activity,
    postCount: user.postCount + 1,
    workoutCount: user.workoutCount,
    doneWorkoutCount: user.doneWorkoutCount,
    friends: user.friends,
    posts: newPosts,
    workouts: user.workouts,
    doneWorkouts: user.doneWorkouts
  }

  const updatedUser = await User.findByIdAndUpdate(id, userToUpdate, { new: true })

  return updatedUser
}

const addToWorkouts = async (id, workoutid) => {
  const user = await User.findById(id)
  if (user === null) return

  const newWorkouts = user.workouts.concat(workoutid)

  const userToUpdate = {
    username: user.username,
    passwordHash: user.passwordHash,
    picture: user.picture,
    pictures: user.pictures,
    info: user.info,
    age: user.age,
    activity: user.activity,
    postCount: user.postCount,
    workoutCount: user.workoutCount + 1,
    doneWorkoutCount: user.doneWorkoutCount,
    friends: user.friends,
    posts: user.posts,
    workouts: newWorkouts,
    doneWorkouts: user.doneWorkouts
  }

  const updatedUser = await User.findByIdAndUpdate(id, userToUpdate, { new: true })

  return updatedUser
}

module.exports = { addToPictures, addToPosts, addToWorkouts }