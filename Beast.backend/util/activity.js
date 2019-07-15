const User = require('../models/User')
const Workout = require('../models/Workout')
const Post = require('../models/Post')
const DoneWorkout = require('../models/DoneWorkout')

const setActivity = async (userid, type, id) => {
  const user = await User.findById(userid)
  let activity = {}

  switch(type) {
    case 'post':
      activity = {
        text: `${user.username} posted a post`,
        uri: `/post/${id}`
      }
      break
    case 'workout':
      activity = {
        text: `${user.username} created a workout`,
        uri: `/workout/${id}`
      }
      break  
    case 'doneworkout':
      activity = {
        text: `${user.username} did a workout`,
        uri: `/doneworkout/${id}`
      }
      break  
    case 'comment':
      activity = {
        text: `${user.username} commented on a post`,
        uri: `/post/${id}`
      }
      break  
    case 'like':
      activity = {
        text: `${user.username} liked a post`,
        uri: `/post/${id}`
      }
      break  
    case 'commentworkout':
      activity = {
        text: `${user.username} commented on a workout`,
        uri: `/workout/${id}`
      }
      break  
    case 'likeworkout':
      activity = {
        text: `${user.username} liked a workout`,
        uri: `/workout/${id}`
      } 
    default:
      return {}
  }
  const newActivity = user.activity.concat(activity)

  const userToUpdate = {
    username: user.username,
    passwordHash: user.passwordHash,
    picture: user.picture,
    pictures: user.pictures,
    info: user.info,
    age: user.age,
    activity: newActivity,
    postCount: user.postCount,
    workoutCount: user.workoutCount,
    doneWorkoutCount: user.doneWorkoutCount,
    friends: user.friends,
    posts: user.posts,
    workouts: user.workouts,
    doneWorkouts: user.doneWorkouts
  }

  const savedUser = await User.findByIdAndUpdate(userid, userToUpdate, { new: true })

  return savedUser
}

module.exports = { setActivity }