import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { Workouts } from '../workout/Workouts'
import store from '../../store'

afterEach(cleanup)

const workouts = [ 
  {
    _id: '1234556',
    content: '5x5 pullup\n5x5 push up\n5x5 squat\n5x5 toes to bar',
    picture: '',
    comments: [],
    likes: [ '423423452', '214124124' ],
    user: {
      id: '423524242',
      username: 'Miksa'
    }
  }, 
  {
    _id: '2345678',
    content: '5x5 pullup\n5x5 push up\n5x5 squat\n5x5 toes to bar',
    picture: '',
    comments: [],
    likes: [ '423423452', '214124124' ],
    user: {
      id: '423524242',
      username: 'Miksa'
    }
  }, 
  {
    _id: '453252',
    content: '5x5 pullup\n5x5 push up\n5x5 squat\n5x5 toes to bar',
    picture: '',
    comments: [],
    likes: [ '423423452', '214124124' ],
    user: {
      id: '42354242',
      username: 'Miksa'
    }
  } 
]
const mock = jest.fn()

test('Renders all workouts', () => {
  const component = render(<Provider store={store}><Router><Workouts workouts={workouts} initAllWorkouts={mock} /></Router></Provider>)
  const rendered = component.getAllByTestId('workout-component')

  expect(rendered.length).toBe(3)
})

test('Add workout button shows newpost dialog', () => {
  const component = render(<Provider store={store}><Router><Workouts workouts={workouts} initAllWorkouts={mock} /></Router></Provider>)
  const button = component.getByText('Create new workout')
  fireEvent.click(button)

  const createnew = component.getByTestId('newpost-component')
  expect(createnew).toBeDefined() 
})
