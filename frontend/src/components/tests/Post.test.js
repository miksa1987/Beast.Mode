import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import Post from '../post/Post'
import store from '../../store'

afterEach(cleanup)

const post = {
  content: 'TEST',
  user: {
    username: 'Miksa',
    id: '123456789'
  },
  _id: '123456677777',
  likes: [],
  comments: [
    { userid: '1', user: 'x', content: 'x' }
  ],
  type: 'post'
}

test('Post content is rendered', () => {
  const component = render(
    <Provider store={store}>
      <Router>
        <Post post={post} />
      </Router>
    </Provider>
  )

  expect(component.container).toHaveTextContent('TEST')
})

test('Poster username is rendered', () => {
  const component = render(
    <Provider store={store}>
      <Router>
        <Post post={post} />
      </Router>
    </Provider>
  )

  const header = component.getByText('Miksa')
  expect(header).toBeDefined()
})

test('Component can render done workout', () => {
  const doneworkout = { ...post, type: 'doneworkout' }
  const component = render(
    <Provider store={store}>
      <Router>
        <Post post={doneworkout} />
      </Router>
    </Provider>
  )

  const headerAdditional = component.getByText('did a workout')
  expect(headerAdditional).toBeDefined()
})

test('Comments are rendered too', () => {
  const component = render(
    <Provider store={store}>
      <Router>
        <Post post={post} />
      </Router>
    </Provider>
  )

  const comments = component.getByTestId('comments')
  expect(comments).toBeDefined()
})

test('Comments are rendered too if there are actually some', () => {
  const anotherPost = { 
    ...post, 
    comments: [
      { content: 'TESTCOMMENT', user: 'Miksa1', userid: '123' }
    ] 
  }
  const component = render(
    <Provider store={store}>
      <Router>
        <Post post={anotherPost} />
      </Router>
    </Provider>
  )

  const comments = component.getByTestId('comments')
  expect(comments).toBeDefined()
  expect(comments).toHaveTextContent('TESTCOMMENT')
  expect(comments).toHaveTextContent('Miksa1')
})