import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Preview } from '../workout/workoutview/Preview'

const workout = {
  _id: 'dadad',
  picture: '',
  textcontent: 'TESTINGGG',
  user: {
    id: 'dasda',
    username: 'Miksa'
  },
  likes: [ '42432', '423542' ],
  comments: [
    { content: 'TEST', user: 'Miksa1' },
    { content: 'TEST', user: 'Miksa1' },
    { content: 'TEST', user: 'Miksa1' }
  ]
}

afterEach(cleanup)

test('Preview is rendered correctly', () => {
  const component = render(
    <Router>
      <Preview workout={workout} />
    </Router>
  )

  const comments = component.getByTestId('comments')
  const header = component.getByText('Preview workout')
  const exercises = component.getByText('TESTINGGG')
  const likebutton = component.getByTestId('likebutton')
  const comment = component.getByTestId('comment')

  expect(comments).toBeDefined()
  expect(header).toBeDefined()
  expect(exercises).toBeDefined()
  expect(likebutton).toBeDefined()
  expect(comment).toBeDefined()
})