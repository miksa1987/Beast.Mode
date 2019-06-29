import React from 'react'
import Newpost from './Newpost'
import Post from './Post'

// Just for testing purpose
const posts0 = [
  { user: {
    username: 'Miksa',
    picture: 'img/user.jpg' },
  id: '123ssa45asasss',
  content: 'KILLER WORKOUT TODAY',
  picture: 'img/postpicture.jpg' },
  { user: {
    username: 'Miksa',
    picture: 'img/user.jpg' },
  id: '12345sasda',
  content: 'KILLER WORKOUT TODAY',
  picture: 'img/postpicture.jpg' },
  { user: {
    username: 'Miksa',
    picture: 'img/user.jpg' },
  id: '1a2aa345',
  content: 'KILLER WORKOUT NOT TODAY',
  picture: 'img/postpicture.jpg' },
  { user: {
    username: 'Miksa',
    picture: 'img/user.jpg' },
  id: '1234',
  content: 'KILLER WORKOUT NOW',
  picture: 'img/postpicture.jpg' },
  { user: {
    username: 'Miksa',
    picture: 'img/user.jpg' },
  id: '123aa45',
  content: 'KILLER WORKOUT',
  picture: 'img/postpicture.jpg' },
  { user: {
    username: 'Miksa',
    picture: 'img/user.jpg' },
  id: '1234d5',
  content: 'KILLER TODAY',
  picture: 'img/postpicture.jpg' },
  { user: {
    username: 'Miksa',
    picture: 'img/user.jpg' },
  id: '12345',
  content: 'KILLER WORKOUT YESTERDAY',
  picture: 'img/postpicture.jpg' }
]

const feedStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start'
}


const Feed = (props) => {
  return ( <div style={feedStyle}>
    <Newpost />
    {posts0.map(post => <Post key={post.id} post={post} />)}
    {posts0.map(post => <Post key={post.id} post={post} />)}
  </div> )
}

export default Feed