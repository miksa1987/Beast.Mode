const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/User')

const createOneUser = async (username) => {
  await User.deleteMany({})
    
  const pwHash = await bcrypt.hash('secret', 10)
  const user = new User({
    username,
    passwordHash: pwHash,
    picture: 'NOPICTURE',
    pictures: [],
    info: 'TERO TESTIKÄYTTÄJÄ',
    age: 31,
    activity: [],
    postCount: 0,
    workoutCount: 0,
    doneWorkoutCount: 0,
    friends: [],
    posts: [],
    workouts: [],
    doneWorkouts: []
  })

  const savedUser = await user.save() 
  return savedUser.id
}

module.exports = { createOneUser }