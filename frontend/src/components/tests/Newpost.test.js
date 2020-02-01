import React from 'react'
import { Provider } from 'react-redux'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Newpost from '../post/Newpost'
import store from '../../store'

afterEach(cleanup)

test('Header is rendered', () => {
  const component = render(<Provider store={store}><Newpost /></Provider>)
  expect(component.container).toHaveTextContent('Create new')
})

test('Can set to workout type and did it button appears', () => {
  const component = render(<Provider store={store}><Newpost /></Provider>)
  const workoutButton = component.getByTestId('workoutbutton')
  fireEvent.click(workoutButton)
  const didIt = component.getByTestId('didworkoutbutton')
  
  expect(didIt).toBeDefined()
})

test('When isWorkout is set, post type buttons are not shown', () => {
  const setShowNewPost = jest.fn()
  const component = render(<Provider store={store}><Newpost isWorkout={true} setShowNewpost={setShowNewPost} /></Provider>)
  const postButton = component.getByTestId('postbutton')
  const didIt = component.getByTestId('didworkoutbutton')
  const cancel = component.getByTestId('cancelbutton')
  
  expect(postButton).toBeDefined()
  expect(didIt).toBeDefined()
  expect(cancel).toBeDefined()
})

test('When isWorkout is set and cancel clicked setShowNewpost is called once', () => {
  const setShowNewPost = jest.fn()
  const component = render(<Provider store={store}><Newpost isWorkout={true} setShowNewpost={setShowNewPost} /></Provider>)
  const cancel = component.getByTestId('cancelbutton')
  fireEvent.click(cancel)
  
  expect(setShowNewPost.mock.calls.length).toBe(1)
})